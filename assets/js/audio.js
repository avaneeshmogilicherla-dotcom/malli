/**
 * malli - Multisensory Ambient Soundscape Generator (Web Audio API)
 * Synthesizes a calming, meditative nocturnal lounge soundscape:
 * Warm drone (Key of D / Yaman evening raga), night breeze whisper,
 * and delicate resonant Tibetan singing bowl / temple bell harmonics.
 */

class MalliSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.intervalId = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  start() {
    this.initContext();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Smooth fade in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 3);

    // Warm base drones (D2 = 73.42Hz, A2 = 110Hz, D3 = 146.83Hz, F#3 = 185Hz)
    const freqs = [73.42, 110.0, 146.83, 185.0];
    this.oscillators = [];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for organic acoustic warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc);
    });

    // Night garden breeze (filtered soft noise)
    this.createBreezeNoise();

    // Occasional gentle singing chime (every 8 to 14 seconds)
    this.scheduleChime();
    this.intervalId = setInterval(() => {
      if (this.isPlaying && Math.random() < 0.6) {
        this.playGentleChime();
      }
    }, 9000);

    this.isPlaying = true;
    this.updateUI();
  }

  createBreezeNoise() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.008, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.oscillators.push(whiteNoise);
  }

  playGentleChime() {
    if (!this.ctx || !this.isPlaying) return;
    // Pentatonic frequencies in D major (D5, E5, F#5, A5, B5, D6)
    const chimeFreqs = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66];
    const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.028, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 4.6);
  }

  scheduleChime() {
    setTimeout(() => {
      if (this.isPlaying) this.playGentleChime();
    }, 2000);
  }

  stop() {
    if (!this.ctx) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      this.oscillators = [];
      if (this.intervalId) clearInterval(this.intervalId);
    }, 1300);

    this.isPlaying = false;
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  updateUI() {
    const btn = document.getElementById('soundscape-toggle');
    const label = document.getElementById('soundscape-label');
    const wave = document.getElementById('soundscape-wave');
    if (btn) {
      btn.setAttribute('aria-pressed', this.isPlaying);
      if (this.isPlaying) {
        btn.classList.add('playing');
        if (label) label.textContent = 'Soundscape: On';
      } else {
        btn.classList.remove('playing');
        if (label) label.textContent = 'Soundscape: Off';
      }
    }
  }
}

window.malliAudio = new MalliSoundscape();
