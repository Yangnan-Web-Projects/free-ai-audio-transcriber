import { env, pipeline } from '@huggingface/transformers';
import { normalizeTranscriptForLanguage } from './chinese-normalize';
import { textToFallbackSegments } from './transcript-format';
import type {
  ModelDtype,
  TranscriptSegment,
  WorkerErrorCode,
  WorkerPhase,
  WorkerRequest,
  WorkerResponse
} from './types';

const configuredLocalModelPath = import.meta.env.PUBLIC_TRANSFORMERS_LOCAL_MODEL_PATH;

env.allowLocalModels = Boolean(configuredLocalModelPath);
env.useBrowserCache = true;

if (configuredLocalModelPath) {
  env.localModelPath = configuredLocalModelPath.replace(/\/?$/, '/');
}

const configuredRemoteHost = import.meta.env.PUBLIC_TRANSFORMERS_REMOTE_HOST;
if (configuredRemoteHost) {
  env.remoteHost = configuredRemoteHost.replace(/\/$/, '');
}

let transcriber: unknown;
let loadedModelKey = '';
let cancelled = false;
let activeRunId = 0;
let heartbeatTimer: ReturnType<typeof setInterval> | undefined;
let heartbeatPhase: WorkerPhase = 'loading-model';

function send(message: WorkerResponse) {
  self.postMessage(message);
}

function classifyError(error: unknown): { code: WorkerErrorCode; message: string } {
  const message = error instanceof Error ? error.message : String(error);

  if (error instanceof Error && error.name === 'ChineseNormalizationError') {
    return {
      code: 'normalization',
      message: 'The transcript was created, but Chinese script normalization could not finish.'
    };
  }

  if (/memory|allocation|out of|array buffer|heap/i.test(message)) {
    return {
      code: 'memory',
      message: 'The browser ran out of memory while initializing or running the model.'
    };
  }

  if (/404|403|not found|no such file|model file|local model/i.test(message)) {
    return {
      code: 'model-files',
      message: 'One or more model files could not be read.'
    };
  }

  if (/fetch|network|failed to load|connection|timeout/i.test(message)) {
    return {
      code: 'network',
      message: 'The browser could not retrieve the model files.'
    };
  }

  if (/session|onnx|webgpu|wasm|matmul|qdq|model\./i.test(message)) {
    return {
      code: 'model-init',
      message: 'The model files were found, but the model could not initialize in this browser.'
    };
  }

  return {
    code: 'unknown',
    message: message || 'Transcription failed. Please try a different file or model.'
  };
}

function startHeartbeat(phase: WorkerPhase) {
  heartbeatPhase = phase;
  stopHeartbeat();
  send({ type: 'heartbeat', phase: heartbeatPhase });
  heartbeatTimer = setInterval(() => {
    send({ type: 'heartbeat', phase: heartbeatPhase });
  }, 10_000);
}

function setHeartbeatPhase(phase: WorkerPhase) {
  heartbeatPhase = phase;
  send({ type: 'heartbeat', phase });
}

function stopHeartbeat() {
  if (heartbeatTimer !== undefined) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = undefined;
  }
}

function normalizeTimestamp(timestamp: unknown, index: number): [number, number] {
  if (Array.isArray(timestamp)) {
    const start = typeof timestamp[0] === 'number' ? timestamp[0] : index * 4;
    const end = typeof timestamp[1] === 'number' && timestamp[1] > start ? timestamp[1] : start + 4;
    return [start, end];
  }

  return [index * 4, index * 4 + 4];
}

function normalizeResult(result: unknown): { text: string; segments: TranscriptSegment[] } {
  const record = result as {
    text?: string;
    chunks?: Array<{ text?: string; timestamp?: unknown }>;
  };
  const text = typeof record.text === 'string' ? record.text.trim() : '';
  const chunks = Array.isArray(record.chunks) ? record.chunks : [];
  const segments = chunks
    .map((chunk, index) => {
      const [start, end] = normalizeTimestamp(chunk.timestamp, index);
      return {
        id: index + 1,
        start,
        end,
        text: (chunk.text ?? '').trim()
      };
    })
    .filter((segment) => segment.text.length > 0);

  if (segments.length > 0) {
    return { text, segments };
  }

  return {
    text,
    // TODO: Replace this fallback when a selected model/browser combination
    // cannot return reliable timestamp chunks.
    segments: textToFallbackSegments(text)
  };
}

