import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, ShieldCheck, Square } from 'lucide-react';
import { decodeAudioFile, friendlyAudioDecodeError } from '@lib/audio-decode';
import { estimateRemainingSeconds } from '@lib/estimate-time';
import { validateFile } from '@lib/file-validation';
import {
  createLoadWatchdog,
  MODEL_INACTIVITY_TIMEOUT_MS,
  WORKER_STARTUP_TIMEOUT_MS
} from '@lib/load-watchdog';
import {
  getInitialLanguagePreference,
  LANGUAGE_PREFERENCE_EVENT
} from '@lib/language-preference';
import {
  getLanguageOption,
  getModelOption
} from '@lib/model-options';
import { getHomeUiCopy } from '@lib/ui-copy';
import type {
  LanguageCode,
  ModelMode,
  ModelOption,
  TranscriptResult,
  TranscriptionStatus,
  ValidationResult,
  WorkerRequest,
  WorkerResponse
} from '@lib/types';
import { DownloadButtons } from './DownloadButtons';
import { LanguageSelector } from './LanguageSelector';
import { ModelSelector } from './ModelSelector';
import { ProgressPanel } from './ProgressPanel';
import { TranscriptPreview } from './TranscriptPreview';
import { UploadBox } from './UploadBox';

export function TranscriberApp() {
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [modelMode, setModelMode] = useState<ModelMode>('blue-whale');
  const [uiLanguage, setUiLanguage] = useState<LanguageCode>('english');
  const [languageCode, setLanguageCode] = useState<LanguageCode>('english');
  const [status, setStatus] = useState<TranscriptionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [audioDurationSeconds, setAudioDurationSeconds] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [, setMessage] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<TranscriptResult | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const copy = useMemo(() => getHomeUiCopy(uiLanguage), [uiLanguage]);
  const copyRef = useRef(copy);
  const workerReadyRef = useRef(false);
  const workerStartupWatchdogRef = useRef<ReturnType<typeof createLoadWatchdog> | null>(null);
  const modelActivityWatchdogRef = useRef<ReturnType<typeof createLoadWatchdog> | null>(null);
  const activeRunIdRef = useRef(0);
  const runStartedAtRef = useRef<number | null>(null);
  const runModelRef = useRef<ModelOption | null>(null);
  const runIsWarmModelRef = useRef(false);
  const loadedModelModeRef = useRef<ModelMode | null>(null);

  const stopWorkerWithError = (message: string) => {
    workerRef.current?.terminate();
    workerRef.current = null;
    workerReadyRef.current = false;
    workerStartupWatchdogRef.current?.clear();
    modelActivityWatchdogRef.current?.clear();
    setStatus('error');
    setProgress(0);
    runStartedAtRef.current = null;
    setElapsedSeconds(0);
    setMessage(copyRef.current.tool.messages.stopped);
    setError(message);
  };

  const getWorkerStartupWatchdog = () => {
    workerStartupWatchdogRef.current ??= createLoadWatchdog(
      WORKER_STARTUP_TIMEOUT_MS,
      () => stopWorkerWithError(copyRef.current.tool.messages.workerStartupTimeout)
    );
    return workerStartupWatchdogRef.current;
  };

  const getModelActivityWatchdog = () => {
    modelActivityWatchdogRef.current ??= createLoadWatchdog(
      MODEL_INACTIVITY_TIMEOUT_MS,
      () => stopWorkerWithError(copyRef.current.tool.messages.modelStalled)
    );
    return modelActivityWatchdogRef.current;
  };

  const clearLoadWatchdogs = () => {
    workerStartupWatchdogRef.current?.clear();
    modelActivityWatchdogRef.current?.clear();
  };

  const resolvedModel = useMemo(() => getModelOption(modelMode), [modelMode]);

  useEffect(() => {
    copyRef.current = copy;
  }, [copy]);

  useEffect(() => {
    const documentLanguages: Record<LanguageCode, string> = {
      auto: 'en',
      english: 'en',
      'zh-hans': 'zh-CN',
      'zh-hant': 'zh-TW',
      japanese: 'ja',
      korean: 'ko',
      spanish: 'es',
      french: 'fr',
      german: 'de'
    };

    document.title = copy.browserTitle;
    document.documentElement.lang = documentLanguages[uiLanguage];
  }, [copy, uiLanguage]);

  useEffect(() => {
    return () => {
      clearLoadWatchdogs();
      workerRef.current?.terminate();
      workerRef.current = null;
      workerReadyRef.current = false;
    };
  }, []);

  useEffect(() => {
    const initialLanguage = getInitialLanguagePreference();
    setUiLanguage(initialLanguage);
    setLanguageCode(initialLanguage);

    const handlePreferenceChange = (event: Event) => {
      const code = (event as CustomEvent<{ code?: LanguageCode }>).detail?.code;
      if (code) {
        setUiLanguage(code);
        setLanguageCode(code);
      }
    };

    window.addEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
    return () => window.removeEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    clearLoadWatchdogs();
    activeRunIdRef.current += 1;
    workerRef.current?.terminate();
    workerRef.current = null;
    workerReadyRef.current = false;
    loadedModelModeRef.current = null;
    const validationResult = validateFile(selectedFile);
    setFile(selectedFile);
    setValidation(validationResult);
    setResult(null);
    setError('');
    setProgress(0);
    setAudioDurationSeconds(null);
    setElapsedSeconds(0);
    runStartedAtRef.current = null;
    runModelRef.current = null;
    runIsWarmModelRef.current = false;
    setStatus(validationResult.valid ? 'ready' : 'error');
    setMessage(validationResult.valid ? copy.tool.messages.fileReady : '');
  };

  const handleClear = () => {
    clearLoadWatchdogs();
    activeRunIdRef.current += 1;
    workerRef.current?.terminate();
    workerRef.current = null;
    workerReadyRef.current = false;
    loadedModelModeRef.current = null;
    setFile(null);
    setValidation(null);
    setResult(null);
    setError('');
    setProgress(0);
    setAudioDurationSeconds(null);
    setElapsedSeconds(0);
    runStartedAtRef.current = null;
    runModelRef.current = null;
    runIsWarmModelRef.current = false;
    setStatus('idle');
    setMessage('');
  };

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguageCode(code);
  };

  const ensureWorker = () => {
    if (!workerRef.current) {
      workerReadyRef.current = false;
      workerRef.current = new Worker(new URL('../lib/transcription-worker.ts', import.meta.url), {
        type: 'module'
      });

      workerRef.current.onerror = (event) => {
        const currentCopy = copyRef.current;
        clearLoadWatchdogs();
        workerReadyRef.current = false;
        setStatus('error');
        setProgress(0);
        setError(
          event.message ||
            currentCopy.tool.messages.workerFailed
        );
        setMessage(currentCopy.tool.messages.stopped);
      };

      workerRef.current.onmessageerror = () => {
        const currentCopy = copyRef.current;
        clearLoadWatchdogs();
        workerReadyRef.current = false;
        setStatus('error');
        setProgress(0);
        setError(currentCopy.tool.messages.fileTransferFailed);
        setMessage(currentCopy.tool.messages.stopped);
      };

      workerRef.current.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const data = event.data;

        if (data.type === 'ready') {
          workerReadyRef.current = true;
          getWorkerStartupWatchdog().clear();
          getModelActivityWatchdog().touch();
          return;
        }

        if (data.type === 'heartbeat') {
          if (data.phase === 'loading-model') {
            getModelActivityWatchdog().touch();
          } else {
            getModelActivityWatchdog().clear();
          }
          return;
        }

        if (data.type === 'model-progress') {
          getModelActivityWatchdog().touch();
          setStatus('loading-model');
          setProgress(typeof data.progress === 'number' ? Math.min(35, data.progress * 0.35) : 10);
          setMessage(data.message);
          return;
        }

        if (data.type === 'status') {
          if (data.status === 'loading-model') {
            getModelActivityWatchdog().touch();
          } else {
            getModelActivityWatchdog().clear();
          }
          setStatus(data.status);
          if (data.status === 'transcribing' && runModelRef.current) {
            loadedModelModeRef.current = runModelRef.current.mode;
          }
          if (typeof data.progress === 'number') {
            setProgress(data.progress);
          }
          setMessage(data.message);
          return;
        }

        if (data.type === 'complete') {
          const currentCopy = copyRef.current;
          clearLoadWatchdogs();
          setError('');
          setStatus('transcribing');
          setProgress(96);
          setMessage(currentCopy.tool.messages.preparingText);

          const completionRunId = activeRunIdRef.current;

          if (completionRunId !== activeRunIdRef.current) {
            return;
          }

          setResult(data.result);
          if (runModelRef.current) {
            loadedModelModeRef.current = runModelRef.current.mode;
          }
          runStartedAtRef.current = null;
          setElapsedSeconds(0);
          setStatus('complete');
          setProgress(100);
          setMessage(copyRef.current.tool.messages.complete);
          return;
        }

        if (data.type === 'error') {
          const currentCopy = copyRef.current;
          clearLoadWatchdogs();
          setStatus('error');
          setProgress(0);
          setError(currentCopy.tool.messages.workerErrors[data.code] ?? data.message);
          setMessage(currentCopy.tool.messages.stopped);
        }
      };
    }

    return workerRef.current;
  };

  const startTranscription = async () => {
    if (!file || !validation?.valid) {
      setError(copy.tool.messages.chooseFile);
      return;
    }

    const runId = (activeRunIdRef.current += 1);
    setResult(null);
    setError('');
    setAudioDurationSeconds(null);
    setElapsedSeconds(0);
    runStartedAtRef.current = null;
    clearLoadWatchdogs();

    try {
      setStatus('transcribing');
      setProgress(6);
      setMessage(copy.tool.messages.decoding);

      const audio = await decodeAudioFile(file);

      if (runId !== activeRunIdRef.current) {
        return;
      }

      runModelRef.current = resolvedModel;
      runIsWarmModelRef.current = loadedModelModeRef.current === resolvedModel.mode;
      setAudioDurationSeconds(audio.length / 16_000);
      runStartedAtRef.current = performance.now();
      setElapsedSeconds(0);
      setStatus('loading-model');
      setProgress(12);
      setMessage(copy.tool.messages.preparingModel(copy.model.options[resolvedModel.mode].name));

      const worker = ensureWorker();
      if (workerReadyRef.current) {
        getModelActivityWatchdog().touch();
      } else {
        getWorkerStartupWatchdog().arm();
      }
      const request = {
        type: 'start',
        audio,
        model: resolvedModel,
        language: getLanguageOption(languageCode)
      } satisfies WorkerRequest;

      worker.postMessage(request, [audio.buffer as ArrayBuffer]);
    } catch (decodeError) {
      if (runId !== activeRunIdRef.current) {
        return;
      }

      clearLoadWatchdogs();
      setStatus('error');
      setProgress(0);
      setMessage(copy.tool.messages.stopped);
      setError(friendlyAudioDecodeError(decodeError));
    }
  };

  const cancelTranscription = () => {
    clearLoadWatchdogs();
    activeRunIdRef.current += 1;
    workerRef.current?.terminate();
    workerRef.current = null;
    workerReadyRef.current = false;
    loadedModelModeRef.current = null;
    runStartedAtRef.current = null;
    setElapsedSeconds(0);
    setStatus(validation?.valid ? 'ready' : 'idle');
    setProgress(0);
    setMessage(copy.tool.messages.cancelled);
  };

  const isRunning = status === 'loading-model' || status === 'transcribing';
  useEffect(() => {
    if (!isRunning || runStartedAtRef.current === null) {
      return undefined;
    }

    const updateElapsed = () => {
      if (runStartedAtRef.current !== null) {
        setElapsedSeconds((performance.now() - runStartedAtRef.current) / 1000);
      }
    };

    updateElapsed();
    const timer = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const estimatedRemaining =
    isRunning && audioDurationSeconds !== null && runModelRef.current
      ? estimateRemainingSeconds({
          model: runModelRef.current,
          audioDurationSeconds,
          elapsedSeconds,
          isWarmModel: runIsWarmModelRef.current
        })
      : null;
  const transcriptText = result?.text ?? '';
  const segments = result?.segments ?? [];
  const currentStep = status === 'complete' ? 2 : isRunning ? 1 : 0;

  return (
    <section className="tool-band" id="tools" aria-label={copy.tool.ariaLabel}>
      <span id="transcriber" className="anchor-offset" aria-hidden="true" />
      <div className="container transcriber-shell">
        <div className="tool-title">
          <h1>{copy.tool.title}</h1>
          <p>{copy.tool.subtitle}</p>
        </div>

        <div className="transcriber-card">
          <ol className="workflow-steps" aria-label={copy.tool.ariaLabel}>
            {copy.tool.steps.map(({ title, description }, index) => (
              <li className={index <= currentStep ? 'active' : ''} key={title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </div>
              </li>
            ))}
          </ol>

          <div className="workbench-grid">
            <div className="workbench-upload">
              <UploadBox
                file={file}
                validation={validation}
                copy={copy.upload}
                onFileSelect={handleFileSelect}
                onClear={handleClear}
              />
              <LanguageSelector
                selected={languageCode}
                copy={copy.language}
                onChange={handleLanguageChange}
              />
            </div>

            <div className="workbench-controls">
              <ModelSelector
                selected={modelMode}
                copy={copy.model}
                onChange={setModelMode}
              />
              <div className="action-row">
                <button
                  className="button primary-button"
                  type="button"
                  disabled={!file || !validation?.valid || isRunning}
                  onClick={startTranscription}
                >
                  <Play size={18} aria-hidden="true" />
                  {copy.tool.actions.start}
                </button>
                <button
                  className="button ghost-button"
                  type="button"
                  disabled={!isRunning}
                  onClick={cancelTranscription}
                >
                  <Square size={16} aria-hidden="true" />
                  {copy.tool.actions.cancel}
                </button>
              </div>
              <ProgressPanel
                status={status}
                progress={progress}
                error={error}
                estimatedRemainingSeconds={estimatedRemaining}
                copy={copy.progress}
              />
            </div>
          </div>

          <div className="tool-notices">
            <div className="privacy-note">
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <strong>{copy.tool.notices.local}</strong>
                <span>{copy.tool.notices.firstUse}</span>
              </div>
            </div>
          </div>

          <div className="result-export-grid">
            <TranscriptPreview text={transcriptText} segments={segments} copy={copy.preview} />
            <DownloadButtons
              sourceFilename={file?.name ?? 'transcript'}
              segments={segments}
              copy={copy.export}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
