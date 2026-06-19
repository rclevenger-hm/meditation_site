const routines = {
  light: {
    name: "Regenerating Light",
    cueLabel: "Anchor phrase",
    cue: "Time flows within me like regenerating light.",
    phaseDefault: "Breathe in",
    footer: "Golden light visualization with spoken anchoring.",
    stages: [
      {
        title: "Preparation",
        instruction:
          "Sit comfortably. Breathe deeply for 4 seconds in, hold for 2 seconds, then exhale gently into alpha/theta calm.",
        spoken:
          "Preparation. Sit comfortably. Breathe in for four seconds. Hold for two seconds. Exhale gently. Let the body settle into alpha theta calm.",
        weight: 0.23,
      },
      {
        title: "Visualization",
        instruction:
          "Focus on the pineal gland at the center of the forehead and imagine a golden sphere of light expanding.",
        spoken:
          "Visualization. Focus on the center of the forehead. Imagine a golden sphere of light expanding from within.",
        weight: 0.2,
      },
      {
        title: "Anchoring",
        instruction:
          "Repeat the phrase with quiet certainty, letting each word settle into the body.",
        spoken:
          "Anchoring. Repeat after me. Time flows within me like regenerating light. Time flows within me like regenerating light.",
        weight: 0.2,
      },
      {
        title: "Feeling",
        instruction:
          "Bring to mind a memory of wholeness and feel it as your current reality.",
        spoken:
          "Feeling. Bring to mind a memory of wholeness. Feel it now as your current reality.",
        weight: 0.2,
      },
      {
        title: "Silence",
        instruction:
          "Rest in absolute presence and let the neuronal field reorganize in stillness.",
        spoken:
          "Silence. Rest in absolute presence. Let the neuronal field reorganize in stillness.",
        weight: 0.17,
      },
    ],
  },
  mindfulness: {
    name: "Mindfulness",
    cueLabel: "Present cue",
    cue: "Know the breath. Know this moment.",
    phaseDefault: "Notice",
    footer: "Breath, sensation, and present-moment awareness.",
    stages: [
      {
        title: "Arrive",
        instruction: "Feel the body where it is supported. Let the eyes close or soften.",
        spoken: "Arrive. Feel the body where it is supported. Let the eyes close or soften.",
        weight: 0.16,
      },
      {
        title: "Breath",
        instruction: "Rest attention on the natural breath without changing it.",
        spoken: "Breath. Rest your attention on the natural breath without needing to change it.",
        weight: 0.28,
      },
      {
        title: "Sensation",
        instruction: "Notice sounds, contact, temperature, and movement as passing events.",
        spoken: "Sensation. Notice sounds, contact, temperature, and movement as passing events.",
        weight: 0.22,
      },
      {
        title: "Return",
        instruction: "When the mind wanders, gently return to the next breath.",
        spoken: "Return. When the mind wanders, gently return to the next breath.",
        weight: 0.2,
      },
      {
        title: "Open",
        instruction: "Open awareness to the whole field of this moment.",
        spoken: "Open. Let awareness include the whole field of this moment.",
        weight: 0.14,
      },
    ],
  },
  mantra: {
    name: "Mantra-Style",
    cueLabel: "Silent sound",
    cue: "So hum",
    phaseDefault: "Repeat",
    footer: "A gentle mantra-style practice, not official TM instruction.",
    stages: [
      {
        title: "Settle",
        instruction: "Sit comfortably and let the breath become easy.",
        spoken: "Settle. Sit comfortably and let the breath become easy.",
        weight: 0.16,
      },
      {
        title: "Introduce",
        instruction: "Let a simple sound or phrase arise softly in the mind.",
        spoken:
          "Introduce the mantra. Let a simple sound or phrase arise softly in the mind. You might use so hum, or another neutral sound.",
        weight: 0.18,
      },
      {
        title: "Repeat",
        instruction: "Repeat the sound silently, with no force and no need to concentrate hard.",
        spoken:
          "Repeat silently. Let the sound come and go with gentle effortlessness. If thoughts come, return softly.",
        weight: 0.34,
      },
      {
        title: "Soften",
        instruction: "Allow the mantra to become quieter, subtler, and more spacious.",
        spoken: "Soften. Allow the mantra to become quieter, subtler, and more spacious.",
        weight: 0.2,
      },
      {
        title: "Rest",
        instruction: "Release the sound and rest in the quiet that remains.",
        spoken: "Rest. Release the sound and rest in the quiet that remains.",
        weight: 0.12,
      },
    ],
  },
  lovingKindness: {
    name: "Loving-Kindness",
    cueLabel: "Kindness phrases",
    cue: "May I be safe. May I be happy. May I live with ease.",
    phaseDefault: "Offer",
    footer: "Goodwill phrases for self, loved ones, and all beings.",
    stages: [
      {
        title: "Self",
        instruction: "Offer kindness inward: may I be safe, healthy, happy, and at ease.",
        spoken:
          "Self. Offer kindness inward. May I be safe. May I be healthy. May I be happy. May I live with ease.",
        weight: 0.24,
      },
      {
        title: "Loved One",
        instruction: "Picture someone dear and offer them the same warmth.",
        spoken:
          "Loved one. Picture someone dear. May you be safe. May you be healthy. May you be happy. May you live with ease.",
        weight: 0.22,
      },
      {
        title: "Neutral",
        instruction: "Bring to mind a neutral person and include them in goodwill.",
        spoken:
          "Neutral person. Bring to mind someone you barely know. May you be safe. May you be happy. May you live with ease.",
        weight: 0.18,
      },
      {
        title: "Difficult",
        instruction: "If possible, soften around someone difficult without forcing affection.",
        spoken:
          "Difficult person. If it is possible, offer a little space. May you be free from suffering. May you live with ease.",
        weight: 0.18,
      },
      {
        title: "All Beings",
        instruction: "Extend the wish outward: may we be safe, happy, and at ease.",
        spoken: "All beings. May we be safe. May we be healthy. May we be happy. May we live with ease.",
        weight: 0.18,
      },
    ],
  },
  bodyScan: {
    name: "Body Scan",
    cueLabel: "Awareness cue",
    cue: "Notice, soften, release.",
    phaseDefault: "Scan",
    footer: "A guided sweep through body sensations.",
    stages: [
      {
        title: "Ground",
        instruction: "Feel the points of contact with the chair, floor, or cushion.",
        spoken: "Ground. Feel the points of contact with the chair, floor, or cushion.",
        weight: 0.14,
      },
      {
        title: "Feet & Legs",
        instruction: "Move awareness through feet, ankles, calves, knees, and thighs.",
        spoken: "Feet and legs. Notice the feet, ankles, calves, knees, and thighs. Let them soften.",
        weight: 0.22,
      },
      {
        title: "Belly & Chest",
        instruction: "Notice the belly, ribs, chest, and the movement of breathing.",
        spoken: "Belly and chest. Notice the belly, ribs, chest, and the movement of breathing.",
        weight: 0.22,
      },
      {
        title: "Hands & Face",
        instruction: "Scan the hands, shoulders, jaw, eyes, and forehead.",
        spoken: "Hands and face. Scan the hands, shoulders, jaw, eyes, and forehead. Release what can release.",
        weight: 0.22,
      },
      {
        title: "Whole Body",
        instruction: "Feel the whole body breathing as one field.",
        spoken: "Whole body. Feel the whole body breathing as one field.",
        weight: 0.2,
      },
    ],
  },
  zenCounting: {
    name: "Zen Counting",
    cueLabel: "Counting cue",
    cue: "One breath. One count. Begin again.",
    phaseDefault: "Count",
    footer: "A breath-counting concentration practice.",
    stages: [
      {
        title: "Posture",
        instruction: "Sit upright but relaxed. Let the hands and jaw soften.",
        spoken: "Posture. Sit upright but relaxed. Let the hands and jaw soften.",
        weight: 0.14,
      },
      {
        title: "Find Breath",
        instruction: "Feel the breath at the nose, chest, or belly.",
        spoken: "Find the breath. Feel it at the nose, chest, or belly.",
        weight: 0.16,
      },
      {
        title: "Count",
        instruction: "Count each exhale from one to ten, then begin again.",
        spoken: "Count. Count each exhale from one to ten, then begin again.",
        weight: 0.34,
      },
      {
        title: "Begin Again",
        instruction: "If you lose count, simply return to one without judgment.",
        spoken: "Begin again. If you lose count, simply return to one without judgment.",
        weight: 0.2,
      },
      {
        title: "Just Sitting",
        instruction: "Release the count and sit with open, steady attention.",
        spoken: "Just sitting. Release the count and sit with open, steady attention.",
        weight: 0.16,
      },
    ],
  },
};

