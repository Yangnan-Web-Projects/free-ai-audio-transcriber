import type { LanguageCode } from './types';

export interface LocalizedSeoLocale {
  slug: string;
  code: Exclude<LanguageCode, 'auto'>;
  htmlLang: string;
  homeTitle: string;
  homeDescription: string;
  eyebrow: string;
  homeHeading: string;
  homeIntro: string;
  howItWorks: string;
  whyUseIt: string;
  openTool: string;
  relatedTools: string;
  faq: string;
  steps: string[];
  benefits: string[];
  tools: Record<'audio-to-text' | 'mp3-to-text' | 'audio-to-srt', LocalizedToolCopy>;
}

interface LocalizedToolCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export const localizedSeoLocales: LocalizedSeoLocale[] = [
  {
    slug: 'en', code: 'english', htmlLang: 'en',
    homeTitle: 'Free AI Transcriber - Audio to Text, Subtitles and Lyrics',
    homeDescription: 'Free browser-based AI transcription for audio and video. Export TXT, SRT, VTT, and LRC files privately with no signup or fixed time limit.',
    eyebrow: 'Free browser transcription', homeHeading: 'Free AI Transcriber',
    homeIntro: 'Turn audio and video into text, subtitles, and timed lyrics in your browser. Free, private, open source, and without a fixed time limit.',
    howItWorks: 'How it works', whyUseIt: 'Why use it', openTool: 'Open the transcriber', relatedTools: 'Related tools', faq: 'Frequently asked questions',
    steps: ['Upload an audio or video file.', 'Choose a transcription language and model.', 'Review your text and export TXT, SRT, VTT, or LRC.'],
    benefits: ['Files are processed in your browser by default.', 'Useful for interviews, podcasts, meetings, music, and video captions.', 'No account, database, or paid transcription API is required.'],
    tools: {
      'audio-to-text': { title: 'Audio to Text - Free AI Transcription Tool', description: 'Convert audio to text in your browser with free local AI transcription and TXT, SRT, VTT, and LRC exports.', h1: 'Audio to Text', intro: 'Convert recordings, interviews, meetings, and podcasts into editable text directly in your browser.' },
      'mp3-to-text': { title: 'MP3 to Text - Free Online Audio Transcriber', description: 'Convert MP3 files to text privately in your browser. Free AI transcription with subtitle and lyrics exports.', h1: 'MP3 to Text', intro: 'Upload an MP3 file and create readable text, subtitles, or timed lyrics without sending the audio to a server.' },
      'audio-to-srt': { title: 'Audio to SRT - Free Subtitle Generator', description: 'Create SRT subtitles from audio files with a free browser-based AI subtitle generator.', h1: 'Audio to SRT', intro: 'Turn spoken audio into timestamped SRT subtitles for video editing, publishing, and caption workflows.' }
    }
  },
  {
    slug: 'zh-cn', code: 'zh-hans', htmlLang: 'zh-CN',
    homeTitle: '免费 AI 音频转文字、字幕与歌词工具',
    homeDescription: '免费在浏览器中将音频和视频转成文字、字幕和歌词，支持 TXT、SRT、VTT、LRC 导出，无需注册，时长不限。',
    eyebrow: '免费浏览器转写工具', homeHeading: '免费 AI 音频转文字、字幕与歌词工具',
    homeIntro: '在浏览器中使用 AI 将音频或视频转成文字、字幕和带时间轴的歌词。免费、隐私友好、开源，时长不限。',
    howItWorks: '使用方法', whyUseIt: '为什么选择它', openTool: '打开转写工具', relatedTools: '相关工具', faq: '常见问题',
    steps: ['上传音频或视频文件。', '选择转写语言和模型。', '预览文字并导出 TXT、SRT、VTT 或 LRC。'],
    benefits: ['文件默认在浏览器本地处理。', '适合访谈、播客、会议、音乐和视频字幕。', '无需账号、数据库或付费转写接口。'],
    tools: {
      'audio-to-text': { title: '音频转文字 - 免费 AI 转写工具', description: '在浏览器中免费将音频转换为文字，支持 TXT、SRT、VTT 和 LRC 导出。', h1: '音频转文字', intro: '将录音、访谈、会议和播客直接转换为可编辑文字。文件默认不会上传到服务器。' },
      'mp3-to-text': { title: 'MP3 转文字 - 免费在线音频转写工具', description: '在浏览器中免费将 MP3 转成文字、字幕和歌词，隐私友好且无需注册。', h1: 'MP3 转文字', intro: '上传 MP3 文件，生成文字、字幕或带时间轴的歌词，不需要把音频发送到服务器。' },
      'audio-to-srt': { title: '音频转 SRT - 免费字幕生成器', description: '使用免费的浏览器 AI 工具从音频生成 SRT 字幕文件。', h1: '音频转 SRT', intro: '把语音音频转换为带时间轴的 SRT 字幕，适合视频剪辑、发布和字幕制作。' }
    }
  },
  {
    slug: 'zh-tw', code: 'zh-hant', htmlLang: 'zh-TW',
    homeTitle: '免費 AI 音訊轉文字、字幕與歌詞工具',
    homeDescription: '在瀏覽器中免費將音訊和影片轉成文字、字幕與歌詞，支援 TXT、SRT、VTT、LRC 匯出，無需註冊。',
    eyebrow: '免費瀏覽器轉寫工具', homeHeading: '免費 AI 音訊轉文字、字幕與歌詞工具',
    homeIntro: '在瀏覽器中使用 AI 將音訊或影片轉成文字、字幕和帶時間軸的歌詞。免費、隱私友好、開源。',
    howItWorks: '使用方法', whyUseIt: '為什麼選擇它', openTool: '開啟轉寫工具', relatedTools: '相關工具', faq: '常見問題',
    steps: ['上傳音訊或影片檔案。', '選擇轉寫語言和模型。', '預覽文字並匯出 TXT、SRT、VTT 或 LRC。'],
    benefits: ['檔案預設在瀏覽器本機處理。', '適合訪談、Podcast、會議、音樂和影片字幕。', '無需帳號、資料庫或付費轉寫 API。'],
    tools: {
      'audio-to-text': { title: '音訊轉文字 - 免費 AI 轉寫工具', description: '在瀏覽器中免費將音訊轉換為文字，支援 TXT、SRT、VTT 和 LRC 匯出。', h1: '音訊轉文字', intro: '將錄音、訪談、會議和 Podcast 直接轉換為可編輯文字。' },
      'mp3-to-text': { title: 'MP3 轉文字 - 免費線上音訊轉寫工具', description: '在瀏覽器中免費將 MP3 轉成文字、字幕和歌詞，無需註冊。', h1: 'MP3 轉文字', intro: '上傳 MP3 檔案，產生文字、字幕或帶時間軸的歌詞。' },
      'audio-to-srt': { title: '音訊轉 SRT - 免費字幕產生器', description: '使用免費的瀏覽器 AI 工具從音訊產生 SRT 字幕檔案。', h1: '音訊轉 SRT', intro: '將語音音訊轉換為帶時間軸的 SRT 字幕，適合影片剪輯和發佈。' }
    }
  },
  {
    slug: 'ja', code: 'japanese', htmlLang: 'ja',
    homeTitle: '無料 AI 音声文字起こし・字幕・歌詞ツール', homeDescription: 'ブラウザで音声や動画を文字、字幕、歌詞に変換。登録不要で TXT、SRT、VTT、LRC を無料出力できます。',
    eyebrow: '無料ブラウザ文字起こし', homeHeading: '無料 AI 音声文字起こし・字幕・歌詞ツール', homeIntro: 'ブラウザで音声や動画を文字、字幕、タイムスタンプ付き歌詞に変換できます。無料でプライバシーに配慮したオープンソースツールです。',
    howItWorks: '使い方', whyUseIt: '選ばれる理由', openTool: '文字起こしを開く', relatedTools: '関連ツール', faq: 'よくある質問',
    steps: ['音声または動画をアップロードします。', '言語とモデルを選択します。', '文字を確認して TXT、SRT、VTT、LRC を出力します。'], benefits: ['ファイルは基本的にブラウザ内で処理されます。', '会議、ポッドキャスト、動画字幕、音楽に使えます。', '登録や有料 API は必要ありません。'],
    tools: {
      'audio-to-text': { title: '音声をテキストに変換 - 無料 AI 文字起こし', description: 'ブラウザで音声を無料でテキストに変換し、字幕ファイルも出力できます。', h1: '音声をテキストに変換', intro: '録音、会議、インタビュー、ポッドキャストを編集可能なテキストに変換します。' },
      'mp3-to-text': { title: 'MP3をテキストに変換 - 無料文字起こし', description: 'MP3をブラウザでテキスト、字幕、歌詞に変換します。', h1: 'MP3をテキストに変換', intro: 'MP3ファイルからテキストやタイムスタンプ付き歌詞を作成します。' },
      'audio-to-srt': { title: '音声をSRTに変換 - 無料字幕生成', description: '音声からSRT字幕を作成できる無料のブラウザツールです。', h1: '音声をSRTに変換', intro: '音声を動画編集や公開に使えるタイムスタンプ付き字幕へ変換します。' }
    }
  },
  {
    slug: 'ko', code: 'korean', htmlLang: 'ko',
    homeTitle: '무료 AI 음성 텍스트 변환·자막·가사 도구', homeDescription: '브라우저에서 오디오와 비디오를 텍스트, 자막, 가사로 변환하세요. 가입 없이 TXT, SRT, VTT, LRC를 무료로 내보냅니다.',
    eyebrow: '무료 브라우저 음성 변환', homeHeading: '무료 AI 음성 텍스트 변환·자막·가사 도구', homeIntro: '브라우저에서 오디오와 비디오를 텍스트, 자막, 타임스탬프 가사로 변환합니다. 무료이며 개인정보를 보호하는 오픈 소스 도구입니다.',
    howItWorks: '사용 방법', whyUseIt: '이 도구를 사용하는 이유', openTool: '변환 도구 열기', relatedTools: '관련 도구', faq: '자주 묻는 질문',
    steps: ['오디오 또는 비디오 파일을 업로드합니다.', '언어와 모델을 선택합니다.', '결과를 확인하고 TXT, SRT, VTT 또는 LRC를 내보냅니다.'], benefits: ['파일은 기본적으로 브라우저에서 처리됩니다.', '회의, 인터뷰, 팟캐스트, 음악, 영상 자막에 적합합니다.', '계정이나 유료 API가 필요하지 않습니다.'],
    tools: {
      'audio-to-text': { title: '오디오를 텍스트로 변환 - 무료 AI 음성 변환', description: '브라우저에서 오디오를 무료로 텍스트로 변환하고 자막을 내보내세요.', h1: '오디오를 텍스트로 변환', intro: '녹음, 회의, 인터뷰와 팟캐스트를 편집 가능한 텍스트로 변환합니다.' },
      'mp3-to-text': { title: 'MP3를 텍스트로 변환 - 무료 음성 변환', description: 'MP3 파일을 브라우저에서 텍스트, 자막, 가사로 변환합니다.', h1: 'MP3를 텍스트로 변환', intro: 'MP3에서 텍스트와 시간 정보가 있는 가사를 만드세요.' },
      'audio-to-srt': { title: '오디오를 SRT로 변환 - 무료 자막 생성기', description: '오디오에서 SRT 자막을 만드는 무료 브라우저 도구입니다.', h1: '오디오를 SRT로 변환', intro: '음성을 영상 편집과 게시에 사용할 수 있는 타임스탬프 자막으로 변환합니다.' }
    }
  },
  {
    slug: 'es', code: 'spanish', htmlLang: 'es', homeTitle: 'Transcriptor de audio con IA gratis: texto, subtítulos y letras', homeDescription: 'Convierte audio y vídeo en texto, subtítulos y letras desde el navegador. Gratis, privado y sin registro.', eyebrow: 'Transcripción gratis en el navegador', homeHeading: 'Transcriptor de audio con IA gratis', homeIntro: 'Convierte audio y vídeo en texto, subtítulos y letras con marcas de tiempo. Gratis, privado y de código abierto.', howItWorks: 'Cómo funciona', whyUseIt: 'Por qué usarlo', openTool: 'Abrir transcriptor', relatedTools: 'Herramientas relacionadas', faq: 'Preguntas frecuentes', steps: ['Sube un archivo de audio o vídeo.', 'Elige el idioma y el modelo.', 'Revisa el texto y exporta TXT, SRT, VTT o LRC.'], benefits: ['Los archivos se procesan en el navegador.', 'Útil para entrevistas, podcasts, reuniones y subtítulos.', 'No necesitas una cuenta ni una API de pago.'], tools: {
      'audio-to-text': { title: 'Audio a texto - Transcripción IA gratis', description: 'Convierte audio a texto gratis desde el navegador y exporta subtítulos.', h1: 'Audio a texto', intro: 'Convierte grabaciones, entrevistas y podcasts en texto editable.' }, 'mp3-to-text': { title: 'MP3 a texto - Transcriptor de audio gratis', description: 'Convierte archivos MP3 en texto, subtítulos y letras desde el navegador.', h1: 'MP3 a texto', intro: 'Sube un MP3 y crea texto o letras con marcas de tiempo.' }, 'audio-to-srt': { title: 'Audio a SRT - Generador de subtítulos gratis', description: 'Crea subtítulos SRT desde audio con una herramienta de IA en el navegador.', h1: 'Audio a SRT', intro: 'Convierte voz en subtítulos SRT para edición y publicación de vídeo.' }
    }
  },
  {
    slug: 'fr', code: 'french', htmlLang: 'fr', homeTitle: 'Transcription audio IA gratuite : texte, sous-titres et paroles', homeDescription: 'Convertissez audio et vidéo en texte, sous-titres et paroles dans votre navigateur. Gratuit, privé et sans inscription.', eyebrow: 'Transcription gratuite dans le navigateur', homeHeading: 'Transcription audio IA gratuite', homeIntro: 'Transformez audio et vidéo en texte, sous-titres et paroles horodatées. Gratuit, privé et open source.', howItWorks: 'Comment ça marche', whyUseIt: 'Pourquoi l’utiliser', openTool: 'Ouvrir le transcripteur', relatedTools: 'Outils associés', faq: 'Questions fréquentes', steps: ['Importez un fichier audio ou vidéo.', 'Choisissez la langue et le modèle.', 'Vérifiez le texte et exportez TXT, SRT, VTT ou LRC.'], benefits: ['Les fichiers sont traités dans le navigateur.', 'Utile pour les réunions, podcasts, interviews et sous-titres.', 'Aucun compte ni API payante n’est nécessaire.'], tools: {
      'audio-to-text': { title: 'Audio en texte - Transcription IA gratuite', description: 'Convertissez gratuitement un audio en texte dans le navigateur et exportez des sous-titres.', h1: 'Audio en texte', intro: 'Transformez en texte éditable vos enregistrements, réunions et podcasts.' }, 'mp3-to-text': { title: 'MP3 en texte - Transcripteur audio gratuit', description: 'Convertissez vos fichiers MP3 en texte, sous-titres et paroles dans le navigateur.', h1: 'MP3 en texte', intro: 'Importez un MP3 pour créer du texte ou des paroles horodatées.' }, 'audio-to-srt': { title: 'Audio en SRT - Générateur de sous-titres gratuit', description: 'Créez des sous-titres SRT à partir d’un audio avec une IA dans le navigateur.', h1: 'Audio en SRT', intro: 'Transformez la voix en sous-titres SRT pour le montage et la publication.' }
    }
  },
  {
    slug: 'de', code: 'german', htmlLang: 'de', homeTitle: 'Kostenlose KI-Audiotranskription: Text, Untertitel und Liedtexte', homeDescription: 'Audio und Video direkt im Browser in Text, Untertitel und Liedtexte umwandeln. Kostenlos, privat und ohne Anmeldung.', eyebrow: 'Kostenlose Transkription im Browser', homeHeading: 'Kostenlose KI-Audiotranskription', homeIntro: 'Wandle Audio und Video in Text, Untertitel und Liedtexte mit Zeitmarken um. Kostenlos, privat und Open Source.', howItWorks: 'So funktioniert es', whyUseIt: 'Warum dieses Tool', openTool: 'Transkription öffnen', relatedTools: 'Ähnliche Tools', faq: 'Häufige Fragen', steps: ['Lade eine Audio- oder Videodatei hoch.', 'Wähle Sprache und Modell.', 'Prüfe den Text und exportiere TXT, SRT, VTT oder LRC.'], benefits: ['Dateien werden standardmäßig im Browser verarbeitet.', 'Geeignet für Interviews, Podcasts, Meetings und Untertitel.', 'Kein Konto und keine kostenpflichtige API erforderlich.'], tools: {
      'audio-to-text': { title: 'Audio zu Text - Kostenlose KI-Transkription', description: 'Audio kostenlos im Browser in Text umwandeln und Untertitel exportieren.', h1: 'Audio zu Text', intro: 'Wandle Aufnahmen, Interviews, Meetings und Podcasts in bearbeitbaren Text um.' }, 'mp3-to-text': { title: 'MP3 zu Text - Kostenloser Audio-Transkriptor', description: 'MP3-Dateien im Browser in Text, Untertitel und Liedtexte umwandeln.', h1: 'MP3 zu Text', intro: 'Lade eine MP3-Datei hoch und erstelle Text oder Liedtexte mit Zeitmarken.' }, 'audio-to-srt': { title: 'Audio zu SRT - Kostenloser Untertitel-Generator', description: 'SRT-Untertitel aus Audio mit einem kostenlosen Browser-KI-Tool erstellen.', h1: 'Audio zu SRT', intro: 'Sprache in zeitbasierte SRT-Untertitel für Videoschnitt und Veröffentlichung umwandeln.' }
    }
  }
];

export function getLocalizedLocale(slug: string) {
  return localizedSeoLocales.find((locale) => locale.slug === slug);
}

export function getAlternateLinks(siteUrl: URL, pathFor: (locale: LocalizedSeoLocale) => string) {
  return localizedSeoLocales.map((locale) => ({
    hreflang: locale.htmlLang.toLowerCase(),
    href: new URL(pathFor(locale), siteUrl).toString()
  }));
}
