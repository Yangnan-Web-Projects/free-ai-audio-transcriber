import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLoadWatchdog } from './load-watchdog';

describe('load watchdog', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires after the configured period without activity', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const watchdog = createLoadWatchdog(120_000, onTimeout);

    watchdog.arm();
    vi.advanceTimersByTime(119_999);
    expect(onTimeout).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('extends the deadline whenever progress touches the watchdog', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const watchdog = createLoadWatchdog(120_000, onTimeout);

    watchdog.arm();
    vi.advanceTimersByTime(90_000);
    watchdog.touch();
    vi.advanceTimersByTime(90_000);
    expect(onTimeout).not.toHaveBeenCalled();
    vi.advanceTimersByTime(30_000);
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('does not fire after being cleared', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const watchdog = createLoadWatchdog(30_000, onTimeout);

    watchdog.arm();
    watchdog.clear();
    vi.advanceTimersByTime(30_000);
    expect(onTimeout).not.toHaveBeenCalled();
  });
});
