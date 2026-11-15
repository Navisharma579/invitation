const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

// 1. tile-jaali-green.svg
const jaaliGreen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56"><defs>
<pattern id="jaali-g" width="56" height="56" patternUnits="userSpaceOnUse">
  <g fill="none" stroke="#D8B26E" stroke-width="1.3" opacity=".4">
    <path d="M28 0 L56 28 L28 56 L0 28 Z"/><circle cx="28" cy="28" r="9"/>
    <path d="M28 19 Q34 28 28 37 Q22 28 28 19 M19 28 Q28 34 37 28 Q28 22 19 28"/>
  </g>
</pattern>
</defs><rect width="56" height="56" fill="#F4F9F6"/><rect width="56" height="56" fill="url(#jaali-g)"/></svg>`;
fs.writeFileSync(path.join(ASSETS, 'tile-jaali-green.svg'), jaaliGreen);

// 2. tile-floral-green.svg (Emerald velvet with gold embroidery)
const floralGreen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="90" height="90"><defs>
<pattern id="floral-g" width="90" height="90" patternUnits="userSpaceOnUse">
  <rect width="90" height="90" fill="#0E3829"/>
  <g fill="none" stroke="#D8B26E" stroke-width="1.4" opacity=".85">
    <path d="M0 45 C20 25 25 65 45 45 C65 25 70 65 90 45"/>
    <path d="M45 0 C25 20 65 25 45 45 C25 65 65 70 45 90"/>
  </g>
  <g transform="translate(45 45)">
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(0)"/>
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(60)"/>
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(120)"/>
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(180)"/>
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(240)"/>
    <ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="#D8B26E" transform="rotate(300)"/>
    <circle r="3.2" fill="#1C664A"/>
  </g>
  <circle cx="22" cy="68" r="1.6" fill="#E8D5A7"/><circle cx="68" cy="22" r="1.6" fill="#E8D5A7"/>
</pattern>
</defs><rect width="90" height="90" fill="url(#floral-g)"/></svg>`;
fs.writeFileSync(path.join(ASSETS, 'tile-floral-green.svg'), floralGreen);

// 3. peacock-feather-green.svg (Lush emerald peacock feather)
const peacockGreen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 380" width="160" height="380">
  <defs>
    <radialGradient id="eye" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#0F2B1D"/>
      <stop offset="35%" stop-color="#1B6F78"/>
      <stop offset="65%" stop-color="#2D8A4E"/>
      <stop offset="85%" stop-color="#D8B26E"/>
      <stop offset="100%" stop-color="#0E3829"/>
    </radialGradient>
    <linearGradient id="stem" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D8B26E"/>
      <stop offset="100%" stop-color="#164A35"/>
    </linearGradient>
  </defs>
  <path d="M80 370 Q75 220 80 80" stroke="url(#stem)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="80" cy="80" rx="36" ry="48" fill="url(#eye)" stroke="#D8B26E" stroke-width="2"/>
  <ellipse cx="80" cy="74" rx="20" ry="26" fill="#0A2418"/>
  <ellipse cx="80" cy="70" rx="11" ry="14" fill="#20A272"/>
  <circle cx="80" cy="68" r="6" fill="#1B4F8A"/>
</svg>`;
fs.writeFileSync(path.join(ASSETS, 'peacock-feather-green.svg'), peacockGreen);

console.log('Green theme vector assets generated successfully!');
