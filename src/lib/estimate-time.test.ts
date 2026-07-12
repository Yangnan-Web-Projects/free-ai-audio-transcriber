import { describe, expect, it } from 'vitest';
import { estimateRemainingSeconds, estimateTotalSeconds } from './estimate-time';
import { getModelOption } from './model-options';

describe('estimate-time', () => {
  it('uses each model rate for a two-minute file', () => {
    const duration = 120;
    expect(estimateTotalSeconds({ model: getModelOption('ant'), audioDurationSeconds: duration, isWarmModel: false })).toBeCloseTo(36.6);
    expect(estimateTotalSeconds({ model: getModelOption('fox'), audioDurationSeconds: duration, isWarmModel: false })).toBeCloseTo(62);
    expect(estimateTotalSeconds({ model: getModelOption('tiger'), audioDurationSeconds: duration, isWarmModel: false })).toBeCloseTo(219.8);
    expect(estimateTotalSeconds({ model: getModelOption('blue-whale'), audioDurationSeconds: duration, isWarmModel: false })).toBeCloseTo(1007.2);
  });

  it('removes model loading time for a warm model', () => {
    const model = getModelOption('tiger');
    expect(estimateTotalSeconds({ model, audioDurationSeconds: 120, isWarmModel: true })).toBeCloseTo(184.8);
  });

  it('never returns a negative remaining estimate', () => {
    expect(estimateRemainingSeconds({ model: getModelOption('ant'), audioDurationSeconds: 10, elapsedSeconds: 999, isWarmModel: false })).toBe(0);
  });
});
