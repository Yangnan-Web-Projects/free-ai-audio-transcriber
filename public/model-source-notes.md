# Model Source Notes

Free AI Audio Transcriber uses browser-compatible Whisper models through
Transformers.js. The default model choices are mapped to public Hugging Face
model identifiers:

- Ant Model: `onnx-community/whisper-tiny` q4
- Fox Model: `onnx-community/whisper-base` q4
- Tiger Model: `onnx-community/whisper-small` q4
- Blue Whale Model: `onnx-community/whisper-medium_timestamped` q4

The app loads models in the browser from Hugging Face by default. The first run
can require a large model download, depending on the selected model and browser
cache state. Local files in `public/models/` are development-only assets and
are intentionally excluded from the public GitHub repository.
