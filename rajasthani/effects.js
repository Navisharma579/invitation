/* ============ Royal animation layer: text reveals, card entrances, shine & tilt ============
 * Uses only transform/opacity animations so it stays smooth on phones.
 * Nothing here runs when the visitor has "reduce motion" turned on.
 */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('fx');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDeva = s => /[ऀ-ॿ]/.test(s);

  /* ---------- 1. Split headings into letters (English) or words (Hindi) ---------- */
  function split(el, step) {
    if (!el || el.dataset.fxSplit) return;
    el.dataset.fxSplit = '1';
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    let i = 0;
    const span = (cls, txt) => { const s = document.createElement('span'); s.className = cls; s.setAttribute('aria-hidden', 'true'); if (txt != null) s.textContent = txt; return s; };
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(word => {
            if (!word) return;
            if (/^\s+$/.test(word)) { frag.appendChild(document.createTextNode(' ')); return; }
            if (isDeva(word)) { // never split Devanagari letters: it breaks matras/conjuncts
              const s = span('sp', word); s.style.setProperty('--d', (i++ * step * 2.4).toFixed(3) + 's'); frag.appendChild(s);
            } else {
              const w = span('w');
              [...word].forEach(ch => { const s = span('sp', ch); s.style.setProperty('--d', (i++ * step).toFixed(3) + 's'); w.appendChild(s); });
              frag.appendChild(w);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  }
  // Only split text that will later receive a trigger class (.is-in from a reveal, or the hero)
  const canTrigger = el => el.closest('.reveal') || el.closest('.hero');
  document.querySelectorAll('.sec-head h2, .hero-names, .ganesh-title, .c-name, .person h3, .venue-name, .c-band, .foot-names')
    .forEach(el => { if (canTrigger(el) || el.closest('.footer')) split(el, el.classList.contains('hero-names') ? 0.045 : 0.032); });
  document.querySelectorAll('.shloka').forEach(el => canTrigger(el) && split(el, 0.035));

  /* ---------- 2. Invitation card: lines appear one after another ---------- */
  document.querySelectorAll('.card-inner > *').forEach((el, i) => el.style.setProperty('--i', i));

  /* ---------- 3. Cards: staggered 3D entrance, shine sweep, tilt ---------- */
  const groups = ['#timeline', '#familyGrid', '.contact-grid', '.couple-grid', '.venue-wrap', '.cd-grid'];
  const CARD = '.royal-event-card, .fam, .gcard, .person, .venue-card, .cd-tile, .card, .couple-mono';
  groups.forEach(sel => document.querySelectorAll(sel).forEach(g => {
    [...g.querySelectorAll(CARD)].forEach((c, i) => c.style.setProperty('--delay', (i * 0.13).toFixed(2) + 's'));
  }));
  const cards = [...document.querySelectorAll(CARD)];
  cards.forEach(c => {
    c.classList.add('fx-card');
    if (!c.matches('.couple-mono')) { const s = document.createElement('span'); s.className = 'fx-shine'; s.setAttribute('aria-hidden', 'true'); c.appendChild(s); }
    c.querySelectorAll('.rec-item').forEach((it, j) => it.style.setProperty('--j', j));
  });
  document.querySelectorAll('.footer').forEach(f => f.classList.add('reveal'));

  // Mark a card "settled" after its entrance so hover/tilt react instantly (no entrance delay)
  const settle = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const c = e.target, d = parseFloat(getComputedStyle(c).getPropertyValue('--delay')) || 0;
    setTimeout(() => c.classList.add('fx-settled'), (d + 1.6) * 1000);
    settle.unobserve(c);
  }), { threshold: 0.15 });
  cards.forEach(c => settle.observe(c));

  // Footer and other late-added reveal targets need the reveal observer too
  const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); rev.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll('.reveal:not(.is-in)').forEach(el => rev.observe(el));

  // Desktop only: gentle 3D tilt that follows the mouse, with a soft glare
  if (finePointer) {
    cards.filter(c => !c.matches('.card, .venue-card, .couple-mono')).forEach(c => {
      let raf = 0;
      c.addEventListener('pointermove', e => {
        if (!c.classList.contains('fx-settled')) return;
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          c.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); c.style.setProperty('--my', (y * 100).toFixed(1) + '%');
          c.style.transform = `perspective(900px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 9).toFixed(2)}deg) translateY(-6px)`;
        });
      });
      c.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); c.style.transform = ''; });
    });
  }

  /* ---------- 4. Gold scroll-progress thread at the top ---------- */
  const bar = document.createElement('div'); bar.className = 'fx-progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  const upd = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; ticking = false; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
})();