async function loadTranscriber(modelId: string, dtype: ModelDtype) {
  const modelKey = `${modelId}:${dtype}`;

  if (transcriber && loadedModelKey === modelKey) {
    return transcriber as (
      input: Float32Array,
      options: Record<string, unknown>
    ) => Promise<unknown>;
  }

  loadedModelKey = '';
  transcriber = undefined;

  send({
    type: 'status',
    status: 'loading-model',
    progress: 0,
    message: `Loading ${modelId} (${dtype}). First use can take a while.`
  });

  transcriber = await pipeline('automatic-speech-recognition', modelId, {
    device: 'wasm',
    dtype,
    progress_callback: (progressData: unknown) => {
      const data = progressData as {
        status?: string;
        file?: string;
        progress?: number;
        loaded?: number;
        total?: number;
      };

      send({
        type: 'model-progress',
        status: data.status ?? 'loading',
        file: data.file,
        progress: data.progress,
        loaded: data.loaded,
        total: data.total,
        message:
          typeof data.progress === 'number'
            ? `Downloading model files: ${Math.round(data.progress)}%`
            : data.file
              ? `Preparing model file: ${data.file}`
              : 'Preparing local AI model files.'
      });
    }
  });

  loadedModelKey = modelKey;

  return transcriber as (
    input: Float32Array,
    options: Record<string, unknown>
  ) => Promise<unknown>;
}

async function start(request: Extract<WorkerRequest, { type: 'start' }>) {
  cancelled = false;
  const runId = ++activeRunId;
  const { audio, model, language } = request;
  const modelId = model.modelId;

  startHeartbeat('loading-model');

  try {
    const runner = await loadTranscriber(modelId, model.dtype);

    if (cancelled) {
      return;
    }

    send({
      type: 'status',
      status: 'transcribing',
      progress: 40,
      message: 'Generating transcript with the local AI model.'
    });
    setHeartbeatPhase('transcribing');

    const options: Record<string, unknown> = {
      chunk_length_s: model.chunkLengthSeconds,
      return_timestamps: true,
      task: 'transcribe'
    };

    if (model.strideLengthSeconds > 0) {
      options.stride_length_s = model.strideLengthSeconds;
    }

    if (language.whisperLanguage) {
      options.language = language.whisperLanguage;
    }

    const rawResult = await runner(audio, options);

    if (cancelled || runId !== activeRunId) {
      return;
    }

    const normalized = normalizeResult(rawResult);
    setHeartbeatPhase('normalizing');
    let transcriptResult;
    try {
      transcriptResult = await normalizeTranscriptForLanguage(
        {
          text: normalized.text,
          segments: normalized.segments,
          modelId,
          language: language.code,
          generatedAt: new Date().toISOString()
        },
        language.code
      );
    } catch (error) {
      const normalizationError = new Error(
        error instanceof Error ? error.message : String(error)
      );
      normalizationError.name = 'ChineseNormalizationError';
      throw normalizationError;
    }

    send({
      type: 'complete',
      result: transcriptResult
    });
  } catch (error) {
    const friendlyError = classifyError(error);
    send({
      type: 'error',
      code: friendlyError.code,
      message: friendlyError.message,
      details: error instanceof Error ? error.stack : String(error)
    });
  } finally {
    stopHeartbeat();
  }
}

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  if (event.data.type === 'cancel') {
    cancelled = true;
    activeRunId += 1;
    stopHeartbeat();
    send({
      type: 'status',
      status: 'idle',
      progress: 0,
      message: 'Transcription cancelled.'
    });
    return;
  }

  void start(event.data);
});

send({ type: 'ready' });
