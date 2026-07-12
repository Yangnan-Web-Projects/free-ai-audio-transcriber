const TARGET_SAMPLE_RATE = 16_000;

function getAudioContextConstructor() {
  return (
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  );
}

function mixToMono(audioBuffer: AudioBuffer) {
  const channelCount = audioBuffer.numberOfChannels;
  const mono = new Float32Array(audioBuffer.length);

  for (let channel = 0; channel < channelCount; channel += 1) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let index = 0; index < channelData.length; index += 1) {
      mono[index] += channelData[index] / channelCount;
    }
  }

  return mono;
}

function resampleLinear(input: Float32Array, sourceSampleRate: number, targetSampleRate: number) {
  if (sourceSampleRate === targetSampleRate) {
    return input;
  }

  const ratio = sourceSampleRate / targetSampleRate;
  const outputLength = Math.max(1, Math.round(input.length / ratio));
  const output = new Float32Array(outputLength);

  for (let outputIndex = 0; outputIndex < outputLength; outputIndex += 1) {
    const inputPosition = outputIndex * ratio;
    const leftIndex = Math.floor(inputPosition);
    const rightIndex = Math.min(leftIndex + 1, input.length - 1);
    const weight = inputPosition - leftIndex;
    output[outputIndex] = input[leftIndex] * (1 - weight) + input[rightIndex] * weight;
  }

  return output;
}

export async function decodeAudioFile(file: File, sampleRate = TARGET_SAMPLE_RATE) {
  if (typeof window === 'undefined') {
    throw new Error('Audio decoding is only available in the browser.');
  }

  const AudioContextConstructor = getAudioContextConstructor();

  if (!AudioContextConstructor) {
    throw new Error('This browser does not expose AudioContext for local audio decoding.');
  }

  const audioContext = new AudioContextConstructor({ sampleRate });

  try {
    const arrayBuffer = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    const mono = mixToMono(decoded);
    return resampleLinear(mono, decoded.sampleRate, sampleRate);
  } finally {
    await audioContext.close().catch(() => undefined);
  }
}

export function friendlyAudioDecodeError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (/AudioContext|decode|codec|format|audio/i.test(message)) {
    return 'This browser could not decode the selected file locally. Try MP3 or WAV for the most reliable result.';
  }

  if (/memory|allocation|out of/i.test(message)) {
    return 'Your browser ran out of memory while decoding this file. Try a shorter MP3 or WAV clip first.';
  }

  return message || 'The selected file could not be decoded locally.';
}
