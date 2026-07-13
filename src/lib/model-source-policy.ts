export type ModelSourceId = 'official' | 'mirror';

export interface ModelSource {
  id: ModelSourceId;
  host: string;
}

export interface ModelSourcePlan {
  official: ModelSource;
  mirror: ModelSource;
}

export const DEFAULT_MODEL_HOST = 'https://huggingface.co';
export const MIRROR_MODEL_HOST = 'https://hf-mirror.com';
export const MODEL_DOWNLOAD_STALL_MS = 45_000;

export function normalizeModelHost(host?: string) {
  return (host || DEFAULT_MODEL_HOST).replace(/\/$/, '');
}

export function createModelSourcePlan(officialHost?: string): ModelSourcePlan {
  return {
    official: { id: 'official', host: normalizeModelHost(officialHost) },
    mirror: { id: 'mirror', host: MIRROR_MODEL_HOST }
  };
}

export function shouldTryMirrorSource({
  source,
  error,
  stalled,
  cancelled
}: {
  source: ModelSource;
  error: unknown;
  stalled: boolean;
  cancelled: boolean;
}) {
  if (source.id !== 'official' || cancelled) {
    return false;
  }

  if (stalled) {
    return true;
  }

  const message = error instanceof Error ? error.message : String(error);
  if (/404|403|not found|no such file|model file|memory|allocation|array buffer|heap|onnx|wasm|session/i.test(message)) {
    return false;
  }

  return /abort|fetch|network|connection|timeout|cors|failed to load|load failed/i.test(message);
}
