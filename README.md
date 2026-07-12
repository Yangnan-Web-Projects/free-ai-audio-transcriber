# Free AI Audio Transcriber

Free AI Audio Transcriber is a private, browser-based tool for turning audio
and video into text, subtitles, and timed lyrics. Export TXT, SRT, VTT, and LRC
files without creating an account or uploading source media to a server.

[Try the demo](https://free-ai-audio-transcriber.pages.dev) | [View source](https://github.com/yangnan-web-projects/free-ai-audio-transcriber)

Your audio stays in your browser. There is no signup, no installation, and no
fixed time limit. Very long files still depend on browser memory, device speed,
and available storage.

## What It Does

- Transcribe MP3, WAV, M4A, WEBM, MP4, MOV, and other browser-decodable media.
- Choose Ant, Fox, Tiger, or Whale model presets.
- Use English, Chinese (Simplified), Chinese (Traditional), Japanese, Korean,
  Spanish, French, or German interfaces and transcription settings.
- Review timestamped transcription segments before exporting.
- Export TXT for text workflows, SRT for editing apps, VTT for web captions,
  and LRC for timed lyrics.
- Keep source audio and video on the visitor's device by default.

## How It Works

1. Choose an audio or video file.
2. Select a model and transcription language.
3. The browser downloads the selected public model on first use, then caches it
   when the browser allows.
4. Transcription runs locally in a Web Worker.
5. Review the result and download the format you need.

Model files are not committed to this repository. Production uses public
Hugging Face model sources by default, while media files are never sent to the
model host as part of transcription.

## Model Presets

| Preset | Model source | Intended tradeoff |
| --- | --- | --- |
| Ant Model | `onnx-community/whisper-tiny` q4 | Lowest load and accuracy |
| Fox Model | `onnx-community/whisper-base` q4 | Faster balanced option |
| Tiger Model | `onnx-community/whisper-small` q4 | Higher accuracy, longer wait |
| Whale Model | `onnx-community/whisper-medium_timestamped` q4 | Highest accuracy tier, heavy on devices |

Accuracy depends on the recording, language, background noise, selected model,
and the visitor's device. Always review text and subtitles before publishing.

## Tech Stack

- Astro, React, and TypeScript
- Transformers.js and Whisper-compatible ONNX models
- Browser Web Worker transcription
- Vitest
- Cloudflare Pages-ready static output

## Run Locally

```bash
npm install
npm run dev
```

Build the production site with:

```bash
npm run build
```

## Deploy to Cloudflare Pages

1. Fork or clone this repository.
2. Create a Cloudflare Pages project from the GitHub repository.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Configure `PUBLIC_SITE_URL` and `PUBLIC_GITHUB_URL` for your domain and fork.

See [deployment notes](docs/deployment.md) for custom domains, model delivery,
and sitemap submission.

## Privacy and Limitations

Source files are processed locally in the browser and are not uploaded to this
application's server by default. The first model load can be large, and long or
complex media may be slow on older devices. Browser codec support affects video
input, and subtitle timing depends on the returned timestamp segments.

## Roadmap

- Better timeline segmentation and subtitle timestamps
- Improved Chinese and English punctuation handling
- More resilient video support and MP4 audio extraction
- Model cache controls and optional R2 delivery
- Batch transcription, PWA support, dark mode, and more SEO pages

## License

MIT. See [LICENSE](LICENSE).
