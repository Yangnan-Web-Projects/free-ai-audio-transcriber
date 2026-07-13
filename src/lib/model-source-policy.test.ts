import { describe, expect, it } from 'vitest';
import { createModelSourcePlan, shouldTryMirrorSource } from './model-source-policy';

describe('model source policy', () => {
  const { official, mirror } = createModelSourcePlan();

  it('uses the official Hugging Face source first and keeps one mirror fallback', () => {
    expect(official).toEqual({ id: 'official', host: 'https://huggingface.co' });
    expect(mirror).toEqual({ id: 'mirror', host: 'https://hf-mirror.com' });
  });

  it('retries the mirror for official network failures or a stalled download', () => {
    expect(
      shouldTryMirrorSource({
        source: official,
        error: new TypeError('Failed to fetch'),
        stalled: false,
        cancelled: false
      })
    ).toBe(true);
    expect(
      shouldTryMirrorSource({
        source: official,
        error: new Error('download stalled'),
        stalled: true,
        cancelled: false
      })
    ).toBe(true);
  });

  it('does not retry non-network failures, cancellation, or the mirror itself', () => {
    expect(
      shouldTryMirrorSource({
        source: official,
        error: new Error('404 model file not found'),
        stalled: false,
        cancelled: false
      })
    ).toBe(false);
    expect(
      shouldTryMirrorSource({
        source: official,
        error: new Error('out of memory'),
        stalled: false,
        cancelled: false
      })
    ).toBe(false);
    expect(
      shouldTryMirrorSource({
        source: official,
        error: new Error('Failed to fetch'),
        stalled: false,
        cancelled: true
      })
    ).toBe(false);
    expect(
      shouldTryMirrorSource({
        source: mirror,
        error: new Error('Failed to fetch'),
        stalled: false,
        cancelled: false
      })
    ).toBe(false);
  });
});