const durationOptions = [60, 300, 600, 1200, 3600];
const ringRadius = 226;
const ringLength = 2 * Math.PI * ringRadius;
const state = {
  routineKey: "light",
  duration: 60,
  stages: [],
  isRunning: false,
  elapsed: 0,
  lastTick: 0,
  frameId: null,
  lastStageIndex: 0,
  hasStartedAudio: false,
  completionCuePlayed: false,
};

const audio = {
  context: null,
  master: null,
  toneCache: new Map(),
  activeCues: new Set(),
  narration: null,
  background: null,
  backgroundFadeId: null,
};

const voiceState = {
  voices: [],
  selectedVoiceURI: "",
};

const practice = document.querySelector(".practice");
const routineTitle = document.querySelector("#routine-title");
const startPauseButton = document.querySelector("#start-pause");
const restartButton = document.querySelector("#restart");
const remaining = document.querySelector("#remaining");
const progressRing = document.querySelector("#progress-ring");
const stageCount = document.querySelector("#stage-count");
const stageTitle = document.querySelector("#stage-title");
const stageInstruction = document.querySelector("#stage-instruction");
const phaseLabel = document.querySelector("#phase-label");
const breathOrb = document.querySelector("#breath-orb");
const anchorLabel = document.querySelector("#anchor-label");
const anchorPhrase = document.querySelector("#anchor-phrase");
const footerLine = document.querySelector(".footer-line > span:last-child");
const stepItems = [...document.querySelectorAll(".step")];
const modeButtons = [...document.querySelectorAll(".mode-button")];
const durationButtons = [...document.querySelectorAll(".duration-button")];
const voiceSelect = document.querySelector("#voice-select");

