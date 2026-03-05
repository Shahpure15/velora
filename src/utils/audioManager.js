// NOTE: Place "sunflower.mp3" (Spider-Man: Into the Spider-Verse theme by Post Malone & Swae Lee)
// in src/assets/music/ directory before building

// Import will fail until file is added - replace path if using different filename
import bgMusicFile from '../assets/music/sunflower.mp3';

let isAudioEnabled = false;
let audioListeners = [];

export const subscribeToAudioState = (cb) => {
  audioListeners.push(cb);
  cb(isAudioEnabled);
  return () => {
    audioListeners = audioListeners.filter(l => l !== cb);
  };
};

const notifyAudioState = () => {
  audioListeners.forEach(cb => cb(isAudioEnabled));
};

// Web Audio API setup for spatial audio
let audioContext = null;
let audioSource = null;
let panNode = null;
let gainNode = null;
let bgMusicAudio = null;

// Initialize audio with Web Audio API for spatial panning
export const initAudio = () => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create audio element
    bgMusicAudio = new Audio(bgMusicFile);
    bgMusicAudio.loop = true;
    bgMusicAudio.crossOrigin = "anonymous";
    
    // Create Web Audio nodes
    audioSource = audioContext.createMediaElementSource(bgMusicAudio);
    panNode = audioContext.createStereoPanner();
    gainNode = audioContext.createGain();
    
    // Set initial volume
    gainNode.gain.value = 0.35;
    
    // Connect: source → pan → gain → destination
    audioSource.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
};

// Track cursor position and adjust audio panning
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    if (!panNode || !isAudioEnabled) return;
    
    // Calculate normalized position: -1 (left) to 1 (right)
    const x = e.clientX;
    const screenWidth = window.innerWidth;
    const normalizedPosition = (x / screenWidth) * 2 - 1; // Maps 0-width to -1 to 1
    
    // Apply panning with slight easing for smoothness
    panNode.pan.setValueAtTime(normalizedPosition, audioContext.currentTime);
  });
}

// Start or toggle Background Music (Triggered via Logo or Noir mode)
export const playBackgroundMusic = () => {
  initAudio();
  
  // Resume audio context if suspended (browser policy)
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  if (!isAudioEnabled) {
    isAudioEnabled = true;
    notifyAudioState();
    
    if (bgMusicAudio) {
      bgMusicAudio.play().catch(err => {
        console.warn('Audio playback blocked by browser policies:', err);
      });
    }
  } else {
    if (bgMusicAudio && bgMusicAudio.paused) {
      bgMusicAudio.play().catch(() => {});
    }
  }
};

export const stopBackgroundMusic = () => {
  if (bgMusicAudio && !bgMusicAudio.paused) {
    bgMusicAudio.pause();
  }
  isAudioEnabled = false;
  notifyAudioState();
};

export const toggleBackgroundMusic = (forceState) => {
  initAudio();
  
  // Resume audio context if suspended
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  if (forceState === undefined) {
    isAudioEnabled = !isAudioEnabled;
  } else {
    isAudioEnabled = forceState;
  }
  notifyAudioState();

  if (isAudioEnabled) {
    bgMusicAudio?.play().catch(err => console.warn('Audio playback blocked:', err));
  } else {
    bgMusicAudio?.pause();
  }
};

// Deprecated/removed functions (kept as no-ops for backward compatibility if needed)
export const playSwingSound = () => {};
export const playClickSound = () => {};

