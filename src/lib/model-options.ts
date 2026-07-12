import type { DeviceInfo, FileInfo, LanguageOption, ModelMode, ModelOption } from './types';

export const modelOptions: ModelOption[] = [
  {
    mode: 'ant',
    displayName: 'Ant Model',
    modelId: 'onnx-community/whisper-tiny',
    dtype: 'q4',
    chunkLengthSeconds: 30,
    strideLengthSeconds: 5,
    description: 'The fastest local preset for rough drafts and older devices.',
    speed: 'Fast',
    accuracy: 'Basic',
    deviceLoad: 'Low',
    useCase: 'Short clips, rough drafts, mobile devices, and quick checks.',
    firstRunEstimate: 'Shortest first download and load time.',
    estimatedLoadSeconds: 15,
    estimatedRealtimeFactor: 0.18
  },
  {
    mode: 'fox',
    displayName: 'Fox Model',
    modelId: 'onnx-community/whisper-base',
    dtype: 'q4',
    chunkLengthSeconds: 30,
    strideLengthSeconds: 5,
    description: 'A faster balance option when Tiger feels too slow.',
    speed: 'Medium',
    accuracy: 'Good',
    deviceLoad: 'Medium',
    useCase: 'Everyday desktop files when Ant is too rough but Tiger feels too slow.',
    firstRunEstimate: 'Moderate first download and load time.',
    estimatedLoadSeconds: 20,
    estimatedRealtimeFactor: 0.35
  },
  {
    mode: 'tiger',
    displayName: 'Tiger Model',
    modelId: 'onnx-community/whisper-small',
    dtype: 'q4',
    chunkLengthSeconds: 30,
    strideLengthSeconds: 5,
    description: 'The former Blue Whale preset, now used as the higher-accuracy tier.',
    speed: 'Slow',
    accuracy: 'High',
    deviceLoad: 'High',
    useCase: 'Clearer results for regular desktop transcription when Fox is not enough.',
    firstRunEstimate: 'Long first download and load time.',
    estimatedLoadSeconds: 35,
    estimatedRealtimeFactor: 1.54
  },
  {
    mode: 'blue-whale',
    displayName: 'Whale Model',
    modelId: 'onnx-community/whisper-medium_timestamped',
    dtype: 'q4',
    chunkLengthSeconds: 30,
    strideLengthSeconds: 5,
    description: 'The upgraded heavyweight local preset for users who care more about accuracy than speed.',
    speed: 'Very Slow',
    accuracy: 'Higher',
    deviceLoad: 'Very High',
    useCase: 'Complex audio on modern desktops with plenty of memory.',
    firstRunEstimate: 'Very long first download and load time.',
    estimatedLoadSeconds: 70,
    estimatedRealtimeFactor: 7.81,
    badge: 'Default',
    experimental: true
  }
];

export const languageOptions: LanguageOption[] = [
  {
    code: 'english',
    label: 'English',
    whisperLanguage: 'english',
    description: 'English speech.'
  },
  {
    code: 'zh-hans',
    label: 'Chinese (Simplified)',
    whisperLanguage: 'chinese',
    description: 'Chinese speech. The app normalizes output to Simplified Chinese.'
  },
  {
    code: 'zh-hant',
    label: 'Chinese (Traditional)',
    whisperLanguage: 'chinese',
    description: 'Chinese speech. The app normalizes output to Traditional Chinese.'
  },
  {
    code: 'japanese',
    label: 'Japanese',
    whisperLanguage: 'japanese',
    description: 'Japanese speech.'
  },
  {
    code: 'korean',
    label: 'Korean',
    whisperLanguage: 'korean',
    description: 'Korean speech.'
  },
  {
    code: 'spanish',
    label: 'Spanish',
    whisperLanguage: 'spanish',
    description: 'Spanish speech.'
  },
  {
    code: 'french',
    label: 'French',
    whisperLanguage: 'french',
    description: 'French speech.'
  },
  {
    code: 'german',
    label: 'German',
    whisperLanguage: 'german',
    description: 'German speech.'
  }
];

export function getModelOption(mode: ModelMode) {
  return modelOptions.find((option) => option.mode === mode) ?? modelOptions[0];
}

export function getLanguageOption(code: string) {
  return languageOptions.find((option) => option.code === code) ?? languageOptions[0];
}

export function isSupportedLanguageCode(code: string): code is LanguageOption['code'] {
  return languageOptions.some((option) => option.code === code);
}

export function getDefaultLanguageCode(): LanguageOption['code'] {
  if (typeof navigator === 'undefined') {
    return 'auto';
  }

  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const rawLanguage of languages) {
    const language = rawLanguage.toLowerCase().replace('_', '-');

    if (language === 'yue' || language.startsWith('yue-') || language === 'zh-hk' || language === 'zh-mo') {
      return 'zh-hant';
    }

    if (
      language === 'zh-tw' ||
      language === 'zh-hant' ||
      language.startsWith('zh-hant-')
    ) {
      return 'zh-hant';
    }

    if (
      language === 'zh' ||
      language === 'zh-cn' ||
      language === 'zh-sg' ||
      language === 'zh-hans' ||
      language.startsWith('zh-hans-')
    ) {
      return 'zh-hans';
    }

    if (language.startsWith('en')) return 'english';
    if (language.startsWith('ja')) return 'japanese';
    if (language.startsWith('ko')) return 'korean';
    if (language.startsWith('es')) return 'spanish';
    if (language.startsWith('fr')) return 'french';
    if (language.startsWith('de')) return 'german';
  }

  return 'auto';
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof navigator === 'undefined') {
    return {
      hardwareConcurrency: 4,
      isMobile: false,
      hasWebGPU: false
    };
  }

  const extendedNavigator = navigator as Navigator & {
    deviceMemory?: number;
    gpu?: unknown;
  };

  return {
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    deviceMemory: extendedNavigator.deviceMemory,
    isMobile: /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
    hasWebGPU: Boolean(extendedNavigator.gpu)
  };
}

export function selectModelByMode(
  mode: ModelMode,
  _deviceInfo: DeviceInfo,
  _fileInfo?: FileInfo
): ModelOption {
  return getModelOption(mode);
}
