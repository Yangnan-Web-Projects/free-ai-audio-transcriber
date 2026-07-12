export interface SeoPageContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  steps: string[];
  benefits: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const seoPages: SeoPageContent[] = [
  {
    slug: 'audio-to-text',
    title: 'Audio to Text - Free AI Transcription Tool',
    description:
      'Convert audio to text locally in your browser with a free AI transcription tool. Export TXT, SRT, and VTT without uploading files.',
    h1: 'Audio to Text',
    intro:
      'Turn audio recordings into readable text with a private browser-based workflow. Choose a file, select a local AI model, and export the transcript.',
    steps: ['Upload an audio file.', 'Choose a local model level.', 'Preview the transcript and download TXT, SRT, or VTT.'],
    benefits: ['No server upload by default.', 'Useful for meetings, podcasts, interviews, and voice notes.', 'SEO-friendly subtitle exports for publishing.'],
    faq: [
      {
        question: 'Can I convert audio to text for free?',
        answer: 'Yes. The MVP uses browser-local AI transcription and does not require a paid API.'
      },
      {
        question: 'Which audio formats work best?',
        answer: 'MP3, WAV, M4A, and WEBM are the best first choices for local browser transcription.'
      }
    ]
  },
  {
    slug: 'mp3-to-text',
    title: 'MP3 to Text - Free Online Audio Transcriber',
    description:
      'Convert MP3 files to text in your browser. Free, private, and designed for TXT, SRT, and VTT subtitle export.',
    h1: 'MP3 to Text',
    intro:
      'Upload an MP3 file and turn spoken audio into text with a browser-based AI transcriber. Your file stays on your device.',
    steps: ['Choose your MP3 file.', 'Pick a local model.', 'Download the transcript or subtitle file.'],
    benefits: ['Works well for common compressed audio.', 'Private local processing.', 'Simple exports for editing tools.'],
    faq: [
      {
        question: 'Does MP3 transcription require an account?',
        answer: 'No. The MVP does not include login, cloud storage, or user history.'
      },
      {
        question: 'Can I create subtitles from MP3?',
        answer: 'Yes, when timestamped segments are returned by the local model, SRT and VTT exports are generated.'
      }
    ]
  },
  {
    slug: 'audio-to-srt',
    title: 'Audio to SRT - Free Subtitle Generator',
    description:
      'Create SRT subtitles from audio files with a free browser-based AI subtitle generator. No upload required by default.',
    h1: 'Audio to SRT',
    intro:
      'Generate editable SRT subtitle files from audio. The app uses timestamped transcription segments when available.',
    steps: ['Upload MP3, WAV, M4A, or WEBM audio.', 'Transcribe locally in your browser.', 'Download the generated .srt file.'],
    benefits: ['SRT works in many editors and video platforms.', 'Local processing protects source media.', 'Good for captions, tutorials, and social video workflows.'],
    faq: [
      {
        question: 'Are SRT timestamps perfect?',
        answer: 'No. Timestamps depend on model output and should be reviewed before publishing.'
      },
      {
        question: 'Can I edit the SRT after export?',
        answer: 'Yes. SRT is a plain text subtitle format that can be edited in subtitle tools or text editors.'
      }
    ]
  },
  {
    slug: 'video-to-subtitles',
    title: 'Video to Subtitles - Free AI Subtitle Tool',
    description:
      'Convert browser-supported video files into subtitles with a free local AI transcription tool. Export TXT, SRT, and VTT.',
    h1: 'Video to Subtitles',
    intro:
      'Try video files directly in the uploader and generate subtitles from the audio track when your browser can decode the file.',
    steps: ['Upload a browser-supported video file.', 'Pick a model and language setting.', 'Review and export subtitles.'],
    benefits: ['Useful for tutorials, clips, and presentations.', 'No default server upload.', 'Advanced video extraction is planned for future versions.'],
    faq: [
      {
        question: 'Does every video format work?',
        answer: 'Not yet. MVP video support depends on browser decoding. MP3 or WAV audio is the safest fallback.'
      },
      {
        question: 'Will video files be uploaded?',
        answer: 'No. The MVP is designed to process files locally in the browser.'
      }
    ]
  },
  {
    slug: 'mp4-to-srt',
    title: 'MP4 to SRT - Free Online Subtitle Converter',
    description:
      'Create SRT subtitles from MP4 files in your browser when the file can be decoded locally. Free and privacy-friendly.',
    h1: 'MP4 to SRT',
    intro:
      'Upload MP4 files and create SRT subtitles with local AI transcription. For best reliability, use MP4 files with browser-compatible audio.',
    steps: ['Select an MP4 file.', 'Let the browser process the audio locally.', 'Download SRT for editing or publishing.'],
    benefits: ['Good for video publishing workflows.', 'No account or backend storage.', 'Designed for Cloudflare Pages static hosting.'],
    faq: [
      {
        question: 'Why might an MP4 fail?',
        answer: 'Some codecs cannot be decoded by every browser. Exporting the audio track as MP3 or WAV can help.'
      },
      {
        question: 'Can I import the SRT into video editors?',
        answer: 'Yes. Most video editors accept SRT, though timing should be checked manually.'
      }
    ]
  },
  {
    slug: 'audio-to-vtt',
    title: 'Audio to VTT - Free WebVTT Generator',
    description:
      'Generate WebVTT subtitles from audio files locally in your browser. Free TXT, SRT, and VTT export options.',
    h1: 'Audio to VTT',
    intro:
      'Create WebVTT captions for web players and online publishing. The app converts timestamped local transcription segments into .vtt files.',
    steps: ['Upload audio.', 'Run browser-local transcription.', 'Download WebVTT for web video players.'],
    benefits: ['WebVTT is useful for HTML video captions.', 'Local model processing keeps files private.', 'TXT and SRT exports are available too.'],
    faq: [
      {
        question: 'What is VTT used for?',
        answer: 'WebVTT is commonly used for captions and subtitles in web video players.'
      },
      {
        question: 'Can I export both SRT and VTT?',
        answer: 'Yes. The same timestamped segments can be formatted as SRT or VTT.'
      }
    ]
  }
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
