import { getDefaultLanguageCode, isSupportedLanguageCode } from './model-options';
import type { LanguageCode } from './types';

export const LANGUAGE_PREFERENCE_KEY = 'free-ai-audio-transcriber-language';
export const LANGUAGE_PREFERENCE_EVENT = 'free-ai-audio-transcriber-language-change';

export const pageLanguageOptions: Array<{
  code: LanguageCode;
  label: string;
  shortLabel: string;
}> = [
  { code: 'zh-hans', label: '简体中文', shortLabel: '简' },
  { code: 'zh-hant', label: '繁體中文', shortLabel: '繁' },
  { code: 'english', label: 'English', shortLabel: 'EN' },
  { code: 'japanese', label: '日本語', shortLabel: '日' },
  { code: 'korean', label: '한국어', shortLabel: '한' },
  { code: 'spanish', label: 'Español', shortLabel: 'ES' },
  { code: 'french', label: 'Français', shortLabel: 'FR' },
  { code: 'german', label: 'Deutsch', shortLabel: 'DE' }
];

export function getStoredLanguagePreference(): LanguageCode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedCode = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  if (storedCode === 'cantonese') {
    window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, 'zh-hant');
    return 'zh-hant';
  }
  return storedCode && isSupportedLanguageCode(storedCode) ? storedCode : null;
}

export function getInitialLanguagePreference(): LanguageCode {
  const storedCode = getStoredLanguagePreference();
  if (storedCode && storedCode !== 'auto') {
    return storedCode;
  }

  const browserCode = getDefaultLanguageCode();
  return browserCode === 'auto' ? 'english' : browserCode;
}

export function setLanguagePreference(code: LanguageCode) {
  if (typeof window === 'undefined' || !isSupportedLanguageCode(code)) {
    return;
  }

  window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, code);
  window.dispatchEvent(
    new CustomEvent<{ code: LanguageCode }>(LANGUAGE_PREFERENCE_EVENT, {
      detail: { code }
    })
  );
}
