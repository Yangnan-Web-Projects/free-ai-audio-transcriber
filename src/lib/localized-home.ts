import type { LanguageCode } from './types';

export interface LocalizedHomeLocale {
  slug: string;
  code: Exclude<LanguageCode, 'auto' | 'english'>;
  htmlLang: string;
  title: string;
  description: string;
}

export const localizedHomeLocales: LocalizedHomeLocale[] = [
  {
    slug: 'zh-cn',
    code: 'zh-hans',
    htmlLang: 'zh-CN',
    title: '免费 AI 音频转文字、字幕与歌词工具',
    description: '免费在浏览器中将音频和视频转成文字、字幕和歌词，支持 TXT、SRT、VTT、LRC 导出，无需注册，时长不限。'
  },
  {
    slug: 'zh-tw',
    code: 'zh-hant',
    htmlLang: 'zh-TW',
    title: '免費 AI 音訊轉文字、字幕與歌詞工具',
    description: '在瀏覽器中免費將音訊和影片轉成文字、字幕與歌詞，支援 TXT、SRT、VTT、LRC 匯出，無需註冊。'
  },
  {
    slug: 'ja',
    code: 'japanese',
    htmlLang: 'ja',
    title: '無料 AI 音声文字起こし・字幕・歌詞ツール',
    description: 'ブラウザで音声や動画を文字、字幕、歌詞に変換。登録不要で TXT、SRT、VTT、LRC を無料出力できます。'
  },
  {
    slug: 'ko',
    code: 'korean',
    htmlLang: 'ko',
    title: '무료 AI 음성 텍스트 변환·자막·가사 도구',
    description: '브라우저에서 오디오와 비디오를 텍스트, 자막, 가사로 변환하세요. 가입 없이 TXT, SRT, VTT, LRC를 무료로 내보냅니다.'
  },
  {
    slug: 'es',
    code: 'spanish',
    htmlLang: 'es',
    title: 'Transcriptor de audio con IA gratis: texto, subtítulos y letras',
    description: 'Convierte audio y vídeo en texto, subtítulos y letras desde el navegador. Gratis, privado y sin registro.'
  },
  {
    slug: 'fr',
    code: 'french',
    htmlLang: 'fr',
    title: 'Transcription audio IA gratuite : texte, sous-titres et paroles',
    description: 'Convertissez audio et vidéo en texte, sous-titres et paroles dans votre navigateur. Gratuit, privé et sans inscription.'
  },
  {
    slug: 'de',
    code: 'german',
    htmlLang: 'de',
    title: 'Kostenlose KI-Audiotranskription: Text, Untertitel und Liedtexte',
    description: 'Audio und Video direkt im Browser in Text, Untertitel und Liedtexte umwandeln. Kostenlos, privat und ohne Anmeldung.'
  }
];

export function getAlternateLinks(siteUrl: URL, pathFor: (locale: LocalizedHomeLocale) => string) {
  return localizedHomeLocales.map((locale) => ({
    hreflang: locale.htmlLang.toLowerCase(),
    href: new URL(pathFor(locale), siteUrl).toString()
  }));
}