function buildStages(routine, duration) {
  const raw = routine.stages.map((stage) => ({
    ...stage,
    duration: Math.max(8, Math.round(duration * stage.weight)),
  }));
  const drift = duration - raw.reduce((sum, stage) => sum + stage.duration, 0);
  raw[raw.length - 1].duration += drift;
  return raw;
}

function getStageRanges(stages) {
  let cursor = 0;
  return stages.map((stage) => {
    const start = cursor;
    cursor += stage.duration;
    return { start, end: cursor };
  });
}

function formatTime(seconds) {
  const clamped = Math.max(0, Math.ceil(seconds));
  if (clamped === 60) return "00:60";
  const minutes = Math.floor(clamped / 60);
  const remainingSeconds = clamped % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function formatRange(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function getStageIndex(elapsed) {
  let cursor = 0;
  for (let index = 0; index < state.stages.length; index += 1) {
    cursor += state.stages[index].duration;
    if (elapsed < cursor) return index;
  }
  return state.stages.length - 1;
}

function getBreathPhase(elapsed, stageIndex) {
  const routine = routines[state.routineKey];
  if (state.routineKey !== "light") return ["hold", routine.phaseDefault];
  if (stageIndex !== 0) return stageIndex === 4 ? ["presence", "Presence"] : ["hold", "Expand"];

  const cycle = elapsed % 10;
  if (cycle < 4) return ["inhale", "Breathe in"];
  if (cycle < 6) return ["hold", "Hold"];
  return ["exhale", "Exhale gently"];
}

function render() {
  const routine = routines[state.routineKey];
  const elapsed = Math.min(state.elapsed, state.duration);
  const stageIndex = getStageIndex(elapsed);
  const stage = state.stages[stageIndex];
  const [phase, label] = getBreathPhase(elapsed, stageIndex);
  const progress = elapsed / state.duration;
  const ranges = getStageRanges(state.stages);

  routineTitle.textContent = `${routine.name} Meditation`;
  remaining.textContent = formatTime(state.duration - elapsed);
  progressRing.style.strokeDashoffset = String(ringLength * (1 - progress));

  if (state.hasStartedAudio && stageIndex !== state.lastStageIndex && elapsed < state.duration) {
    playStageCue(stageIndex);
    speakStage(stageIndex);
  }

  if (state.hasStartedAudio && elapsed >= state.duration && !state.completionCuePlayed) {
    state.completionCuePlayed = true;
    playCompletionCue();
    fadeOutBackgroundMusic();
  }

  state.lastStageIndex = stageIndex;
  stageCount.textContent = `Step ${stageIndex + 1} of ${state.stages.length}`;
  stageTitle.textContent = stage.title;
  stageInstruction.textContent = stage.instruction;
  phaseLabel.textContent = label;
  breathOrb.dataset.phase = phase;
  anchorLabel.textContent = routine.cueLabel;
  anchorPhrase.innerHTML = `<span aria-hidden="true">&ldquo;</span>${routine.cue}<span aria-hidden="true">&rdquo;</span>`;
  footerLine.textContent = routine.footer;

  stepItems.forEach((item, index) => {
    const current = state.stages[index];
    const range = ranges[index];
    item.classList.toggle("is-active", index === stageIndex && elapsed < state.duration);
    item.classList.toggle("is-complete", index < stageIndex || elapsed >= state.duration);
    item.querySelector(".step-number").textContent = String(index + 1);
    item.querySelector("strong").textContent = current.title;
    item.querySelector("small").textContent = `${formatRange(range.start)} - ${formatRange(range.end)}`;
  });

  modeButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.routine === state.routineKey);
  });
  durationButtons.forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.duration) === state.duration);
  });

  practice.classList.toggle("is-finished", elapsed >= state.duration);
  startPauseButton.classList.toggle("is-running", state.isRunning);
  setStartPauseButton(elapsed >= state.duration || !state.isRunning ? "Start" : "Pause");
}

