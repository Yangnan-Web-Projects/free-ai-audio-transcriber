export interface LoadWatchdog {
  arm: () => void;
  touch: () => void;
  clear: () => void;
}

export const WORKER_STARTUP_TIMEOUT_MS = 30_000;
export const MODEL_INACTIVITY_TIMEOUT_MS = 120_000;

export function createLoadWatchdog(timeoutMs: number, onTimeout: () => void): LoadWatchdog {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const arm = () => {
    clear();
    timer = setTimeout(() => {
      timer = undefined;
      onTimeout();
    }, timeoutMs);
  };

  return {
    arm,
    touch: arm,
    clear
  };
}
