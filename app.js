/* ============ Royal Rajasthani Wedding · interactions ============ */
(() => {
  const $ = s => document.querySelector(s);
  const WEDDING = new Date('2026-12-14T00:00:00+05:30');
  const WA_FAMILY = '919460385222';

  /* ---------- Event schedule (Warm Royal Rajasthani Palette) ---------- */
  const I = {
    kalash: '<svg viewBox="0 0 32 32"><path d="M16 3q-3 4 0 7q3-3 0-7M11 5q-1 4 4 5M21 5q1 4-4 5" fill="#A37748"/><rect x="11" y="10" width="10" height="3" rx="1" fill="#B18A45"/><ellipse cx="16" cy="21" rx="9" ry="8" fill="#C5A15D" stroke="#3C2A21"/><path d="M8 20h16" stroke="#3C2A21"/><circle cx="16" cy="22" r="1.8" fill="#8E2838"/></svg>',
    coconut: '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="25" rx="13" ry="4" fill="#C5A15D" stroke="#3C2A21"/><ellipse cx="16" cy="16" rx="7" ry="8" fill="#8B5A2B" stroke="#4E2E14"/><path d="M16 8q-4-4-8-3M16 8q4-4 8-3" stroke="#A37748" stroke-width="2" fill="none"/><path d="M13 16h6M16 13v6" stroke="#E9891F" stroke-width="1.6"/></svg>',
    scroll: '<svg viewBox="0 0 32 32"><rect x="7" y="6" width="18" height="20" rx="2" fill="#FAF4EB" stroke="#3C2A21"/><rect x="5" y="4" width="22" height="4" rx="2" fill="#C5A15D"/><rect x="5" y="24" width="22" height="4" rx="2" fill="#C5A15D"/><path d="M11 13h10M11 17h10M11 21h6" stroke="#8E2838"/></svg>',
    haldi: '<svg viewBox="0 0 32 32"><path d="M4 16h24q-2 10-12 10T4 16z" fill="#B18A45" stroke="#3C2A21"/><ellipse cx="16" cy="16" rx="12" ry="3" fill="#F5B43A" stroke="#3C2A21"/><circle cx="22" cy="8" r="3" fill="#E9891F"/><circle cx="10" cy="9" r="2.4" fill="#F5B43A"/></svg>',
    thali: '<svg viewBox="0 0 32 32"><circle cx="16" cy="17" r="12" fill="#C5A15D" stroke="#3C2A21"/><circle cx="16" cy="17" r="9" fill="#FAF4EB"/><circle cx="12" cy="14" r="2.6" fill="#E9891F"/><circle cx="20" cy="14" r="2.6" fill="#8E2838"/><circle cx="16" cy="21" r="2.6" fill="#A37748"/><path d="M14 3q2 3 0 5M18 3q2 3 0 5" stroke="#B18A45" fill="none"/></svg>',
    thread: '<svg viewBox="0 0 32 32"><path d="M8 4q20 10 4 24M24 4Q4 14 20 28" fill="none" stroke="#E9891F" stroke-width="2"/><path d="M8 4q20 10 4 24" fill="none" stroke="#FAF4EB" stroke-width=".8"/><circle cx="16" cy="16" r="3" fill="#8E2838" stroke="#C5A15D"/></svg>',
    pot: '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="27" rx="13" ry="3" fill="#B18A45" stroke="#3C2A21"/><path d="M11 8h10l-1 3q6 3 6 9t-10 6t-10-6t6-9z" fill="#B5592E" stroke="#6E2E16"/><path d="M8 18q8 4 16 0" stroke="#F5B43A" fill="none"/><path d="M12 13q4 2 8 0" stroke="#FAF4EB" fill="none"/></svg>',
    dhol: '<svg viewBox="0 0 32 32"><ellipse cx="7" cy="16" rx="3" ry="9" fill="#C5A15D" stroke="#3C2A21"/><path d="M7 7h18v18H7" fill="#8E2838" stroke="#3C2A21"/><ellipse cx="25" cy="16" rx="3" ry="9" fill="#E8D5A7" stroke="#3C2A21"/><path d="M8 8l16 16M24 8L8 24" stroke="#E8D5A7"/></svg>',
    agni: '<svg viewBox="0 0 32 32"><path d="M6 28l3-7h14l3 7z" fill="#B5592E" stroke="#6E2E16"/><path d="M16 4q6 7 4 12q2-1 2-4q3 5 0 9H10q-3-4 0-9q0 3 2 4q-2-6 4-12z" fill="#F5A623"/><path d="M16 11q3 4 2 8h-4q-1-4 2-8z" fill="#FFF0B8"/></svg>'
  };

  /* Exactly as printed on the card — Hindi + English, nothing added */
  const EVENTS = [
    {
      hi: 'रविवार, 6 दिसम्बर, 2026', date: 'Sunday, 6 December 2026',
      highlight: false,
      items: [
        ['गणेश निमंत्रण', 'Ganesh Nimantran', 'प्रातः 6:00 बजे', '6:00 AM', 'kalash']
      ]
    },
    {
      hi: 'गुरुवार, 10 दिसम्बर, 2026', date: 'Thursday, 10 December 2026',
      highlight: false,
      items: [
        ['गोद', 'Godh', 'प्रातः 11:00 बजे', '11:00 AM', 'coconut'],
        ['लग्न-टीका', 'Lagan-Tika', 'दोपहर 12:15 बजे', '12:15 PM', 'scroll'],
        ['प्रीतिभोज', 'Preetibhoj', 'सायं 7:00 बजे से', '7:00 PM onwards', 'thali',
          'प्रीतिभोज स्थल : "ॐ राधिका मैरिज गार्डन"<br>मार्बल मण्डी चौराहा, कालवाड़ रोड, जयपुर',
          'Preetibhoj Venue: "Om Radhika Marriage Garden"<br>Marble Mandi Chauraha, Kalwar Road, Jaipur']
      ]
    },
    {
      hi: 'शनिवार, 12 दिसम्बर, 2026', date: 'Saturday, 12 December 2026',
      highlight: false,
      items: [
        ['बान सांकड़ी', 'Baan Sankadi', 'दोपहर 12:15 बजे', '12:15 PM', 'haldi']
      ]
    },
    {
      hi: 'रविवार, 13 दिसम्बर, 2026', date: 'Sunday, 13 December 2026',
      highlight: false,
      items: [
        ['जनेऊ संस्कार', 'Janeu Sanskar', 'प्रातः 8:00 बजे', '8:00 AM', 'thread'],
        ['चाक', 'Chaak', 'दोपहर 2:00 बजे', '2:00 PM', 'pot']
      ]
    },
    {
      hi: 'सोमवार, 14 दिसम्बर, 2026', date: 'Monday, 14 December 2026',
      highlight: true,
      items: [
        ['बारात निकासी (निवास स्थान से)', 'Baraat Nikasi (from residence)', 'सायं 3:15 बजे', '3:15 PM', 'dhol'],
        ['पाणिग्रहण संस्कार', 'Panigrahan Sanskar', 'शुभलग्नानुसार', 'As per auspicious muhurat', 'agni']
      ]
    }
  ];

  const timelineEl = $('#timeline');
  if (timelineEl) {
    timelineEl.innerHTML = EVENTS.map(d => `
      <article class="royal-event-card ${d.highlight ? 'royal-event-card--highlight' : ''} reveal">
        <div class="rec-arch-top">
          <span class="rec-ornament">❖</span>
          <h3 class="rec-date-hi deva">${d.hi}</h3>
          <p class="rec-date-en">${d.date}</p>
        </div>
        <div class="rec-body">
          ${d.items.map(([hi, en, t, tEn, ic, desc, descEn]) => `
            <div class="rec-item">
              <div class="rec-ico" aria-hidden="true">${I[ic] || ''}</div>
              <div class="rec-details">
                <div class="rec-head-row">
                  <span class="rec-hi tiro">${hi}</span>
                  <span class="rec-time deva">${t}</span>
                </div>
                <div class="rec-en">${en} · ${tEn}</div>
                ${desc ? `<p class="rec-desc deva">${desc}</p>` : ''}
                ${descEn ? `<p class="rec-desc">${descEn}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  /* ---------- Family & relatives ---------- */
  const FAMILY = [
    { title: 'उत्तराकांक्षी', en: 'Uttarakankshi', names: ['पं. बाबूलाल मिश्र', 'पं. मनोहर लाल मिश्र'] },
    { title: 'बुआ-फूफा पक्ष', en: 'Bua-Fufa Paksh', names: ['कमला देवी-स्व. नवलकिशोर जी', 'मनभरी देवी-स्व. रामकिशोर जी', 'पतासी देवी-रामचन्द्र जी', 'शारदा देवी-सुरेन्द्र जी', 'सन्तोष देवी-रणजीत जी', 'रेखा देवी-राधेश्याम जी', 'विजय देवी-रघुनन्दन जी', 'निशा देवी-दीपक जी'] },
    { title: 'दर्शनाभिलाषी', en: 'Darshanabhilashi', names: ['कजोड़मल, हनुमानसहाय', 'योगेश, मुकेश, हेमन्त', 'मामराज, विनोद, नरेश', 'मनीष, अनिल, विजेन्द्र', 'दीपक, गजानन्द, राहुल', 'मोहित, आशीष, पंकज', 'हिमांशु, ध्रुव, निखिल', 'एवं समस्त बिंवाल परिवार'] },
    { title: 'ननिहाल पक्ष', en: 'Nanihal Paksh', names: ['स्व. गिर्राज प्रसाद जी-सरूपी देवी', 'गिरधारी जी-संतोष देवी', 'बनवारी जी-सरिता', 'स्व. मनसुख जी-हेमलता', 'जितेन्द्र-गरिमा', 'रवि-प्रियंका, गौरव-मोनिका', 'नीरज, विशाल, माधव'] },
    { title: 'जंवाई पक्ष', en: 'Jawai Paksh', names: ['मनीषा-संजय जी', 'नेहा-नितिन जी', 'भावना-अंकित जी', 'गुंजन-अनुभव जी', 'पूजा, शालू'] },
    { title: 'बाल मनुहार', en: 'Baal Manuhar', names: ['रूद्राक्ष, शान्तनु, मुकुन्द, ईशान्त, युवराज, काव्यांश, राम, पिहू'] }
  ];
  const familyGrid = $('#familyGrid');
  if (familyGrid) {
    familyGrid.innerHTML = FAMILY.map(c => `
      <article class="fam reveal"><h3>${c.title}</h3><p class="fam-en">${c.en}</p>
        ${c.names.length ? `<ul>${c.names.map(n => `<li>${n}</li>`).join('')}</ul>` : '<p class="pending">नाम शीघ्र जोड़े जाएँगे · Names to be added from the printed card</p>'}
      </article>`).join('');
  }

  /* Petals and sparrows animation removed completely per user request */

  /* ---------- Envelope intro ---------- */
  const intro = $('#intro'), music = $('#music');
  let opened = false;
  function openInvite() {
    if (opened) return; opened = true;
    intro.classList.add('is-opening');
    try { Shehnai.play(); setMusicUI(); } catch (e) { /* audio fallback */ }
    if (music) music.hidden = false;
    setTimeout(() => { intro.classList.add('is-gone'); document.body.classList.remove('is-locked'); document.body.classList.add('hero-in'); }, 2300);
    setTimeout(() => intro.remove(), 3500);
    setTimeout(() => { const hbg = $('#heroBg'); if (hbg) hbg.style.transition = 'transform .15s linear'; }, 5000);
    setTimeout(() => AutoScroll.start(), 2500);
  }

  /* ---------- Page-wise auto scroll: shows one page, glides to the next ----------
   * Pauses when the guest touches/scrolls, resumes after a few idle seconds. */
  const AutoScroll = (() => {
    const DWELL = 4000;        // how long each page stays on screen (ms)
    const GLIDE = 1100;        // how long the glide to the next page takes (ms)
    const IDLE_RESUME = 4000;  // resume this long after the guest stops interacting
    const btn = $('#autoBtn');
    let enabled = true, waitT = 0, idleT = 0, raf = 0, gliding = false;
    const maxY = () => document.documentElement.scrollHeight - innerHeight;
    const ui = () => {
      if (!btn) return;
      btn.textContent = enabled ? '⏬' : '⏸';
      btn.classList.toggle('is-off', !enabled);
      btn.setAttribute('aria-pressed', String(enabled));
      btn.setAttribute('aria-label', enabled ? 'Pause auto scroll' : 'Start auto scroll');
    };
    // Page stops: the top of every section, plus extra screen-sized steps inside tall sections
    function stops() {
      const out = [];
      document.querySelectorAll('main > section, main > footer').forEach(s => {
        const top = s.getBoundingClientRect().top + scrollY, h = s.offsetHeight;
        out.push(top);
        for (let y = top + innerHeight * 0.85; y < top + h - innerHeight * 0.6; y += innerHeight * 0.85) out.push(y);
      });
      return out.map(y => Math.min(Math.round(y), maxY())).sort((a, b) => a - b);
    }
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function glideTo(target) {
      const from = scrollY, dist = target - from, t0 = performance.now();
      gliding = true;
      const step = now => {
        if (!gliding) return;
        const p = Math.min(1, (now - t0) / GLIDE);
        window.scrollTo({ top: from + dist * ease(p), behavior: 'instant' });
        if (p < 1) raf = requestAnimationFrame(step);
        else { gliding = false; schedule(); }
      };
      raf = requestAnimationFrame(step);
    }
    function next() {
      if (!enabled || document.body.classList.contains('is-locked')) return;
      const target = stops().find(y => y > scrollY + 20);
      if (target == null) return;           // reached the end
      glideTo(target);
    }
    function schedule(delay = DWELL) { clearTimeout(waitT); if (enabled) waitT = setTimeout(next, delay); }
    function stop() { clearTimeout(waitT); gliding = false; cancelAnimationFrame(raf); }
    function interrupt() {
      stop(); clearTimeout(idleT);
      if (enabled) idleT = setTimeout(() => schedule(0), IDLE_RESUME);
    }
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(ev =>
      addEventListener(ev, e => { if (btn && e.target instanceof Node && btn.contains(e.target)) return; interrupt(); }, { passive: true }));
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (enabled) interrupt(); });
    if (btn) btn.addEventListener('click', () => {
      enabled = !enabled; ui(); clearTimeout(idleT);
      enabled ? schedule(600) : stop();
    });
    ui();
    return { start: () => schedule() };
  })();
  const openBtn = $('#openBtn'), sealBtn = $('#seal'), envBox = $('#envelope');
  if (openBtn) openBtn.addEventListener('click', openInvite);
  if (sealBtn) sealBtn.addEventListener('click', (e) => { e.stopPropagation(); openInvite(); });
  if (envBox) {
    envBox.addEventListener('click', openInvite);
    envBox.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvite(); } });
  }

  /* ---------- Music UI ---------- */
  function setMusicUI() {
    if (!music) return;
    music.classList.toggle('is-playing', Shehnai.playing);
    const pIcon = $('#playIcon'), pBtn = $('#playBtn'), mBtn = $('#muteBtn');
    if (pIcon) pIcon.textContent = Shehnai.playing ? '❚❚' : '▶';
    if (pBtn) pBtn.setAttribute('aria-label', Shehnai.playing ? 'Pause music' : 'Play music');
    if (mBtn) {
      mBtn.textContent = Shehnai.muted ? '🔇' : '🔊';
      mBtn.setAttribute('aria-label', Shehnai.muted ? 'Unmute' : 'Mute');
    }
  }
  const playBtn = $('#playBtn'), muteBtn = $('#muteBtn');
  if (playBtn) playBtn.addEventListener('click', () => { Shehnai.toggle(); setMusicUI(); });
  if (muteBtn) muteBtn.addEventListener('click', () => { Shehnai.setMuted(!Shehnai.muted); setMusicUI(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && Shehnai.playing) { Shehnai.pause(); setMusicUI(); } });

  /* ---------- Image fallbacks ---------- */
  document.querySelectorAll('.screen-bg img, .person-frame img, img.ganesha').forEach(img => {
    img.addEventListener('error', function() {
      const pic = this.closest('picture');
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      let src = this.getAttribute('src') || '';
      if (!src) return;
      let base = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      let fallback = (isPortrait && base.indexOf('-landscape') !== -1)
        ? base.replace('-landscape', '-portrait') + '.svg'
        : base + '.svg';
      if (pic) {
        pic.querySelectorAll('source').forEach(s => s.remove());
      }
      this.onerror = null;
      this.src = fallback;
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Hero: zoom through the jharokha as you scroll ---------- */
  const heroBg = $('#heroBg'), heroContent = document.querySelector('.hero-content');
  const lightMode = matchMedia('(max-width: 860px), (hover: none)').matches; // phones: skip the zoom
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking || scrollY > innerHeight * 1.2) return; // hero off screen: nothing to update
    ticking = true;
    requestAnimationFrame(() => {
      const p = Math.min(1, scrollY / innerHeight);
      if (document.body.classList.contains('hero-in') && heroBg && heroContent) {
        if (!lightMode) heroBg.style.transform = `scale(${1 + p * .35})`;
        heroContent.style.transform = `translateY(${p * -60}px)`;
        heroContent.style.opacity = 1 - p * 1.2;
      }
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Countdown ---------- */
  const els = { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') };
  function setNum(el, v) {
    if (!el) return;
    const t = String(v).padStart(2, '0');
    if (el.textContent !== t) {
      el.textContent = t;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }
  }
  function tick() {
    let diff = WEDDING - Date.now();
    if (diff <= 0) {
      const cdEl = $('#cd'), cdDone = $('#cdDone');
      if (cdEl) cdEl.hidden = true;
      if (cdDone) cdDone.hidden = false;
      return;
    }
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); const s = Math.floor((diff - m * 6e4) / 1e3);
    setNum(els.d, d); setNum(els.h, h); setNum(els.m, m); setNum(els.s, s);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- RSVP via WhatsApp ---------- */
  const form = $('#rsvpForm'), err = $('#formErr'), overlay = $('#overlay');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').trim(), phone = (fd.get('phone') || '').replace(/[^\d+]/g, ''), guests = +fd.get('guests');
      form.querySelectorAll('.bad').forEach(x => x.classList.remove('bad'));
      const bad = [];
      if (name.length < 2) bad.push(['name', 'कृपया अपना नाम लिखें · Please enter your name.']);
      if (!/^\+?\d{10,13}$/.test(phone)) bad.push(['phone', 'कृपया सही मोबाइल नंबर लिखें · Please enter a valid mobile number.']);
      if (!(guests >= 1 && guests <= 20)) bad.push(['guests', 'अतिथि संख्या 1 से 20 के बीच हो · Guests must be between 1 and 20.']);
      if (bad.length) { bad.forEach(([n]) => form.elements[n].classList.add('bad')); if (err) err.textContent = bad[0][1]; form.elements[bad[0][0]].focus(); return; }
      if (err) err.textContent = '';
      const yes = fd.get('attend') === 'yes';
      const msg = [
        '🙏 *RSVP · Rishi & Manisha · 14 Dec 2026*',
        `नाम / Name: ${name}`, `मोबाइल / Mobile: ${phone}`, `अतिथि / Guests: ${guests}`,
        `उपस्थिति / Attending: ${yes ? 'हाँ, अवश्य पधारेंगे ✅' : 'क्षमा करें, नहीं आ पाएँगे'}`,
        (fd.get('message') || '').trim() ? `संदेश / Message: ${fd.get('message').trim()}` : ''
      ].filter(Boolean).join('\n');
      const url = `https://wa.me/${WA_FAMILY}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
      const ovWa = $('#ovWa'), ovTitle = $('#ovTitle'), ovText = $('#ovText');
      if (ovWa) ovWa.href = url;
      if (ovTitle) ovTitle.textContent = yes ? 'धन्यवाद!' : 'आपका संदेश';
      if (ovText) ovText.innerHTML = 'WhatsApp has opened with your RSVP. Please press <b>Send</b> there so the family receives it. If it did not open, use the button below.';
      if (overlay) { overlay.hidden = false; const ovClose = $('#ovClose'); if (ovClose) ovClose.focus(); }
    });
  }

  /* ---------- Theme Toggle (Gold / Ruby) ---------- */
  const html = document.documentElement;
  const themeToggle = $('#themeToggle'), themeText = $('#themeText');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isGold = html.getAttribute('data-theme') === 'gold';
      const nextTheme = isGold ? 'ruby' : 'gold';
      html.setAttribute('data-theme', nextTheme);
      if (themeText) themeText.textContent = isGold ? '🌹 शाही माणक' : '✨ शाही स्वर्ण';
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.content = isGold ? '#741F2B' : '#FAF4EB';
    });
  }

  /* ---------- Sacred Diya Interactive Lighting ---------- */
  document.querySelectorAll('.interactive-diya').forEach(d => {
    d.addEventListener('click', () => {
      d.classList.toggle('is-lit');
    });
  });

  const ovClose = $('#ovClose');
  if (ovClose && overlay) ovClose.addEventListener('click', () => { overlay.hidden = true; });
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) overlay.hidden = true; });
  addEventListener('keydown', e => { if (e.key === 'Escape' && overlay) overlay.hidden = true; });
})();
