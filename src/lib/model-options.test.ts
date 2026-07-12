import { describe, expect, it } from 'vitest';
import { selectModelByMode } from './model-options';
import type { DeviceInfo, FileInfo } from './types';

const desktop: DeviceInfo = {
  hardwareConcurrency: 8,
  deviceMemory: 8,
  isMobile: false,
  hasWebGPU: true
};

const shortAudio: FileInfo = {
  name: 'sample.mp3',
  size: 8 * 1024 * 1024,
  extension: 'mp3',
  category: 'audio',
  type: 'audio/mpeg'
};

describe('model selection', () => {
  it('keeps manual model choices unchanged', () => {
    expect(selectModelByMode('blue-whale', desktop, shortAudio).mode).toBe('blue-whale');
  });

  it('does not downgrade manual model choices for low-power devices', () => {
    expect(
      selectModelByMode(
        'tiger',
        { hardwareConcurrency: 2, deviceMemory: 4, isMobile: false, hasWebGPU: false },
        shortAudio
      ).mode
    ).toBe('tiger');
  });

  it('maps Fox Model to the former Tiger base model', () => {
    expect(selectModelByMode('fox', desktop, shortAudio).modelId).toBe(
      'onnx-community/whisper-base'
    );
  });
});
