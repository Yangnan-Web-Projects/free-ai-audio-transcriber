export const siteCopy = {
  siteName: 'Free AI Audio Transcriber',
  nav: {
    tools: 'Tools',
    faq: 'FAQ',
    privacy: 'Privacy',
    github: 'GitHub'
  },
  hero: {
    title: 'Free AI Audio Transcriber',
    subtitle:
      'Convert audio and video files into TXT, SRT, and VTT subtitles directly in your browser. Private, free, and no upload required.',
    cta: 'Upload a file'
  },
  notices: {
    local: 'Your file is processed locally in your browser and is not uploaded to our server.',
    device:
      'Transcription uses your device’s CPU/GPU. For long files, your computer may get warm or the fan may run.',
    firstUse:
      'First use may require downloading an AI model. This may take some time depending on your network.'
  },
  faq: [
    {
      question: 'Is Free AI Audio Transcriber really free?',
      answer:
        'Yes. The MVP runs in your browser with local AI models and does not require a paid transcription API.'
    },
    {
      question: 'Are my files uploaded?',
      answer:
        'No. Files are processed locally in your browser by default. This project does not include a server upload path.'
    },
    {
      question: 'Why does the first transcription take longer?',
      answer:
        'The browser may need to download an AI model the first time you use the tool. Later runs can be faster if your browser keeps the model cached.'
    },
    {
      question: 'Can I export subtitles?',
      answer:
        'Yes. When timestamped segments are available, the app can export TXT, SRT, and VTT files.'
    },
    {
      question: 'How accurate is it?',
      answer:
        'Accuracy depends on the model, recording quality, accents, background noise, and device performance. Always review subtitles before publishing.'
    }
  ],
  features: [
    {
      title: 'Local processing',
      text: 'Transcribe in your browser without sending the media file to a server.'
    },
    {
      title: 'No account required',
      text: 'Open the page, choose a file, and start. No login or database is needed.'
    },
    {
      title: 'Subtitle exports',
      text: 'Download plain text, SRT, or WebVTT for editing and publishing workflows.'
    },
    {
      title: 'Audio and video input',
      text: 'Start with common audio files. Browser-supported video files can be tried in the same uploader.'
    }
  ]
};
