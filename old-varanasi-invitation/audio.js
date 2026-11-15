/**
 * SACRED SHEHNAI & TEMPLE BELLS AUDIO SYNTHESIZER
 * Synthesizes authentic Indian classical wedding ragas (Raag Yaman) and sacred brass temple bells
 * using the Web Audio API with zero external dependencies and zero latency.
 */

(function () {
  let audioCtx = null;
  let isPlaying = false;
  let melodyTimer = null;
  let tanpuraNode = null;
  let masterGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Raag Yaman Frequencies (Sa, Re, Ga, Ma-tivra, Pa, Dha, Ni, Sa')
  // Root tonic = C# (approx 277.18 Hz)
  const SA = 277.18;
  const SWARAS = [
    SA * 1,          // Sa
    SA * (9 / 8),    // Re
    SA * (5 / 4),    // Ga
    SA * (45 / 32),  // Tivra Ma
    SA * (3 / 2),    // Pa
    SA * (5 / 3),    // Dha
    SA * (15 / 8),   // Ni
    SA * 2           // Tar Sa
  ];

  // Auspicious Shehnai melodic phrase
  const YAMAN_MELODY = [
    { note: 6, dur: 0.8 },  // Ni
    { note: 1, dur: 0.8 },  // Re
    { note: 2, dur: 1.2 },  // Ga
    { note: 3, dur: 0.8 },  // Ma'
    { note: 4, dur: 1.4 },  // Pa
    { note: 2, dur: 0.6 },  // Ga
    { note: 1, dur: 0.9 },  // Re
    { note: 0, dur: 1.6 },  // Sa
    { note: 4, dur: 0.8 },  // Pa
    { note: 5, dur: 0.8 },  // Dha
    { note: 6, dur: 0.8 },  // Ni
    { note: 7, dur: 1.8 },  // Sa'
    { note: 6, dur: 0.7 },  // Ni
    { note: 5, dur: 0.8 },  // Dha
    { note: 4, dur: 1.4 },  // Pa
    { note: 2, dur: 1.0 },  // Ga
    { note: 1, dur: 1.0 },  // Re
    { note: 0, dur: 2.2 }   // Sa
  ];

  // Shehnai instrument voice synthesis (double-reed vibrato & overtone richness)
  function playShehnaiNote(freq, duration) {
    if (!audioCtx || !isPlaying) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const noteGain = audioCtx.createGain();

    // Shehnai reedy timbre
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

    // Subtle Indian classical meend / vibrato
    const vibrato = audioCtx.createOscillator();
    const vibratoGain = audioCtx.createGain();
    vibrato.frequency.setValueAtTime(5.5, audioCtx.currentTime); // 5.5 Hz vibrato
    vibratoGain.gain.setValueAtTime(freq * 0.015, audioCtx.currentTime);
    vibrato.connect(osc1.frequency);
    vibrato.connect(osc2.frequency);
    vibrato.start();

    // Resonant bandpass filter typical of shehnai bell
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
    filter.Q.setValueAtTime(3.0, audioCtx.currentTime);

    // Envelope
    const now = audioCtx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.3, now + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    vibrato.stop(now + duration + 0.1);
  }

  // Continuous Tanpura Drone (Sa - Pa - Sa')
  function startTanpuraDrone() {
    if (!audioCtx || tanpuraNode) return;
    const droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

    const freqs = [SA * 0.5, SA * 0.75, SA];
    freqs.forEach(f => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, audioCtx.currentTime);

      const fFilter = audioCtx.createBiquadFilter();
      fFilter.type = 'lowpass';
      fFilter.frequency.setValueAtTime(450, audioCtx.currentTime);

      osc.connect(fFilter);
      fFilter.connect(droneGain);
      osc.start();
    });

    droneGain.connect(masterGain);
    tanpuraNode = droneGain;
  }

  function stopTanpuraDrone() {
    if (tanpuraNode) {
      tanpuraNode.disconnect();
      tanpuraNode = null;
    }
  }

  // Melodic cycle loop
  let melodyIndex = 0;
  function scheduleNextNote() {
    if (!isPlaying) return;
    const current = YAMAN_MELODY[melodyIndex];
    playShehnaiNote(SWARAS[current.note], current.dur);

    melodyIndex = (melodyIndex + 1) % YAMAN_MELODY.length;
    melodyTimer = setTimeout(scheduleNextNote, current.dur * 1000 * 0.95);
  }

  // Sacred Brass Temple Bell Chime (Ghanti)
  window.ringTempleBell = function () {
    initAudio();
    if (!audioCtx) return;

    const fundamental = 880; // High resonant brass tone
    const partials = [1, 1.8, 2.7, 4.2];
    const now = audioCtx.currentTime;

    partials.forEach((mult, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * mult, now);

      const amp = 0.25 / (i + 1);
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 2.6);
    });
  };

  // Dedicated MP3 audio player with graceful synthesizer fallback
  const bgAudio = new Audio();
  bgAudio.src = 'assets/song.mp3';
  bgAudio.loop = true;
  bgAudio.preload = 'auto';
  let useAudioFile = true;

  bgAudio.addEventListener('error', () => {
    useAudioFile = false;
  });

  // Toggle Music Controller
  window.toggleWeddingMusic = function () {
    const btn = document.getElementById('music-toggle-btn');
    const icon = btn ? btn.querySelector('.music-icon') : null;
    const text = btn ? btn.querySelector('.btn-text') : null;

    if (!isPlaying) {
      isPlaying = true;
      if (btn) btn.classList.add('active');
      if (icon) icon.textContent = '🎵';
      if (text) text.textContent = 'Music On';

      if (useAudioFile) {
        bgAudio.play().catch(() => {
          // Fallback to synthesizer
          useAudioFile = false;
          initAudio();
          startTanpuraDrone();
          melodyIndex = 0;
          scheduleNextNote();
        });
      } else {
        initAudio();
        startTanpuraDrone();
        melodyIndex = 0;
        scheduleNextNote();
      }
      window.ringTempleBell();
    } else {
      isPlaying = false;
      if (useAudioFile) {
        bgAudio.pause();
      } else {
        clearTimeout(melodyTimer);
        stopTanpuraDrone();
      }
      if (btn) btn.classList.remove('active');
      if (icon) icon.textContent = '🔇';
      if (text) text.textContent = 'Play Music';
    }
  };

  // Connect click triggers for bells & music button
  document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.addEventListener('click', window.toggleWeddingMusic);
    }

    const bells = document.querySelectorAll('.temple-bell');
    bells.forEach(bell => {
      bell.addEventListener('click', () => {
        window.ringTempleBell();
      });
    });
  });
})();
