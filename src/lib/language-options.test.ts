import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getLanguageCodeFromPath,
  getLanguageHomePath,
  getStoredLanguagePreference,
  LANGUAGE_PREFERENCE_KEY
} from './language-preference';
import { getDefaultLanguageCode, languageOptions } from './model-options';
import { getHomeUiCopy } from './ui-copy';

describe('language options', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does not expose Cantonese as a page or transcription language', () => {
    expect(languageOptions.map((option) => option.code)).not.toContain('cantonese');
  });

  it('uses localized Chinese labels without Mandarin wording', () => {
    expect(getHomeUiCopy('english').language.options['zh-hans'].label).toBe('Chinese (Simplified)');
    expect(getHomeUiCopy('zh-hans').language.options['zh-hans'].label).toBe('中文（简体）');
    expect(getHomeUiCopy('zh-hant').language.options['zh-hant'].label).toBe('中文（繁體）');
    expect(getHomeUiCopy('japanese').language.options['zh-hans'].label).toBe('中国語（簡体字）');
    expect(getHomeUiCopy('korean').language.options['zh-hans'].label).toBe('중국어(간체)');
    expect(getHomeUiCopy('spanish').language.options['zh-hans'].label).toBe('Chino (simplificado)');
    expect(getHomeUiCopy('french').language.options['zh-hans'].label).toBe('Chinois (simplifié)');
    expect(getHomeUiCopy('german').language.options['zh-hans'].label).toBe('Chinesisch (vereinfacht)');
  });

  it('migrates a stored Cantonese preference to Traditional Chinese', () => {
    const store = new Map<string, string>([[LANGUAGE_PREFERENCE_KEY, 'cantonese']]);
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value)
      }
    });

    expect(getStoredLanguagePreference()).toBe('zh-hant');
    expect(store.get(LANGUAGE_PREFERENCE_KEY)).toBe('zh-hant');
  });

  it('maps Yue and Hong Kong browser locales to Traditional Chinese', () => {
    vi.stubGlobal('navigator', { languages: ['yue-HK'], language: 'yue-HK' });
    expect(getDefaultLanguageCode()).toBe('zh-hant');

    vi.stubGlobal('navigator', { languages: ['zh-HK'], language: 'zh-HK' });
    expect(getDefaultLanguageCode()).toBe('zh-hant');
  });

  it('maps page languages to the simple localized homepage paths', () => {
    expect(getLanguageHomePath('english')).toBe('/');
    expect(getLanguageHomePath('zh-hans')).toBe('/zh-cn/');
    expect(getLanguageHomePath('zh-hant')).toBe('/zh-tw/');
    expect(getLanguageHomePath('korean')).toBe('/ko/');
    expect(getLanguageCodeFromPath('/')).toBe('english');
    expect(getLanguageCodeFromPath('/zh-cn/')).toBe('zh-hans');
    expect(getLanguageCodeFromPath('/audio-to-text/')).toBeNull();
  });
});