function setStartPauseButton(label) {
  startPauseButton.setAttribute("aria-label", `${label} routine`);
  startPauseButton.querySelector(".button-text").textContent = label;
}

function tick(timestamp) {
  if (!state.isRunning) return;
  if (!state.lastTick) state.lastTick = timestamp;

  const delta = (timestamp - state.lastTick) / 1000;
  state.lastTick = timestamp;
  state.elapsed = Math.min(state.duration, state.elapsed + delta);
  render();

  if (state.elapsed < state.duration) {
    state.frameId = requestAnimationFrame(tick);
  }
}

function resetTimer({ keepRunning = false, speak = false } = {}) {
  cancelAnimationFrame(state.frameId);
  stopAudioCues();
  pauseBackgroundMusic({ reset: true });
  state.elapsed = 0;
  state.lastTick = 0;
  state.lastStageIndex = 0;
  state.completionCuePlayed = false;
  state.isRunning = keepRunning;
  if (keepRunning) {
    playBackgroundMusic({ restart: true });
  }
  if (speak && state.hasStartedAudio) {
    playRestartCue();
    speakStage(0);
  }
  if (keepRunning) {
    state.frameId = requestAnimationFrame(tick);
  }
  render();
}

function start() {
  const shouldRestartBackground = state.elapsed >= state.duration || state.elapsed === 0;
  if (state.elapsed >= state.duration) state.elapsed = 0;
  state.completionCuePlayed = false;
  state.isRunning = true;
  state.hasStartedAudio = true;
  state.lastTick = 0;
  cancelAnimationFrame(state.frameId);
  enableAudio();
  playBackgroundMusic({ restart: shouldRestartBackground });
  playStartCue();
  speakStage(getStageIndex(state.elapsed));
  state.frameId = requestAnimationFrame(tick);
  render();
}

function pause() {
  state.isRunning = false;
  cancelAnimationFrame(state.frameId);
  state.frameId = null;
  stopAudioCues();
  pauseBackgroundMusic();
  render();
}

