var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
const DEFAULT_VOLUME = 0.5;
var isMuted = false;

function beepByStarCount(starCount) {
   const rank = Math.log(starCount - minStarCount) / Math.log(maxStarCount - minStarCount);
   beep(rank);
}

const primaryGainControl = audioCtx.createGain();
primaryGainControl.gain.setValueAtTime(DEFAULT_VOLUME, audioCtx.currentTime);
primaryGainControl.connect(audioCtx.destination);

const highPassFilter = audioCtx.createBiquadFilter();
highPassFilter.type = "highpass";
highPassFilter.frequency.setValueAtTime(1200, audioCtx.currentTime);
highPassFilter.Q.setValueAtTime(1, audioCtx.currentTime);
highPassFilter.connect(primaryGainControl);

const lowPassFilter = audioCtx.createBiquadFilter();
lowPassFilter.type = "lowpass";
lowPassFilter.frequency.setValueAtTime(300, audioCtx.currentTime);
lowPassFilter.Q.setValueAtTime(1, audioCtx.currentTime);
lowPassFilter.connect(highPassFilter);

/**
 * Rank is a number from 0 to 1
 * 0 is the lowest pitch
 * 1 is the highest pitch
 */
function beep(rank) {
   rank = Math.max(0, Math.min(1, rank));
   var oscillator = audioCtx.createOscillator();
   var gainNode = audioCtx.createGain();
   
   
   const volume = 0.50;
   const duration = 0.025

   const attack = 1/5*duration;
   const decay = 2/5*duration;
   const sustain = 0.5*volume;
   const release = 0.1*duration;

   oscillator.connect(gainNode);
   gainNode.connect(lowPassFilter);

   gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
   gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + attack);
   gainNode.gain.linearRampToValueAtTime(sustain, audioCtx.currentTime + attack + decay);
   gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + attack + decay + release);

   oscillator.type = "sine";
   oscillator.frequency.value = 600 + 300 * rank;
   oscillator.start();
   oscillator.stop(audioCtx.currentTime + attack + decay + release);
}

function muteBeeps() {
   isMuted = true;
   primaryGainControl.gain.setValueAtTime(0, audioCtx.currentTime);
}

function unmuteBeeps() {
   isMuted = false;
   primaryGainControl.gain.setValueAtTime(DEFAULT_VOLUME, audioCtx.currentTime);
}