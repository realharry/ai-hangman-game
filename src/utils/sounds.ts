// Simple sound utility using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      // We'll initialize the audio context on first user interaction
      document.addEventListener('click', () => {
        if (!this.audioContext) {
          this.audioContext = new AudioContext();
        }
      }, { once: true });
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playCorrectGuess() {
    // Happy ascending tone
    this.playTone(523.25, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 0.2), 100); // E5
  }

  playWrongGuess() {
    // Sad descending tone
    this.playTone(329.63, 0.3, 'sawtooth'); // E4
  }

  playGameWon() {
    // Victory fanfare
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 0.3), index * 150);
    });
  }

  playGameLost() {
    // Game over sound
    this.playTone(220, 0.5, 'sawtooth'); // A3
  }
}

export const soundManager = new SoundManager();