function restart() {
  resetTimer({ keepRunning: state.isRunning, speak: true });
}

function selectRoutine(key) {
  state.routineKey = key;
  state.stages = buildStages(routines[key], state.duration);
  resetTimer();
}

function selectDuration(duration) {
  state.duration = duration;
  state.stages = buildStages(routines[state.routineKey], state.duration);
  resetTimer();
}

startPauseButton.addEventListener("click", () => {
  if (state.isRunning) {
    pause();
  } else {
    start();
  }
});

restartButton.addEventListener("click", restart);
modeButtons.forEach((button) => {
  button.addEventListener("click", () => selectRoutine(button.dataset.routine));
});
durationButtons.forEach((button) => {
  button.addEventListener("click", () => selectDuration(Number(button.dataset.duration)));
});
voiceSelect.addEventListener("change", () => {
  voiceState.selectedVoiceURI = voiceSelect.value;
});

function enableAudio() {
  if (audio.context) {
    audio.context.resume?.();
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  audio.context = new AudioContext();
  audio.master = audio.context.createGain();
  audio.master.gain.value = 0.18;
  audio.master.connect(audio.context.destination);
}

function playTone(frequency, startOffset, duration, type = "sine", volume = 0.5) {
  if (!audio.context || !audio.master) {
    window.setTimeout(() => playToneFallback(frequency, duration, volume), startOffset * 1000);
    return;
  }

  const startAt = audio.context.currentTime + startOffset;
  const oscillator = audio.context.createOscillator();
  const gain = audio.context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(gain);
  gain.connect(audio.master);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
}

function playToneFallback(frequency, duration, volume) {
  if (!document?.createElement) return;

  const key = `${Math.round(frequency)}-${duration}-${volume}`;
  if (!audio.toneCache.has(key)) {
    audio.toneCache.set(key, createToneDataUrl(frequency, duration, volume));
  }

  const cue = document.createElement("audio");
  cue.src = audio.toneCache.get(key);
  cue.volume = Math.min(1, Math.max(0, volume));
  audio.activeCues.add(cue);
  cue.addEventListener("ended", () => audio.activeCues.delete(cue), { once: true });
  cue.play().catch(() => {});
}

function createToneDataUrl(frequency, duration, volume) {
  const sampleRate = 22050;
  const samples = Math.max(1, Math.floor(sampleRate * duration));
  const bytesPerSample = 2;
  const dataSize = samples * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  for (let index = 0; index < samples; index += 1) {
    const position = index / sampleRate;
    const fadeIn = Math.min(1, index / (sampleRate * 0.025));
    const fadeOut = Math.min(1, (samples - index) / (sampleRate * 0.08));
    const envelope = Math.min(fadeIn, fadeOut);
    const sample = Math.sin(2 * Math.PI * frequency * position) * volume * envelope;
    view.setInt16(44 + index * bytesPerSample, sample * 32767, true);
  }

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

function writeString(view, offset, value) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

function playStartCue() {
  playTone(432, 0, 0.32);
  playTone(648, 0.08, 0.42);
}

function playStageCue(stageIndex) {
  const notes = [432, 486, 540, 612, 729];
  playTone(notes[stageIndex] || 540, 0, 0.28);
  playTone((notes[stageIndex] || 540) * 1.5, 0.09, 0.34);
}

function playRestartCue() {
  playTone(540, 0, 0.22);
  playTone(432, 0.08, 0.32);
}

function playCompletionCue() {
  playTone(486, 0, 0.45);
  playTone(648, 0.12, 0.55);
  playTone(864, 0.26, 0.7);
}

function speakStage(stageIndex) {
  const stage = state.stages[stageIndex];
  if (playNarrationClip(stageIndex, stage.spoken || `${stage.title}. ${stage.instruction}`)) return;
  speakText(stage.spoken || `${stage.title}. ${stage.instruction}`);
}

function playNarrationClip(stageIndex, fallbackText) {
  if (!document?.createElement) return false;

  if (audio.narration) {
    audio.narration.pause();
    audio.narration.currentTime = 0;
  }

  const clip = document.createElement("audio");
  clip.src = `assets/audio/${state.routineKey}/stage-${stageIndex + 1}.mp3`;
  clip.preload = "auto";
  clip.volume = 0.96;
  audio.narration = clip;
  clip.play().catch(() => {
    if (audio.narration === clip) audio.narration = null;
    speakText(fallbackText);
  });
  return true;
}

function ensureBackgroundMusic() {
  if (audio.background || !document?.createElement) return audio.background;

  audio.background = document.createElement("audio");
  audio.background.src = "assets/music/breath-tide.mp3";
  audio.background.loop = true;
  audio.background.preload = "auto";
  audio.background.volume = 0.16;
  return audio.background;
}

function playBackgroundMusic({ restart = false } = {}) {
  const track = ensureBackgroundMusic();
  if (!track) return;

  if (audio.backgroundFadeId) {
    window.clearInterval(audio.backgroundFadeId);
    audio.backgroundFadeId = null;
  }

  if (restart) track.currentTime = 0;
  track.volume = 0.16;
  track.play().catch(() => {});
}

function pauseBackgroundMusic({ reset = false } = {}) {
  if (!audio.background) return;
  if (audio.backgroundFadeId) {
    window.clearInterval(audio.backgroundFadeId);
    audio.backgroundFadeId = null;
  }

  audio.background.pause();
  if (reset) audio.background.currentTime = 0;
}

function fadeOutBackgroundMusic() {
  if (!audio.background) return;
  if (audio.backgroundFadeId) window.clearInterval(audio.backgroundFadeId);

  const fadeSteps = 18;
  const startVolume = audio.background.volume;
  let step = 0;
  audio.backgroundFadeId = window.setInterval(() => {
    step += 1;
    audio.background.volume = Math.max(0, startVolume * (1 - step / fadeSteps));
    if (step >= fadeSteps) {
      pauseBackgroundMusic({ reset: true });
      audio.background.volume = 0.16;
    }
  }, 90);
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getSelectedVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = 0.76;
  utterance.pitch = 1.02;
  utterance.volume = 0.86;
  window.speechSynthesis.speak(utterance);
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;

  voiceState.voices = window.speechSynthesis.getVoices();
  const englishVoices = voiceState.voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const voices = englishVoices.length ? englishVoices : voiceState.voices;
  const preferred = chooseWarmVoice(voices);

  voiceSelect.innerHTML = '<option value="">Auto</option>';
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = voice.name.replace(/\s*\(.*?\)\s*/g, "");
    voiceSelect.append(option);
  });

  if (!voiceState.selectedVoiceURI && preferred) {
    voiceSelect.value = preferred.voiceURI;
    voiceState.selectedVoiceURI = preferred.voiceURI;
  } else {
    voiceSelect.value = voiceState.selectedVoiceURI;
  }
}

