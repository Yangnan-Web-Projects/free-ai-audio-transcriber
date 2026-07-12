import { useEffect, useState } from 'react';
import {
  getInitialLanguagePreference,
  LANGUAGE_PREFERENCE_EVENT
} from '@lib/language-preference';
import type { LanguageCode } from '@lib/types';

const brandCopy: Record<Exclude<LanguageCode, 'auto'>, { prefix: string; highlight: string; aria: string }> = {
  english: {
    prefix: 'Free AI ',
    highlight: 'Audio Transcriber',
    aria: 'Free AI Audio Transcriber home'
  },
  'zh-hans': {
    prefix: '免费 AI ',
    highlight: '音频转写',
    aria: '免费 AI 音频转写首页'
  },
  'zh-hant': {
    prefix: '免費 AI ',
    highlight: '音訊轉寫',
    aria: '免費 AI 音訊轉寫首頁'
  },
  japanese: {
    prefix: '無料 AI ',
    highlight: '音声文字起こし',
    aria: '無料 AI 音声文字起こしホーム'
  },
  korean: {
    prefix: '무료 AI ',
    highlight: '오디오 전사',
    aria: '무료 AI 오디오 전사 홈'
  },
  spanish: {
    prefix: 'Transcriptor de Audio ',
    highlight: 'IA Gratis',
    aria: 'Inicio de Transcriptor de Audio IA Gratis'
  },
  french: {
    prefix: 'Transcripteur Audio ',
    highlight: 'IA Gratuit',
    aria: 'Accueil Transcripteur Audio IA Gratuit'
  },
  german: {
    prefix: 'KI Audio ',
    highlight: 'Transkribierer',
    aria: 'KI Audio Transkribierer Startseite'
  }
};

export function HeaderBrand() {
  const [language, setLanguage] = useState<Exclude<LanguageCode, 'auto'>>('english');

  useEffect(() => {
    const initial = getInitialLanguagePreference();
    setLanguage(initial === 'auto' ? 'english' : initial);

    const handlePreferenceChange = (event: Event) => {
      const code = (event as CustomEvent<{ code?: LanguageCode }>).detail?.code;
      if (code && code !== 'auto') {
        setLanguage(code);
      }
    };

    window.addEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
    return () => window.removeEventListener(LANGUAGE_PREFERENCE_EVENT, handlePreferenceChange);
  }, []);

  const copy = brandCopy[language] ?? brandCopy.english;

  return (
    <a className="brand" href="/" aria-label={copy.aria}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path className="brand-page" d="M15 8h14l7 7v25H15z" />
          <path className="brand-fold" d="M29 8v8h7" />
          <path className="brand-line" d="M20 20h9M20 25h12M20 30h10" />
          <path className="brand-wave" d="M16 36v-4M20 38v-8M24 40V28M28 38v-8M32 36v-4" />
        </svg>
      </span>
      <span className="brand-text">
        <span>{copy.prefix}</span>
        <span className="brand-highlight">{copy.highlight}</span>
      </span>
    </a>
  );
}
