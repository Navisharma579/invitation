/**
 * ROYAL INDIAN WEDDING APPLICATION SCRIPT
 * Video UI Edition - Handles the Screen 3 Events Carousel, Countdown,
 * RSVP Modal, Customizer Drawer, and Calendar Exports.
 */

// Wedding Configuration (Only Rishi & Manisha)
window.weddingConfig = {
  groomName: 'RISHI',
  brideName: 'MANISHA',
  initials: 'R&M',
  weddingDate: '2026-12-14T19:30:00+05:30',
  displayDate: 'Sunday, 14th December 2026',
  venueName: 'BrijRama Palace & Darbhanga Ghat',
  venueCity: 'Varanasi, Uttar Pradesh',
  hashtag: '#RishiWedsManisha',
  igHandle: '@rishi_manisha_wedding'
};

// Events Carousel Data (Matching Screen 3 of Video with Clean Artworks)
const WEDDING_EVENTS = [
  {
    title: 'MEHANDI',
    subtitle: 'Fragrance of green henna & auspicious joy',
    timing: 'Friday, 12th Dec 2026 • 04:00 PM',
    venue: 'Guleria Kothi & Riverside Verandah, Varanasi',
    image: 'assets/clean_mehendi_card.jpg'
  },
  {
    title: 'HALDI',
    subtitle: 'Golden turmeric blessings & flower shower',
    timing: 'Saturday, 13th Dec 2026 • 10:30 AM',
    venue: 'Assi Ghat Sunlit Terraces, Varanasi',
    image: 'assets/haldi_card.jpg'
  },
  {
    title: 'SANGEET',
    subtitle: 'Royal sitar, live music & gala evening',
    timing: 'Saturday, 13th Dec 2026 • 07:00 PM',
    venue: 'Taj Ganges Grand Ballroom, Varanasi',
    image: 'assets/sangeet_card.jpg'
  },
  {
    title: 'ENGAGEMENT',
    subtitle: 'Ring ceremony & promise of a lifetime',
    timing: 'Sunday, 14th Dec 2026 • 11:00 AM',
    venue: 'BrijRama Palace Pavilion, Varanasi',
    image: 'assets/bride_groom_meet.jpg'
  },
  {
    title: 'SHUBH VIVAH',
    subtitle: 'Sacred seven pheras by holy River Ganga',
    timing: 'Sunday, 14th Dec 2026 • 07:30 PM',
    venue: 'Darbhanga Ghat Heritage Mandap, Varanasi',
    image: 'assets/mandap_aarti.jpg'
  }
];

let currentEventIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Load stored custom config if available
  const saved = localStorage.getItem('wedding_custom_config');
  if (saved) {
    try {
      window.weddingConfig = Object.assign(window.weddingConfig, JSON.parse(saved));
    } catch (e) {
      console.warn(e);
    }
  }

  updateWebsiteContent();
  initCountdown();
  initAtmosphereToggle();
  initEventsCarousel();
  initRSVPModal();
  initCustomizerDrawer();
  initCalendarExport();
});

// Update placeholders across the page
function updateWebsiteContent() {
  const cfg = window.weddingConfig;

  document.querySelectorAll('.js-monogram').forEach(el => el.textContent = cfg.initials);
  document.querySelectorAll('.js-groom-name').forEach(el => el.textContent = cfg.groomName);
  document.querySelectorAll('.js-bride-name').forEach(el => el.textContent = cfg.brideName);
  document.querySelectorAll('.js-couple-names').forEach(el => el.textContent = `${cfg.groomName} & ${cfg.brideName}`);
  document.querySelectorAll('.js-hashtag').forEach(el => el.textContent = cfg.hashtag);
}

// Auspicious Countdown
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  function tick() {
    const target = new Date(window.weddingConfig.weddingDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    daysEl.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    hoursEl.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    minsEl.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    secsEl.textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

// Day vs Aarti Twilight Mode Toggle
function initAtmosphereToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    const isNight = document.body.classList.contains('night-mode');
    const icon = toggleBtn.querySelector('.theme-icon');
    const text = toggleBtn.querySelector('.btn-text');

    if (isNight) {
      if (icon) icon.textContent = '🪔';
      if (text) text.textContent = 'Aarti Twilight';
    } else {
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'Sunlit Ghats';
    }
  });
}