function chooseWarmVoice(voices) {
  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
}

function scoreVoice(voice) {
  const name = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  let score = 0;
  if (voice.lang?.toLowerCase().startsWith("en")) score += 8;
  if (name.includes("natural") || name.includes("neural") || name.includes("online")) score += 10;
  if (name.includes("aria") || name.includes("jenny") || name.includes("emma") || name.includes("sara")) score += 7;
  if (name.includes("female") || name.includes("woman")) score += 2;
  if (name.includes("david") || name.includes("mark") || name.includes("desktop")) score -= 4;
  if (voice.localService) score += 1;
  return score;
}

function getSelectedVoice() {
  if (!voiceState.voices.length) loadVoices();
  return voiceState.voices.find((voice) => voice.voiceURI === voiceState.selectedVoiceURI) || chooseWarmVoice(voiceState.voices);
}

function stopAudioCues() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (audio.context?.state === "running") {
    audio.context.suspend?.();
  }

  audio.activeCues.forEach((cue) => {
    cue.pause();
    cue.currentTime = 0;
  });
  audio.activeCues.clear();

  if (audio.narration) {
    audio.narration.pause();
    audio.narration.currentTime = 0;
    audio.narration = null;
  }
}

state.stages = buildStages(routines[state.routineKey], state.duration);
loadVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
}
render();
