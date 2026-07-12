# Model Options

The UI uses animal-themed names so users do not need to understand model identifiers.

The app uses four manual animal tiers. Whale Model is the current default so users can test the highest local accuracy tier first, while Ant, Fox, and Tiger are available when speed matters more.

## Whale Model

- Display name: Whale Model
- Model mapping: `onnx-community/whisper-medium_timestamped`
- Dtype: q4
- Speed: Very Slow
- Accuracy: Higher
- Device load: Very High
- Status: default, experimental, and heavy for MVP
- Best for: modern desktops with plenty of memory and users willing to wait for better local transcription quality

## Tiger Model

- Display name: Tiger Model
- Model mapping: `onnx-community/whisper-small`
- Dtype: q4
- Speed: Slow
- Accuracy: High
- Device load: High
- Best for: regular desktop transcription when Ant is too rough
- Role: high-accuracy tier below Whale

## Fox Model

- Display name: Fox Model
- Model mapping: `onnx-community/whisper-base`
- Dtype: q4
- Speed: Medium
- Accuracy: Good
- Device load: Medium
- Best for: everyday desktop files when Ant is too rough but Tiger feels too slow
- Role: faster balance option below Tiger

## Ant Model

- Display name: Ant Model
- Model mapping: `onnx-community/whisper-tiny`
- Dtype: q4
- Speed: Fast
- Accuracy: Basic
- Device load: Low
- Best for: quick drafts, short audio, old computers, mobile devices, and first attempts
- Role: fastest local preset

## Language selection

The UI includes Chinese (Simplified) and Chinese (Traditional). Both use Whisper's `chinese` language setting, and the app normalizes the completed transcript to the selected script before preview and export.

## Important limitations

The app does not hard-code accuracy percentages. Actual quality depends on audio quality, language, model choice, background noise, speaker clarity, and browser/device performance.

Video upload support depends on browser decoding. If a video fails, extract the audio as MP3 or WAV and try again.