// Events Carousel (Screen 3 of Video)
function initEventsCarousel() {
  const titleEl = document.getElementById('event-card-title');
  const subtitleEl = document.getElementById('event-card-subtitle');
  const timeVenueEl = document.getElementById('event-card-time');
  const imgEl = document.getElementById('event-card-img');
  const dotsContainer = document.getElementById('carousel-dots-wrapper');
  const prevBtn = document.getElementById('event-prev-btn');
  const nextBtn = document.getElementById('event-next-btn');

  if (!titleEl || !dotsContainer) return;

  // Render dots
  dotsContainer.innerHTML = '';
  WEDDING_EVENTS.forEach((ev, idx) => {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => showEvent(idx));
    dotsContainer.appendChild(dot);
  });

  function showEvent(idx) {
    currentEventIndex = (idx + WEDDING_EVENTS.length) % WEDDING_EVENTS.length;
    const ev = WEDDING_EVENTS[currentEventIndex];

    titleEl.textContent = ev.title;
    subtitleEl.textContent = ev.subtitle;
    timeVenueEl.textContent = `${ev.timing} • ${ev.venue}`;
    imgEl.src = ev.image;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentEventIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showEvent(currentEventIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showEvent(currentEventIndex + 1));

  // Initialize first event
  showEvent(0);
}

// RSVP Modal Management
function initRSVPModal() {
  const overlay = document.getElementById('rsvp-modal-overlay');
  const openBtns = document.querySelectorAll('.js-open-rsvp');
  const closeBtn = document.getElementById('rsvp-modal-close');
  const form = document.getElementById('modal-rsvp-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (overlay) overlay.classList.add('open');
    });
  });

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="rsvp_name"]').value.trim();
      overlay.classList.remove('open');
      form.reset();
      showToast(`Dhanyawad, ${name}! Your RSVP has been received with love.`);
    });
  }
}

// Customizer Drawer for User Details
function initCustomizerDrawer() {
  const drawer = document.getElementById('customizer-drawer');
  const openBtn = document.getElementById('open-customizer-btn');
  const closeBtn = document.getElementById('close-customizer-btn');
  const saveBtn = document.getElementById('save-customizer-btn');

  if (!drawer || !openBtn) return;

  openBtn.addEventListener('click', () => {
    const cfg = window.weddingConfig;
    document.getElementById('edit-groom').value = cfg.groomName;
    document.getElementById('edit-bride').value = cfg.brideName;
    document.getElementById('edit-hashtag').value = cfg.hashtag;
    document.getElementById('edit-initials').value = cfg.initials;
    drawer.classList.add('open');
  });

  if (closeBtn) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const cfg = window.weddingConfig;
      cfg.groomName = document.getElementById('edit-groom').value.trim() || 'RISHI';
      cfg.brideName = document.getElementById('edit-bride').value.trim() || 'MANISHA';
      cfg.hashtag = document.getElementById('edit-hashtag').value.trim() || '#RishiWedsManisha';
      cfg.initials = document.getElementById('edit-initials').value.trim() || 'R&M';

      localStorage.setItem('wedding_custom_config', JSON.stringify(cfg));
      updateWebsiteContent();
      drawer.classList.remove('open');
      showToast('Wedding details updated across all screens!');
    });
  }
}

// iCalendar (.ics) download
function initCalendarExport() {
  document.querySelectorAll('.js-add-calendar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cfg = window.weddingConfig;
      const title = `Wedding Celebration of ${cfg.groomName} & ${cfg.brideName}`;
      const desc = `Join us in Varanasi for the auspicious wedding of ${cfg.groomName} and ${cfg.brideName}.`;

      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Royal Varanasi Wedding//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${desc}`,
        'LOCATION:Varanasi, Uttar Pradesh',
        'DTSTART:20261214T140000Z',
        'DTEND:20261214T200000Z',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${cfg.groomName}_${cfg.brideName}_Wedding.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast('Auspicious date saved to your calendar!');
    });
  });
}

// Simple Toast Notification
function showToast(msg) {
  let toast = document.getElementById('wedding-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wedding-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(122, 28, 29, 0.95);
      color: #fff8e1;
      border: 1px solid #d4af37;
      padding: 10px 22px;
      border-radius: 30px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      z-index: 3000;
      transition: transform 0.4s ease;
      pointer-events: none;
      text-align: center;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3500);
}
