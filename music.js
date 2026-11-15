/* Shehnai-style instrumental, synthesised live with the Web Audio API.
 * A tanpura-like drone (Sa–Pa) under a reed melody in Raag Bhairavi with meend (glides)
 * and soft dholak pulses. Nothing plays until the guest taps "Open".
 */
const Synth = (() => {
  let ctx, master, reverb, timer, playing = false, muted = false, step = 0, nextTime = 0, droneNodes = [];
  const SA = 293.66; // D4
  const R = { S: 1, r: 16 / 15, g: 6 / 5, m: 4 / 3, P: 3 / 2, d: 8 / 5, n: 9 / 5 };
  const hz = (n, oct = 0) => SA * R[n] * Math.pow(2, oct);
  // phrases: [note, octave, beats]
  const PHRASES = [
    [['S',0,1],['r',0,.5],['g',0,.5],['m',0,1],['P',0,2],['d',0,.5],['P',0,.5],['m',0,1],['g',0,2]],
    [['m',0,.5],['P',0,.5],['d',0,1],['n',0,.5],['S',1,1.5],['n',0,.5],['d',0,.5],['P',0,1],['m',0,1],['g',0,2]],
    [['g',0,.5],['m',0,.5],['P',0,1],['m',0,.5],['g',0,.5],['r',0,1],['S',0,1],['n',-1,.5],['S',0,2.5]],
    [['P',0,1],['d',0,.5],['n',0,.5],['S',1,2],['r',1,.5],['S',1,.5],['n',0,1],['d',0,1],['P',0,2]],
    [['m',0,1],['g',0,.5],['r',0,.5],['g',0,1],['m',0,1],['g',0,.5],['r',0,.5],['S',0,3]]
  ];
  const SEQ = PHRASES.flat().concat([[null, 0, 2]]);
  const BEAT = 0.52;

  function impulse(sec = 3) {
    const len = ctx.sampleRate * sec, buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    return buf;
  }
  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0;
    reverb = ctx.createConvolver(); reverb.buffer = impulse();
    const wet = ctx.createGain(); wet.gain.value = .35;
    master.connect(ctx.destination); reverb.connect(wet).connect(master);
  }
  function out(node, dry = .8) { const g = ctx.createGain(); g.gain.value = dry; node.connect(g).connect(master); node.connect(reverb); }

  function startDrone() {
    [[hz('S', -1), .05], [hz('P', -1), .035], [hz('S', -2), .04]].forEach(([f, v]) => {
      const o = ctx.createOscillator(), fl = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.value = 900; g.gain.value = v;
      lfo.frequency.value = .15 + Math.random() * .2; lg.gain.value = v * .5; lfo.connect(lg).connect(g.gain);
      o.connect(fl).connect(g); out(g, .9); o.start(); lfo.start(); droneNodes.push(o, lfo);
    });
  }
  function reed(freq, t, dur, prev) {
    const o = ctx.createOscillator(), o2 = ctx.createOscillator(), bp = ctx.createBiquadFilter(), lp = ctx.createBiquadFilter(), g = ctx.createGain();
    const vib = ctx.createOscillator(), vg = ctx.createGain();
    o.type = 'sawtooth'; o2.type = 'square';
    const from = prev || freq;
    [o, o2].forEach(x => { x.frequency.setValueAtTime(from, t); x.frequency.setTargetAtTime(freq, t, prev ? .06 : .001); });
    o2.detune.value = 4;
    vib.frequency.value = 5.4; vg.gain.value = freq * .006; vib.connect(vg); vg.connect(o.frequency); vg.connect(o2.frequency);
    bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 1.4; lp.type = 'lowpass'; lp.frequency.value = 3200;
    const o2g = ctx.createGain(); o2g.gain.value = .35;
    o.connect(bp); o2.connect(o2g).connect(bp); bp.connect(lp).connect(g);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .06); g.gain.setValueAtTime(.15, t + dur * .75); g.gain.linearRampToValueAtTime(0, t + dur + .05);
    out(g, .85);
    [o, o2, vib].forEach(x => { x.start(t); x.stop(t + dur + .1); });
  }
  function dholak(t, low) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(low ? 110 : 220, t); o.frequency.exponentialRampToValueAtTime(low ? 55 : 160, t + .18);
    g.gain.setValueAtTime(low ? .22 : .08, t); g.gain.exponentialRampToValueAtTime(.001, t + .25);
    o.connect(g); out(g, 1); o.start(t); o.stop(t + .3);
  }
  let lastF = null, beatCount = 0, beatTime = 0;
  function schedule() {
    while (nextTime < ctx.currentTime + .4) {
      const [n, oct, beats] = SEQ[step % SEQ.length];
      const dur = beats * BEAT;
      if (n) { const fq = hz(n, oct); reed(fq, nextTime, dur, lastF); lastF = fq; } else lastF = null;
      nextTime += dur; step++;
    }
    while (beatTime < ctx.currentTime + .4) { const k = beatCount % 8; if (k === 0 || k === 3 || k === 6) dholak(beatTime, k !== 6); beatTime += BEAT; beatCount++; }
  }
  function play() {
    if (!ctx) { init(); startDrone(); }
    ctx.resume();
    nextTime = beatTime = ctx.currentTime + .15;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(muted ? 0 : .7, ctx.currentTime, .6);
    clearInterval(timer); timer = setInterval(schedule, 120); schedule();
    playing = true;
  }
  function pause() {
    if (!ctx) return;
    clearInterval(timer);
    master.gain.setTargetAtTime(0, ctx.currentTime, .25);
    setTimeout(() => { if (!playing) ctx.suspend(); }, 900);
    playing = false;
  }
  function setMuted(m) { muted = m; if (ctx && playing) master.gain.setTargetAtTime(m ? 0 : .7, ctx.currentTime, .2); }
  return { play, pause, toggle() { playing ? pause() : play(); return playing; }, setMuted, get playing() { return playing; }, get muted() { return muted; } };
})();

/* Background song: put your MP3 at  assets/song.mp3  and it plays (looped) after the
 * guest opens the invitation. If the file is missing or can't play, the shehnai above is used. */
window.Shehnai = (() => {
  const SONG = 'assets/song.mp3?v=skip25s', VOL = 0.8;
  const audio = new Audio();
  audio.src = SONG; audio.loop = true; audio.preload = 'auto'; audio.volume = 0;
  let useFile = true, playing = false, muted = false, fadeT;
  function fade(to, ms = 1200) {
    clearInterval(fadeT); const from = audio.volume, t0 = performance.now();
    fadeT = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / ms); audio.volume = from + (to - from) * k; if (k === 1) { clearInterval(fadeT); if (to === 0 && !playing) audio.pause(); } }, 40);
  }
  function fallback() { if (!useFile) return; useFile = false; if (playing) { Synth.setMuted(muted); Synth.play(); } }
  audio.addEventListener('error', fallback);
  function play() {
    playing = true;
    if (!useFile) { Synth.setMuted(muted); return Synth.play(); }
    audio.muted = muted;
    audio.play().then(() => fade(VOL)).catch(fallback);
  }
  function pause() { playing = false; useFile ? fade(0, 500) : Synth.pause(); }
  function setMuted(m) { muted = m; audio.muted = m; Synth.setMuted(m); }
  return { play, pause, toggle() { playing ? pause() : play(); return playing; }, setMuted, get playing() { return playing; }, get muted() { return muted; } };
})();
