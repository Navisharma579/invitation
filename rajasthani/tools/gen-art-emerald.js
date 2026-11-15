/**
 * Generates the original illustrated artwork for the Rajasthani wedding site.
 * Run:  node rajasthani/tools/gen-art.js   → writes SVG images into rajasthani/assets/
 * Every scene is produced in landscape (1920x1080) and portrait (1080x1920) so it
 * can fill the screen on desktop and on phones.
 */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'assets');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ivory: '#F4F9F6', gold: '#B18A45', agold: '#C5A15D', maroon: '#0E3829', red: '#164E39',
  brown: '#282018', champ: '#E8D5A7', cream: '#F5EBD5',
  pink: '#E29C7E', pinkD: '#A9533F', pinkL: '#F6DCC0', win: '#09251B',
  sand: '#EBD3A2', sandD: '#C9A86A', green: '#56632F', greenD: '#3A4520',
  mari: '#E9891F', mari2: '#F5B43A', teal: '#1F6F78', blue: '#1B4F8A', navy: '#1E2A4A',
  skin: '#D59A70', skinD: '#8A5A3A'
};
const f = n => Math.round(n * 10) / 10;
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const save = (name, s) => { fs.writeFileSync(path.join(OUT, name), s); console.log('wrote', name, (s.length / 1024).toFixed(0) + 'KB'); };
const doc = (W, H, body, extraDefs = '', par = 'xMidYMid slice') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="${par}"><defs>${DEFS}${extraDefs}</defs>${body}</svg>`;

/* ---------- shared defs: patterns & gradients ---------- */
const DEFS = `
<pattern id="carve" width="64" height="64" patternUnits="userSpaceOnUse">
  <rect width="64" height="64" fill="#E7CD9C"/>
  <g fill="none" stroke="#C49F62" stroke-width="1.3">
    <circle cx="32" cy="32" r="5"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse cx="32" cy="21" rx="3.6" ry="7" transform="rotate(${a} 32 32)"/>`).join('')}
    <path d="M0 0 Q8 8 0 16 M64 0 Q56 8 64 16 M0 64 Q8 56 0 48 M64 64 Q56 56 64 48"/>
  </g>
  <circle cx="32" cy="32" r="2" fill="#B88E4E"/>
</pattern>
<pattern id="floral" width="90" height="90" patternUnits="userSpaceOnUse">
  <rect width="90" height="90" fill="${C.maroon}"/>
  <g fill="none" stroke="${C.agold}" stroke-width="1.4" opacity=".75">
    <path d="M0 45 C20 25 25 65 45 45 C65 25 70 65 90 45"/>
    <path d="M45 0 C25 20 65 25 45 45 C25 65 65 70 45 90"/>
  </g>
  <g transform="translate(45 45)">${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-7" rx="3.4" ry="6.5" fill="${C.agold}" transform="rotate(${a})"/>`).join('')}<circle r="3.2" fill="${C.red}"/></g>
  <g transform="translate(0 0)">${[0, 90, 180, 270].map(a => `<ellipse cx="0" cy="-5" rx="2.4" ry="4.5" fill="#E8D5A7" transform="rotate(${a})"/>`).join('')}</g>
  <g transform="translate(90 0)">${[0, 90, 180, 270].map(a => `<ellipse cx="0" cy="-5" rx="2.4" ry="4.5" fill="#E8D5A7" transform="rotate(${a})"/>`).join('')}</g>
  <g transform="translate(0 90)">${[0, 90, 180, 270].map(a => `<ellipse cx="0" cy="-5" rx="2.4" ry="4.5" fill="#E8D5A7" transform="rotate(${a})"/>`).join('')}</g>
  <g transform="translate(90 90)">${[0, 90, 180, 270].map(a => `<ellipse cx="0" cy="-5" rx="2.4" ry="4.5" fill="#E8D5A7" transform="rotate(${a})"/>`).join('')}</g>
  <circle cx="22" cy="68" r="1.6" fill="#E8D5A7"/><circle cx="68" cy="22" r="1.6" fill="#E8D5A7"/>
</pattern>
<pattern id="jaali" width="56" height="56" patternUnits="userSpaceOnUse">
  <g fill="none" stroke="${C.agold}" stroke-width="1.2" opacity=".35">
    <path d="M28 0 L56 28 L28 56 L0 28 Z"/><circle cx="28" cy="28" r="9"/>
    <path d="M28 19 Q34 28 28 37 Q22 28 28 19 M19 28 Q28 34 37 28 Q28 22 19 28"/>
  </g>
</pattern>
<pattern id="leheriya" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
  <rect width="14" height="14" fill="${C.red}"/><rect width="14" height="4" fill="${C.mari2}"/><rect y="7" width="14" height="2" fill="${C.mari}"/>
</pattern>
<radialGradient id="glow"><stop offset="0" stop-color="#FFE6A8" stop-opacity=".95"/><stop offset=".45" stop-color="#FFD48A" stop-opacity=".35"/><stop offset="1" stop-color="#FFD48A" stop-opacity="0"/></radialGradient>
<radialGradient id="fireglow"><stop offset="0" stop-color="#FFD27A" stop-opacity=".9"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
<radialGradient id="vignette" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a0a08" stop-opacity=".55"/></radialGradient>
<linearGradient id="goldbar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#E3C27E"/><stop offset=".5" stop-color="${C.gold}"/><stop offset="1" stop-color="#8C6A30"/></linearGradient>
`;

/* ---------- primitives ---------- */
function archPath(x, y, w, h, lobes = 6) {
  const spring = Math.min(h * 0.5, w * 0.72);
  const ys = y + spring, cx = x + w / 2;
  const P = [[x, ys], [x, y + spring * 0.28], [cx - w * 0.15, y + spring * 0.07], [cx, y]];
  const bez = t => { const u = 1 - t; return [0, 1].map(i => u * u * u * P[0][i] + 3 * u * u * t * P[1][i] + 3 * u * t * t * P[2][i] + t * t * t * P[3][i]); };
  const L = []; for (let i = 0; i <= lobes; i++) L.push(bez(i / lobes));
  const R = L.map(([px, py]) => [2 * cx - px, py]).reverse();
  const arc = (a, b) => { const r = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.56; return ` A${f(r)},${f(r)} 0 0 1 ${f(b[0])},${f(b[1])}`; };
  let d = `M${f(x)},${f(y + h)} L${f(x)},${f(ys)}`;
  for (let i = 0; i < lobes; i++) d += arc(L[i], L[i + 1]);
  for (let i = 0; i < lobes; i++) d += arc(R[i], R[i + 1]);
  return d + ` L${f(x + w)},${f(y + h)} Z`;
}

function dome(cx, y, r, fill, stroke, sw) {
  return `<path d="M${f(cx - r)},${f(y)} C${f(cx - r)},${f(y - r * 1.1)} ${f(cx - r * .2)},${f(y - r * 1.25)} ${f(cx)},${f(y - r * 1.6)} C${f(cx + r * .2)},${f(y - r * 1.25)} ${f(cx + r)},${f(y - r * 1.1)} ${f(cx + r)},${f(y)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>
  <line x1="${f(cx)}" y1="${f(y - r * 1.6)}" x2="${f(cx)}" y2="${f(y - r * 2.05)}" stroke="${C.gold}" stroke-width="${f(sw * 1.4)}"/><circle cx="${f(cx)}" cy="${f(y - r * 1.75)}" r="${f(r * .1)}" fill="${C.gold}"/>`;
}

function chhatri(cx, base, s, col = '#F1DDB6', domeCol = '#E8C99A', line = '#9C7A4A') {
  const w = 60 * s, h = 44 * s; let g = '';
  g += `<rect x="${f(cx - w / 2)}" y="${f(base - 6 * s - h)}" width="${f(w)}" height="${f(h)}" fill="#A87B52" opacity=".55"/>`;
  g += `<rect x="${f(cx - w / 2 - 5 * s)}" y="${f(base - 6 * s)}" width="${f(w + 10 * s)}" height="${f(6 * s)}" fill="${col}" stroke="${line}" stroke-width="${f(s)}"/>`;
  for (const px of [-w / 2 + 3 * s, -w / 6, w / 6, w / 2 - 3 * s]) g += `<rect x="${f(cx + px - 2.6 * s)}" y="${f(base - 6 * s - h)}" width="${f(5.2 * s)}" height="${f(h)}" fill="${col}" stroke="${line}" stroke-width="${f(.8 * s)}"/>`;
  const y = base - 6 * s - h;
  g += `<path d="M${f(cx - w / 2 - 11 * s)},${f(y)} L${f(cx + w / 2 + 11 * s)},${f(y)} L${f(cx + w / 2)},${f(y - 8 * s)} L${f(cx - w / 2)},${f(y - 8 * s)} Z" fill="${col}" stroke="${line}" stroke-width="${f(s)}"/>`;
  g += dome(cx, y - 8 * s, w * .42, domeCol, line, s);
  return g;
}

function hawaMahal(cx, base, s) {
  let g = ''; const tiers = [560, 470, 380, 290, 200], th = 70 * s;
  tiers.forEach((tw, i) => {
    const w = tw * s, x = cx - w / 2, y = base - (i + 1) * th;
    g += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(th)}" fill="${C.pink}" stroke="${C.pinkD}" stroke-width="${f(1.5 * s)}"/>`;
    const n = Math.max(3, Math.floor(w / (38 * s))), step = w / n;
    for (let k = 0; k < n; k++) {
      const wx = x + step * k + step / 2, ww = step * .48, wh = th * .5, wy = y + th * .3;
      g += `<path d="M${f(wx - ww / 2)},${f(wy + wh)} V${f(wy + ww / 2)} A${f(ww / 2)},${f(ww / 2)} 0 0 1 ${f(wx + ww / 2)},${f(wy + ww / 2)} V${f(wy + wh)} Z" fill="${C.win}" stroke="${C.pinkL}" stroke-width="${f(1.8 * s)}"/>`;
      g += `<rect x="${f(wx - ww / 2 - 3 * s)}" y="${f(wy + wh)}" width="${f(ww + 6 * s)}" height="${f(4.5 * s)}" fill="${C.pinkL}"/>`;
      g += `<path d="M${f(wx - ww * .62)},${f(y + 1)} Q${f(wx)},${f(y - ww * 1.05)} ${f(wx + ww * .62)},${f(y + 1)} Z" fill="#EDB091" stroke="${C.pinkD}" stroke-width="${f(s)}"/>`;
      g += `<line x1="${f(wx)}" y1="${f(y - ww * .5)}" x2="${f(wx)}" y2="${f(y - ww * .9)}" stroke="${C.gold}" stroke-width="${f(1.4 * s)}"/>`;
    }
    g += `<rect x="${f(x - 4 * s)}" y="${f(y + th - 6 * s)}" width="${f(w + 8 * s)}" height="${f(6 * s)}" fill="${C.pinkL}" stroke="${C.pinkD}" stroke-width="${f(s)}"/>`;
  });
  const top = base - tiers.length * th;
  g += chhatri(cx, top, s * 1.15, '#F3C9AE', '#EDB091', C.pinkD);
  g += chhatri(cx - 70 * s, top + 2, s * .7, '#F3C9AE', '#EDB091', C.pinkD) + chhatri(cx + 70 * s, top + 2, s * .7, '#F3C9AE', '#EDB091', C.pinkD);
  return g;
}

function wing(x, base, w, h, s, col = '#EFCFA4', line = '#A57A4C', win = '#8B4A32') {
  let g = `<rect x="${f(x)}" y="${f(base - h)}" width="${f(w)}" height="${f(h)}" fill="${col}" stroke="${line}" stroke-width="${f(1.4 * s)}"/>`;
  const n = Math.max(2, Math.floor(w / (46 * s))), step = w / n;
  for (let row = 0; row < 2; row++) {
    const wy = base - h + h * (row === 0 ? .2 : .58), wh = h * .26;
    for (let k = 0; k < n; k++) {
      const wx = x + step * k + step / 2, ww = step * .42;
      g += `<path d="M${f(wx - ww / 2)},${f(wy + wh)} V${f(wy + ww * .4)} Q${f(wx)},${f(wy - ww * .5)} ${f(wx + ww / 2)},${f(wy + ww * .4)} V${f(wy + wh)} Z" fill="${win}" stroke="${C.pinkL}" stroke-width="${f(1.2 * s)}"/>`;
    }
  }
  for (let mx = x; mx < x + w - 6 * s; mx += 16 * s) g += `<rect x="${f(mx)}" y="${f(base - h - 8 * s)}" width="${f(9 * s)}" height="${f(8 * s)}" fill="${col}" stroke="${line}" stroke-width="${f(.8 * s)}"/>`;
  g += `<rect x="${f(x)}" y="${f(base - h)}" width="${f(w)}" height="${f(5 * s)}" fill="${C.pinkL}"/>`;
  return g;
}

function hills(W, y, amp, fill, seed, fort) {
  const r = rng(seed), pts = []; const n = 14;
  for (let i = 0; i <= n; i++) pts.push([W * i / n, y - amp * (.35 + r() * .65)]);
  let d = `M0,${f(y + 40)} L0,${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; d += ` Q${f(pts[i][0])},${f(pts[i][1])} ${f(mx)},${f(my)}`; }
  d += ` L${W},${f(pts[n][1])} L${W},${f(y + 40)} Z`;
  let g = `<path d="${d}" fill="${fill}"/>`;
  if (fort) {
    let wl = ''; for (let i = 0; i <= n; i++) wl += `${i ? 'L' : 'M'}${f(pts[i][0])},${f(pts[i][1] - 4)} `;
    g += `<path d="${wl}" fill="none" stroke="#D9B98C" stroke-width="5" opacity=".8"/>`;
    for (let i = 1; i < n; i += 2) g += `<rect x="${f(pts[i][0] - 9)}" y="${f(pts[i][1] - 22)}" width="18" height="20" fill="#D9B98C" opacity=".85"/>`;
  }
  return g;
}

function sky(W, H, horizon, sunY) {
  return `<linearGradient id="skyg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF6DF"/><stop offset=".55" stop-color="#FADDAA"/><stop offset="1" stop-color="#F1B27A"/></linearGradient>
  <rect width="${W}" height="${f(horizon + 60)}" fill="url(#skyg)"/>
  <circle cx="${f(W / 2)}" cy="${f(sunY)}" r="${f(Math.min(W, H) * .5)}" fill="url(#glow)"/>
  <circle cx="${f(W / 2)}" cy="${f(sunY)}" r="${f(Math.min(W, H) * .06)}" fill="#FFEFC6" opacity=".95"/>`;
}

function birds(x, y, s, n, seed) {
  const r = rng(seed); let g = '';
  for (let i = 0; i < n; i++) { const bx = x + r() * 260 * s, by = y + r() * 90 * s, k = (.6 + r() * .6) * s; g += `<path d="M${f(bx)},${f(by)} q${f(7 * k)},${f(-7 * k)} ${f(14 * k)},0 q${f(7 * k)},${f(-7 * k)} ${f(14 * k)},0" fill="none" stroke="#6B4A33" stroke-width="${f(2 * k)}" stroke-linecap="round"/>`; }
  return g;
}

function cypress(x, base, h, col = C.green) {
  return `<path d="M${f(x)},${f(base - h)} C${f(x + h * .16)},${f(base - h * .7)} ${f(x + h * .14)},${f(base - h * .15)} ${f(x)},${f(base)} C${f(x - h * .14)},${f(base - h * .15)} ${f(x - h * .16)},${f(base - h * .7)} ${f(x)},${f(base - h)} Z" fill="${col}"/>
  <path d="M${f(x)},${f(base - h * .9)} C${f(x + h * .08)},${f(base - h * .6)} ${f(x + h * .07)},${f(base - h * .2)} ${f(x)},${f(base)}" fill="none" stroke="${C.greenD}" stroke-width="${f(h * .03)}" opacity=".5"/>`;
}

function marigoldStrand(x, y0, len, s, seed) {
  const r = rng(seed); let g = ''; const step = 15 * s;
  for (let yy = y0, i = 0; yy < y0 + len; yy += step, i++) {
    const sx = x + Math.sin(i * .5) * 2 * s;
    const col = i % 3 === 2 ? C.red : (i % 2 ? C.mari2 : C.mari);
    g += `<circle cx="${f(sx)}" cy="${f(yy)}" r="${f(8.5 * s)}" fill="${col}"/><circle cx="${f(sx)}" cy="${f(yy)}" r="${f(8.5 * s)}" fill="none" stroke="#9A4E10" stroke-width="${f(.9 * s)}" stroke-dasharray="${f(2 * s)} ${f(2 * s)}"/>`;
  }
  const ey = y0 + len;
  g += `<path d="M${f(x)},${f(ey)} q${f(-8 * s)},${f(14 * s)} 0,${f(26 * s)} q${f(8 * s)},${f(-12 * s)} 0,${f(-26 * s)} Z" fill="#4E7A2E"/>`;
  g += `<circle cx="${f(x)}" cy="${f(ey + 30 * s)}" r="${f(4 * s)}" fill="${C.gold}"/>`;
  return g;
}

function toran(W, y, swags, s) {
  let g = ''; const sw = W / swags, dip = 42 * s;
  for (let i = 0; i < swags; i++) {
    const x0 = i * sw, x1 = x0 + sw;
    for (let t = 0; t <= 1.0001; t += 1 / 14) {
      const px = x0 + (x1 - x0) * t, py = y + 4 * dip * t * (1 - t);
      const k = Math.round(t * 14);
      g += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(8 * s)}" fill="${k % 2 ? C.mari2 : C.mari}" stroke="#9A4E10" stroke-width="${f(.8 * s)}"/>`;
    }
    g += `<path d="M${f(x1)},${f(y)} q${f(-9 * s)},${f(18 * s)} 0,${f(40 * s)} q${f(9 * s)},${f(-18 * s)} 0,${f(-40 * s)} Z" fill="#3F6B2A"/>`;
    g += marigoldStrand(x1, y + 6 * s, 70 * s, s * .8, i);
  }
  return g;
}

function peacock(x, y, s, flip = false, seed = 1) {
  const r = rng(seed);
  let tail = `<path d="M0,0 C-50,6 -140,26 -210,70 C-150,66 -70,44 0,16 Z" fill="#2F6B4F" stroke="#1D4632" stroke-width="1.5"/>`;
  for (let i = 0; i < 9; i++) { const t = .2 + i * .09; const tx = -210 * t * 1.05 + (r() - .5) * 10, ty = 70 * t * t * 1.1 + 6 + (r() - .5) * 12; tail += `<g transform="translate(${f(tx)} ${f(ty)})"><ellipse rx="9" ry="7" fill="#C9A24A"/><ellipse rx="6.5" ry="5" fill="${C.teal}"/><ellipse rx="3.6" ry="3" fill="${C.blue}"/><ellipse rx="1.6" ry="1.4" fill="#120d30"/></g>`; }
  const body = `<path d="M-12,12 C-20,-10 -4,-30 10,-34 C14,-50 13,-66 22,-74 C30,-81 39,-74 34,-66 C28,-58 26,-44 28,-30 C40,-20 38,6 20,14 Z" fill="${C.blue}" stroke="#0F2E55" stroke-width="1.5"/>
  <path d="M-8,4 C-4,-16 10,-22 22,-16 C18,0 6,8 -8,4 Z" fill="#B7864A"/>
  <path d="M35,-72 L46,-69 L35,-66 Z" fill="${C.gold}"/><circle cx="29" cy="-71" r="2.2" fill="#fff"/><circle cx="29.5" cy="-71" r="1" fill="#000"/>
  ${[-8, 0, 8].map(dx => `<line x1="26" y1="-79" x2="${26 + dx * .6}" y2="-94" stroke="${C.blue}" stroke-width="1.4"/><circle cx="${26 + dx * .6}" cy="-95" r="2.4" fill="${C.teal}"/>`).join('')}
  <path d="M4,14 L2,34 M16,14 L18,34" stroke="#8B6A3A" stroke-width="2.6"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -s : s} ${s})">${tail}${body}</g>`;
}

function diya(x, y, s) {
  return `<circle cx="${f(x)}" cy="${f(y - 18 * s)}" r="${f(40 * s)}" fill="url(#fireglow)" opacity=".7"/>
  <path d="M${f(x - 24 * s)},${f(y)} Q${f(x)},${f(y + 20 * s)} ${f(x + 24 * s)},${f(y)} Q${f(x + 30 * s)},${f(y - 4 * s)} ${f(x + 34 * s)},${f(y - 10 * s)} L${f(x + 20 * s)},${f(y - 4 * s)} Q${f(x)},${f(y - 6 * s)} ${f(x - 24 * s)},${f(y)} Z" fill="#B5592E" stroke="#6E2E16" stroke-width="${f(1.2 * s)}"/>
  <path d="M${f(x + 22 * s)},${f(y - 8 * s)} q${f(-7 * s)},${f(-12 * s)} ${f(2 * s)},${f(-26 * s)} q${f(8 * s)},${f(14 * s)} ${f(-2 * s)},${f(26 * s)} Z" fill="#FFC64A"/><path d="M${f(x + 22 * s)},${f(y - 9 * s)} q${f(-3 * s)},${f(-7 * s)} ${f(1 * s)},${f(-14 * s)} q${f(4 * s)},${f(7 * s)} ${f(-1 * s)},${f(14 * s)} Z" fill="#FFF4C8"/>`;
}

function bell(x, y, len, s) {
  return `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x)}" y2="${f(y + len)}" stroke="${C.gold}" stroke-width="${f(2.2 * s)}" stroke-dasharray="${f(5 * s)} ${f(3 * s)}"/>
  <path d="M${f(x - 18 * s)},${f(y + len + 36 * s)} Q${f(x - 18 * s)},${f(y + len + 4 * s)} ${f(x)},${f(y + len)} Q${f(x + 18 * s)},${f(y + len + 4 * s)} ${f(x + 18 * s)},${f(y + len + 36 * s)} Z" fill="url(#goldbar)" stroke="#7A5A2A" stroke-width="${f(1.2 * s)}"/>
  <rect x="${f(x - 21 * s)}" y="${f(y + len + 34 * s)}" width="${f(42 * s)}" height="${f(5 * s)}" rx="${f(2 * s)}" fill="${C.gold}"/><circle cx="${f(x)}" cy="${f(y + len + 44 * s)}" r="${f(4.5 * s)}" fill="#8C6A30"/>`;
}

function mandala(cx, cy, R, col, op) {
  let g = `<g transform="translate(${f(cx)} ${f(cy)})" fill="none" stroke="${col}" opacity="${op}">`;
  const rings = [[.18, 8], [.32, 12], [.48, 16], [.66, 24], [.86, 32]];
  rings.forEach(([rr, n], i) => {
    const r0 = R * rr;
    g += `<circle r="${f(r0)}" stroke-width="2"/>`;
    for (let k = 0; k < n; k++) {
      const a = 360 / n * k, pl = R * (i < 4 ? .12 : .1);
      g += `<path d="M0,${f(-r0)} C${f(pl * .55)},${f(-r0 - pl * .4)} ${f(pl * .3)},${f(-r0 - pl)} 0,${f(-r0 - pl * 1.15)} C${f(-pl * .3)},${f(-r0 - pl)} ${f(-pl * .55)},${f(-r0 - pl * .4)} 0,${f(-r0)} Z" stroke-width="1.6" transform="rotate(${f(a)})"/>`;
    }
  });
  g += `<circle r="${f(R * 1.02)}" stroke-width="3"/><circle r="${f(R * 1.06)}" stroke-width="1.2" stroke-dasharray="4 6"/></g>`;
  return g;
}

function jharokhaFrame(W, H, s, portrait) {
  const x0 = W * (portrait ? .06 : .075), y0 = H * (portrait ? .035 : .05), w = W - 2 * x0, h = H - y0;
  const ap = archPath(x0, y0, w, h, portrait ? 7 : 6);
  let g = '';
  // hanging marigold strands (drawn before frame so they emerge from the arch edge)
  const strands = portrait ? [[.13, .34], [.2, .22], [.8, .22], [.87, .34]] : [[.12, .42], [.17, .3], [.83, .3], [.88, .42]];
  strands.forEach(([fx, fl], i) => { g += marigoldStrand(W * fx, 0, H * fl, s, i + 3); });
  g += `<path d="M0,0 H${W} V${H} H0 Z ${ap}" fill="url(#carve)" fill-rule="evenodd"/>`;
  g += `<path d="M0,0 H${W} V${H} H0 Z ${ap}" fill="#5a3a14" opacity=".12" fill-rule="evenodd"/>`;
  g += `<path d="${archPath(x0 - 26 * s, y0 - 22 * s, w + 52 * s, h + 22 * s, portrait ? 7 : 6)}" fill="none" stroke="${C.gold}" stroke-width="${f(3 * s)}" opacity=".9"/>`;
  g += `<path d="${archPath(x0 - 14 * s, y0 - 11 * s, w + 28 * s, h + 11 * s, portrait ? 7 : 6)}" fill="none" stroke="${C.maroon}" stroke-width="${f(5 * s)}" opacity=".55"/>`;
  g += `<path d="${ap}" fill="none" stroke="url(#goldbar)" stroke-width="${f(12 * s)}"/>`;
  g += `<path d="${ap}" fill="none" stroke="#6E4E1E" stroke-width="${f(2 * s)}"/>`;
  // pillar fluting + capitals
  const capY = y0 + Math.min(h * .5, w * .72);
  for (const side of [0, 1]) {
    const px = side ? W - x0 : 0, pw = x0;
    for (let k = 1; k < 4; k++) g += `<line x1="${f(px + pw * k / 4)}" y1="${f(capY + 50 * s)}" x2="${f(px + pw * k / 4)}" y2="${f(H)}" stroke="#B48E52" stroke-width="${f(2 * s)}" opacity=".7"/>`;
    g += `<rect x="${f(px)}" y="${f(capY)}" width="${f(pw)}" height="${f(46 * s)}" fill="url(#goldbar)" opacity=".85"/>`;
    g += `<rect x="${f(px)}" y="${f(capY + 14 * s)}" width="${f(pw)}" height="${f(16 * s)}" fill="url(#floral)"/>`;
  }
  // window sill
  g += `<rect x="0" y="${f(H - 34 * s)}" width="${W}" height="${f(34 * s)}" fill="url(#carve)"/><rect x="0" y="${f(H - 34 * s)}" width="${W}" height="${f(6 * s)}" fill="url(#goldbar)"/>`;
  return g;
}

/* ---------- figures ---------- */
function ganeshaArt() {
  const O = C.brown, G = '#D4B06A', G2 = C.agold;
  let g = '';
  // halo
  g += `<circle cx="100" cy="92" r="70" fill="${C.champ}" opacity=".7"/>`;
  for (let k = 0; k < 36; k++) g += `<line x1="100" y1="22" x2="100" y2="10" stroke="${G2}" stroke-width="2" transform="rotate(${k * 10} 100 92)"/>`;
  g += `<circle cx="100" cy="92" r="70" fill="none" stroke="${G2}" stroke-width="2.5"/><circle cx="100" cy="92" r="64" fill="none" stroke="${G2}" stroke-width="1" stroke-dasharray="3 4"/>`;
  // lotus seat
  for (let k = -4; k <= 4; k++) g += `<path d="M${100 + k * 15},236 C${92 + k * 15},222 ${96 + k * 15},210 ${100 + k * 15},204 C${104 + k * 15},210 ${108 + k * 15},222 ${100 + k * 15},236 Z" fill="${C.ivory}" stroke="${O}" stroke-width="1.6"/>`;
  g += `<path d="M30,236 Q100,250 170,236 L166,244 Q100,258 34,244 Z" fill="${G}" stroke="${O}" stroke-width="1.6"/>`;
  // back arms with axe & lotus
  g += `<path d="M60,150 C42,140 34,122 36,104" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/><path d="M60,150 C42,140 34,122 36,104" fill="none" stroke="${G}" stroke-width="9" stroke-linecap="round"/>`;
  g += `<line x1="36" y1="110" x2="30" y2="70" stroke="${O}" stroke-width="3"/><path d="M24,74 Q30,60 42,66 L34,80 Z" fill="${C.ivory}" stroke="${O}" stroke-width="1.6"/>`;
  g += `<path d="M140,150 C158,140 166,122 164,104" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/><path d="M140,150 C158,140 166,122 164,104" fill="none" stroke="${G}" stroke-width="9" stroke-linecap="round"/>`;
  g += `<g transform="translate(166 92)">${[-40, -15, 15, 40].map(a => `<ellipse cx="0" cy="-10" rx="5" ry="11" fill="${C.ivory}" stroke="${O}" stroke-width="1.4" transform="rotate(${a})"/>`).join('')}<ellipse cx="0" cy="-12" rx="5" ry="12" fill="${C.ivory}" stroke="${O}" stroke-width="1.4"/></g>`;
  // body / belly + dhoti
  g += `<path d="M58,232 C40,206 52,176 72,166 L128,166 C148,176 160,206 142,232 Z" fill="${C.maroon}" stroke="${O}" stroke-width="2"/>`;
  g += `<path d="M58,232 C40,206 52,176 72,166 L128,166 C148,176 160,206 142,232 Z" fill="none" stroke="${G2}" stroke-width="1.2" stroke-dasharray="2 3" transform="translate(0 -3) scale(1 1)"/>`;
  g += `<ellipse cx="100" cy="172" rx="38" ry="30" fill="${G}" stroke="${O}" stroke-width="2"/>`;
  g += `<circle cx="100" cy="178" r="3" fill="none" stroke="${O}" stroke-width="1.4"/>`;
  g += `<path d="M68,160 Q100,196 132,160" fill="none" stroke="${C.red}" stroke-width="3"/><path d="M74,150 Q100,176 126,150" fill="none" stroke="${G2}" stroke-width="2.4"/>`;
  // front arms
  g += `<path d="M70,156 C56,166 48,178 52,192" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/><path d="M70,156 C56,166 48,178 52,192" fill="none" stroke="${G}" stroke-width="10" stroke-linecap="round"/>`;
  g += `<path d="M46,196 Q44,180 50,176 Q56,174 58,180 L58,196 Q52,200 46,196 Z" fill="${G}" stroke="${O}" stroke-width="1.6"/><circle cx="52" cy="188" r="2" fill="${C.red}"/>`;
  g += `<path d="M130,156 C144,166 150,178 146,192" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/><path d="M130,156 C144,166 150,178 146,192" fill="none" stroke="${G}" stroke-width="10" stroke-linecap="round"/>`;
  g += `<path d="M134,198 L158,198 L154,206 L138,206 Z" fill="${C.ivory}" stroke="${O}" stroke-width="1.6"/>${[138, 146, 154].map(x => `<circle cx="${x}" cy="194" r="4.5" fill="${C.ivory}" stroke="${O}" stroke-width="1.4"/>`).join('')}`;
  // ears
  g += `<path d="M76,82 C46,58 22,84 28,112 C32,134 56,136 74,118 Z" fill="${G}" stroke="${O}" stroke-width="2"/><path d="M70,90 C50,76 36,92 40,110 C44,124 58,124 68,114" fill="none" stroke="${C.red}" stroke-width="1.6"/>`;
  g += `<path d="M124,82 C154,58 178,84 172,112 C168,134 144,136 126,118 Z" fill="${G}" stroke="${O}" stroke-width="2"/><path d="M130,90 C150,76 164,92 160,110 C156,124 142,124 132,114" fill="none" stroke="${C.red}" stroke-width="1.6"/>`;
  // head
  g += `<path d="M70,82 C70,62 84,54 100,54 C116,54 130,62 130,82 C132,104 122,120 112,124 L88,124 C78,120 68,104 70,82 Z" fill="${G}" stroke="${O}" stroke-width="2"/>`;
  // trunk (curving to viewer's right)
  const trunk = 'M100,104 C96,130 98,150 112,160 C124,168 132,156 124,150 C118,146 112,150 116,156';
  g += `<path d="${trunk}" fill="none" stroke="${O}" stroke-width="20" stroke-linecap="round"/><path d="${trunk}" fill="none" stroke="${G}" stroke-width="15" stroke-linecap="round"/>`;
  [118, 126, 134, 142].forEach(y => { g += `<path d="M${92 + (y - 118) * .05},${y} q8,4 15,0" fill="none" stroke="${O}" stroke-width="1.2" opacity=".7"/>`; });
  // tusk
  g += `<path d="M86,118 C80,124 80,132 86,134 C86,128 88,122 92,120 Z" fill="${C.ivory}" stroke="${O}" stroke-width="1.4"/>`;
  // eyes, tilak
  g += `<path d="M82,90 Q88,85 94,90 Q88,93 82,90 Z" fill="#fff" stroke="${O}" stroke-width="1.4"/><circle cx="88" cy="89.5" r="1.8" fill="${O}"/>`;
  g += `<path d="M106,90 Q112,85 118,90 Q112,93 106,90 Z" fill="#fff" stroke="${O}" stroke-width="1.4"/><circle cx="112" cy="89.5" r="1.8" fill="${O}"/>`;
  g += `<path d="M94,74 Q100,82 106,74" fill="none" stroke="${C.red}" stroke-width="2.4"/><line x1="100" y1="68" x2="100" y2="80" stroke="${C.red}" stroke-width="2.4"/>`;
  // crown
  g += `<path d="M72,66 L76,46 Q100,4 124,46 L128,66 Q100,58 72,66 Z" fill="${G2}" stroke="${O}" stroke-width="2"/>`;
  g += `<path d="M74,56 Q100,48 126,56" fill="none" stroke="${O}" stroke-width="1.4"/><path d="M80,42 Q100,34 120,42" fill="none" stroke="${O}" stroke-width="1.2"/>`;
  g += `<circle cx="100" cy="50" r="4" fill="${C.red}" stroke="${O}" stroke-width="1"/><circle cx="86" cy="58" r="2.4" fill="${C.red}"/><circle cx="114" cy="58" r="2.4" fill="${C.red}"/>`;
  g += `<path d="M100,14 L104,24 L100,30 L96,24 Z" fill="${G2}" stroke="${O}" stroke-width="1.4"/>`;
  return g;
}

function groomArt() {
  const O = '#5a3a1e';
  let g = '';
  g += `<path d="M66,112 C52,124 50,160 56,192 L64,190 C60,160 62,130 76,120 Z" fill="url(#leheriya)" stroke="${C.maroon}" stroke-width="1.2"/>`;
  g += `<path d="M18,262 C22,214 52,196 100,192 C148,196 178,214 182,262 Z" fill="#F4E6C8" stroke="#8C6B3A" stroke-width="1.4"/>`;
  for (let y = 206; y < 262; y += 7) g += `<path d="M30,${y} Q36,${y - 3} 42,${y}" fill="none" stroke="${C.agold}" stroke-width=".8" opacity=".7"/><path d="M158,${y} Q164,${y - 3} 170,${y}" fill="none" stroke="${C.agold}" stroke-width=".8" opacity=".7"/>`;
  g += `<line x1="100" y1="200" x2="100" y2="262" stroke="${C.gold}" stroke-width="2"/>${[212, 226, 240, 254].map(y => `<circle cx="100" cy="${y}" r="2.4" fill="${C.gold}" stroke="#7A5A2A" stroke-width=".6"/>`).join('')}`;
  g += `<path d="M36,212 C72,214 122,238 152,262 L120,262 C100,248 66,232 30,228 Z" fill="${C.red}" stroke="${C.agold}" stroke-width="1.6"/>`;
  g += `<path d="M86,186 L86,198 Q100,205 114,198 L114,186 Z" fill="${C.agold}" stroke="#7A5A2A" stroke-width="1"/>`;
  g += `<path d="M88,160 L88,192 Q100,198 112,192 L112,160 Z" fill="#C88A62"/>`;
  for (let t = 0; t <= 1; t += 1 / 18) { const x = 76 + 48 * t, y = 196 + 44 * 4 * t * (1 - t) * .9; g += `<circle cx="${f(x)}" cy="${f(y)}" r="2.1" fill="#FFF4DD" stroke="#B9A27A" stroke-width=".5"/>`; }
  g += `<circle cx="100" cy="238" r="5" fill="${C.red}" stroke="${C.gold}" stroke-width="1.6"/>`;
  g += `<ellipse cx="76" cy="140" rx="4.5" ry="7.5" fill="${C.skin}" stroke="${C.skinD}"/><ellipse cx="124" cy="140" rx="4.5" ry="7.5" fill="${C.skin}" stroke="${C.skinD}"/>`;
  g += `<ellipse cx="100" cy="138" rx="24" ry="29" fill="${C.skin}" stroke="${C.skinD}" stroke-width="1"/>`;
  g += `<path d="M85,130 Q91,126.5 97,129.5 M103,129.5 Q109,126.5 115,130" fill="none" stroke="${C.brown}" stroke-width="1.9" stroke-linecap="round"/>`;
  g += `<path d="M86,137 Q91,133 96,137 Q91,140 86,137 Z M104,137 Q109,133 114,137 Q109,140 104,137 Z" fill="#fff" stroke="${C.brown}" stroke-width="1"/><circle cx="91" cy="136.8" r="1.9" fill="${C.brown}"/><circle cx="109" cy="136.8" r="1.9" fill="${C.brown}"/>`;
  g += `<path d="M100,139 Q97.5,148 101,150" fill="none" stroke="${C.skinD}" stroke-width="1.1"/>`;
  g += `<path d="M88,156 Q94,151 100,154 Q106,151 112,156 Q106,158 100,156.5 Q94,158 88,156 Z" fill="${C.brown}"/>`;
  g += `<path d="M94,160.5 Q100,164 106,160.5" fill="none" stroke="#8A3A2C" stroke-width="1.6" stroke-linecap="round"/>`;
  g += `<line x1="100" y1="117" x2="100" y2="126" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/>`;
  g += `<path d="M66,132 C58,96 76,70 102,70 C130,70 144,96 134,132 C126,118 112,112 100,112 C88,112 74,118 66,132 Z" fill="url(#leheriya)" stroke="${C.maroon}" stroke-width="1.6"/>`;
  g += `<path d="M68,120 Q100,94 133,118 M70,104 Q102,80 136,100 M78,88 Q104,72 130,84" fill="none" stroke="${C.maroon}" stroke-width="1.4" opacity=".6"/>`;
  g += `<path d="M66,132 C74,118 88,112 100,112 C112,112 126,118 134,132" fill="none" stroke="${C.agold}" stroke-width="2.6"/>`;
  g += `<path d="M104,98 C110,80 118,66 124,52 C126,62 120,74 112,92 Z" fill="#FFF4DD" stroke="${C.agold}" stroke-width="1"/>`;
  g += `<path d="M100,90 Q108,96 104,106 Q98,108 96,100 Q96,93 100,90 Z" fill="${C.gold}" stroke="#6E4E1E" stroke-width="1"/><circle cx="101" cy="100" r="2.8" fill="${C.red}"/>`;
  for (let k = 0; k < 7; k++) g += `<circle cx="${f(92 + k * 3)}" cy="${f(106 + Math.sin(k) * 1.5)}" r="1.4" fill="#FFF4DD"/>`;
  return g;
}

function brideArt() {
  let g = '';
  g += `<path d="M62,150 C58,100 76,74 100,72 C124,74 142,100 138,150 C146,182 166,208 188,262 L150,262 C136,222 124,202 122,172 L122,130 C120,108 112,100 100,100 C88,100 80,108 78,130 L78,172 C76,202 64,222 50,262 L12,262 C34,208 54,182 62,150 Z" fill="#B5303F" stroke="${C.maroon}" stroke-width="1.4"/>`;
  g += `<path d="M18,262 C26,214 54,198 100,194 C146,198 174,214 182,262 Z" fill="${C.red}" stroke="${C.maroon}" stroke-width="1.2"/>`;
  for (let t = 0; t < 1; t += .045) { const x = 30 + 140 * t, y = 262 - 60 * Math.sin(Math.PI * t) * .1; g += `<circle cx="${f(x)}" cy="${f(y - 8)}" r="1.6" fill="${C.agold}"/>`; }
  // odhni gota border
  g += `<path d="M14,262 C36,208 56,182 62,150 C58,100 76,74 100,72 C124,74 142,100 138,150 C146,182 166,208 186,262" fill="none" stroke="${C.agold}" stroke-width="4"/>`;
  g += `<path d="M50,262 C64,222 76,202 78,172 L78,130 C80,108 88,100 100,100 C112,100 120,108 122,130 L122,172 C124,202 136,222 150,262" fill="none" stroke="${C.agold}" stroke-width="3.4"/>`;
  g += `<path d="M14,262 C36,208 56,182 62,150 C58,100 76,74 100,72 C124,74 142,100 138,150 C146,182 166,208 186,262" fill="none" stroke="#FFF1C9" stroke-width="1" stroke-dasharray="1 4" transform="translate(0 -1)"/>`;
  for (let k = 0; k < 14; k++) { const a = rng(k + 9)(); g += `<circle cx="${f(30 + a * 140)}" cy="${f(150 + rng(k + 40)() * 100)}" r="1.4" fill="${C.agold}" opacity=".9"/>`; }
  g += `<path d="M90,160 L90,194 Q100,200 110,194 L110,160 Z" fill="#C88A62"/>`;
  g += `<path d="M84,192 Q100,204 116,192" fill="none" stroke="${C.agold}" stroke-width="5"/>`;
  for (let t = 0; t <= 1; t += .125) { const x = 85 + 30 * t, y = 193 + 12 * 4 * t * (1 - t) * .9; g += `<circle cx="${f(x)}" cy="${f(y)}" r="2" fill="${C.red}" stroke="${C.gold}" stroke-width=".6"/>`; }
  g += `<path d="M78,200 Q100,236 122,200" fill="none" stroke="${C.gold}" stroke-width="2.6"/><path d="M74,206 Q100,252 126,206" fill="none" stroke="${C.agold}" stroke-width="2"/>`;
  g += `<path d="M94,226 L100,240 L106,226 Q100,220 94,226 Z" fill="${C.gold}" stroke="#6E4E1E" stroke-width=".8"/><circle cx="100" cy="229" r="2.2" fill="#2E7D5B"/>`;
  g += `<path d="M80,132 C80,110 90,102 100,102 C110,102 120,110 120,132 C114,118 106,114 100,114 C94,114 86,118 80,132 Z" fill="${C.brown}"/>`;
  g += `<ellipse cx="100" cy="137" rx="21.5" ry="27" fill="${C.skin}" stroke="${C.skinD}" stroke-width="1"/>`;
  g += `<path d="M80,132 C82,116 90,111 100,111 C110,111 118,116 120,132 C114,120 107,117 100,117 C93,117 86,120 80,132 Z" fill="${C.brown}"/>`;
  g += `<line x1="100" y1="103" x2="100" y2="116" stroke="${C.red}" stroke-width="1.6"/><line x1="100" y1="103" x2="100" y2="116" stroke="${C.gold}" stroke-width=".8"/>`;
  g += `<circle cx="100" cy="119" r="4" fill="${C.gold}" stroke="#6E4E1E" stroke-width=".8"/><circle cx="100" cy="119" r="1.8" fill="${C.red}"/><circle cx="100" cy="125.5" r="1.8" fill="${C.red}"/>`;
  g += `<path d="M87,129 Q92,126.5 96,128.5 M104,128.5 Q108,126.5 113,129" fill="none" stroke="${C.brown}" stroke-width="1.3" stroke-linecap="round"/>`;
  g += `<path d="M86,135.5 Q91,131 96,135.5 Q91,138.5 86,135.5 Z M104,135.5 Q109,131 114,135.5 Q109,138.5 104,135.5 Z" fill="#fff" stroke="${C.brown}" stroke-width="1.5"/><circle cx="91" cy="135.3" r="1.9" fill="${C.brown}"/><circle cx="109" cy="135.3" r="1.9" fill="${C.brown}"/>`;
  g += `<path d="M85,134.5 l-2.5,-1.5 M114.8,134.5 l2.5,-1.5" stroke="${C.brown}" stroke-width="1.1"/>`;
  g += `<path d="M100,138 Q98,146 101,148" fill="none" stroke="${C.skinD}" stroke-width="1"/>`;
  g += `<path d="M94,155 Q97,153 100,154.5 Q103,153 106,155 Q100,160 94,155 Z" fill="#8E1E2C"/>`;
  g += `<circle cx="92" cy="151" r="8" fill="none" stroke="${C.gold}" stroke-width="1.6"/><circle cx="85" cy="154" r="1.8" fill="#FFF4DD"/><path d="M86,145 Q80,140 79,146" fill="none" stroke="${C.gold}" stroke-width=".8"/>`;
  for (const ex of [78.5, 121.5]) g += `<path d="M${ex - 5},${152} Q${ex},${142} ${ex + 5},${152} Z" fill="${C.gold}" stroke="#6E4E1E" stroke-width=".7"/>${[-4, -1.3, 1.3, 4].map(dx => `<circle cx="${ex + dx}" cy="154" r="1.1" fill="#FFF4DD"/>`).join('')}`;
  return g;
}

function framedPortrait(art, idPrefix) {
  // 600x820 portrait image: ornate gold cusped arch frame with scene + figure inside
  const W = 600, H = 820, ap = archPath(60, 70, 480, 690, 5);
  let g = `<clipPath id="${idPrefix}clip"><path d="${ap}"/></clipPath>`;
  g += `<linearGradient id="${idPrefix}sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF3D8"/><stop offset=".6" stop-color="#F7D6A4"/><stop offset="1" stop-color="#EDB27E"/></linearGradient>`;
  g += `<g clip-path="url(#${idPrefix}clip)"><rect width="${W}" height="${H}" fill="url(#${idPrefix}sky)"/>`;
  g += `<circle cx="300" cy="420" r="260" fill="url(#glow)"/>`;
  g += hills(W, 560, 70, '#DDB287', 7, false);
  g += `<g opacity=".9">${hawaMahal(300, 600, .55)}${chhatri(110, 600, .9)}${chhatri(490, 600, .9)}</g>`;
  g += birds(150, 170, 1, 5, 4);
  g += `<g transform="translate(0 0) scale(3 3.1) translate(0 2)">${art}</g></g>`;
  // frame bands
  g += `<path d="${archPath(30, 40, 540, 740, 5)}" fill="none" stroke="url(#goldbar)" stroke-width="22"/>`;
  g += `<path d="${archPath(30, 40, 540, 740, 5)}" fill="none" stroke="#6E4E1E" stroke-width="1.5"/>`;
  g += `<path d="${archPath(48, 58, 504, 714, 5)}" fill="none" stroke="${C.maroon}" stroke-width="8"/>`;
  g += `<path d="${archPath(48, 58, 504, 714, 5)}" fill="none" stroke="${C.agold}" stroke-width="2" stroke-dasharray="2 7"/>`;
  g += `<path d="${ap}" fill="none" stroke="url(#goldbar)" stroke-width="6"/>`;
  // finial kalash on top
  g += `<g transform="translate(300 34)"><ellipse cx="0" cy="0" rx="20" ry="16" fill="url(#goldbar)" stroke="#6E4E1E"/><rect x="-10" y="-22" width="20" height="8" fill="${C.gold}"/>${[-30, 0, 30].map(a => `<path d="M0,-22 q-7,-14 0,-26 q7,12 0,26 Z" fill="#4E7A2E" transform="rotate(${a} 0 -22)"/>`).join('')}<circle cx="0" cy="-34" r="7" fill="${C.mari}"/></g>`;
  // plinth
  g += `<rect x="16" y="770" width="568" height="34" rx="4" fill="url(#goldbar)" stroke="#6E4E1E"/><rect x="40" y="778" width="520" height="18" fill="url(#floral)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${DEFS}</defs>${g}</svg>`;
}

function mandap(cx, base, s) {
  let g = '';
  g += `<ellipse cx="${f(cx)}" cy="${f(base - 140 * s)}" rx="${f(420 * s)}" ry="${f(300 * s)}" fill="url(#fireglow)" opacity=".55"/>`;
  // steps
  g += `<rect x="${f(cx - 270 * s)}" y="${f(base - 30 * s)}" width="${f(540 * s)}" height="${f(30 * s)}" fill="#F1E2C0" stroke="${C.gold}" stroke-width="${f(2 * s)}"/>`;
  g += `<rect x="${f(cx - 240 * s)}" y="${f(base - 55 * s)}" width="${f(480 * s)}" height="${f(26 * s)}" fill="${C.cream}" stroke="${C.gold}" stroke-width="${f(2 * s)}"/>`;
  g += `<rect x="${f(cx - 240 * s)}" y="${f(base - 50 * s)}" width="${f(480 * s)}" height="${f(10 * s)}" fill="url(#floral)"/>`;
  const top = base - 360 * s;
  // canopy back drape
  g += `<path d="M${f(cx - 210 * s)},${f(top)} L${f(cx + 210 * s)},${f(top)} L${f(cx + 200 * s)},${f(base - 55 * s)} L${f(cx - 200 * s)},${f(base - 55 * s)} Z" fill="#5C1822" opacity=".85"/>`;
  for (let k = 0; k < 9; k++) g += marigoldStrand(cx - 180 * s + k * 45 * s, top + 20 * s, (150 + (k % 2) * 40) * s, s * .9, k + 20);
  // havan kund + fire
  g += `<circle cx="${f(cx)}" cy="${f(base - 90 * s)}" r="${f(110 * s)}" fill="url(#fireglow)"/>`;
  g += `<path d="M${f(cx - 46 * s)},${f(base - 55 * s)} L${f(cx - 36 * s)},${f(base - 82 * s)} L${f(cx + 36 * s)},${f(base - 82 * s)} L${f(cx + 46 * s)},${f(base - 55 * s)} Z" fill="#B5592E" stroke="#6E2E16" stroke-width="${f(1.5 * s)}"/>`;
  g += `<path d="M${f(cx - 26 * s)},${f(base - 82 * s)} C${f(cx - 34 * s)},${f(base - 112 * s)} ${f(cx - 10 * s)},${f(base - 124 * s)} ${f(cx)},${f(base - 150 * s)} C${f(cx + 10 * s)},${f(base - 124 * s)} ${f(cx + 34 * s)},${f(base - 112 * s)} ${f(cx + 26 * s)},${f(base - 82 * s)} Z" fill="#FFAF3A"/>`;
  g += `<path d="M${f(cx - 13 * s)},${f(base - 82 * s)} C${f(cx - 16 * s)},${f(base - 100 * s)} ${f(cx - 4 * s)},${f(base - 108 * s)} ${f(cx)},${f(base - 124 * s)} C${f(cx + 4 * s)},${f(base - 108 * s)} ${f(cx + 16 * s)},${f(base - 100 * s)} ${f(cx + 13 * s)},${f(base - 82 * s)} Z" fill="#FFF0B8"/>`;
  // kalash stacks
  for (const dx of [-120, 120]) for (let k = 0; k < 3; k++) { const y = base - 62 * s - k * 30 * s, r = (22 - k * 4) * s; g += `<ellipse cx="${f(cx + dx * s)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="${k % 2 ? C.red : C.agold}" stroke="#6E4E1E" stroke-width="${f(s)}"/>`; }
  // pillars
  for (const dx of [-220, -160, 160, 220]) {
    const px = cx + dx * s, w = (dx * dx > 30000 ? 22 : 16) * s;
    g += `<rect x="${f(px - w / 2)}" y="${f(top)}" width="${f(w)}" height="${f(base - 55 * s - top)}" fill="url(#goldbar)" stroke="#6E4E1E" stroke-width="${f(s)}"/>`;
    for (let y = top + 20 * s; y < base - 70 * s; y += 26 * s) g += `<circle cx="${f(px)}" cy="${f(y)}" r="${f(w * .55)}" fill="${C.mari}" opacity=".9"/>`;
  }
  // canopy dome & swags
  g += `<rect x="${f(cx - 250 * s)}" y="${f(top - 24 * s)}" width="${f(500 * s)}" height="${f(28 * s)}" fill="url(#goldbar)" stroke="#6E4E1E" stroke-width="${f(s)}"/>`;
  g += `<rect x="${f(cx - 240 * s)}" y="${f(top - 18 * s)}" width="${f(480 * s)}" height="${f(14 * s)}" fill="url(#floral)"/>`;
  for (let k = 0; k < 5; k++) { const x0 = cx - 250 * s + k * 100 * s; g += `<path d="M${f(x0)},${f(top + 4 * s)} Q${f(x0 + 50 * s)},${f(top + 60 * s)} ${f(x0 + 100 * s)},${f(top + 4 * s)} Z" fill="${C.red}" stroke="${C.agold}" stroke-width="${f(2 * s)}"/>`; }
  g += dome(cx, top - 24 * s, 120 * s, '#E9C98A', '#7A5A2A', 2 * s);
  g += dome(cx - 210 * s, top - 24 * s, 34 * s, '#E9C98A', '#7A5A2A', 1.5 * s) + dome(cx + 210 * s, top - 24 * s, 34 * s, '#E9C98A', '#7A5A2A', 1.5 * s);
  return g;
}

function stringLights(W, y, n, s, seed) {
  const r = rng(seed); let g = ''; const sw = W / n;
  for (let i = 0; i < n; i++) {
    const x0 = i * sw, dip = (40 + r() * 30) * s;
    g += `<path d="M${f(x0)},${f(y)} Q${f(x0 + sw / 2)},${f(y + dip * 2)} ${f(x0 + sw)},${f(y)}" fill="none" stroke="#3A2A1E" stroke-width="${f(1.4 * s)}" opacity=".7"/>`;
    for (let t = .05; t < 1; t += .1) { const px = x0 + sw * t, py = y + dip * 4 * t * (1 - t); g += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(9 * s)}" fill="#FFD27A" opacity=".25"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(2.8 * s)}" fill="#FFF0C0"/>`; }
  }
  return g;
}

function lantern(x, y, len, s) {
  return `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x)}" y2="${f(y + len)}" stroke="${C.agold}" stroke-width="${f(2 * s)}"/>
  <circle cx="${f(x)}" cy="${f(y + len + 40 * s)}" r="${f(80 * s)}" fill="url(#fireglow)" opacity=".55"/>
  <path d="M${f(x)},${f(y + len)} L${f(x + 22 * s)},${f(y + len + 18 * s)} L${f(x + 22 * s)},${f(y + len + 62 * s)} L${f(x)},${f(y + len + 84 * s)} L${f(x - 22 * s)},${f(y + len + 62 * s)} L${f(x - 22 * s)},${f(y + len + 18 * s)} Z" fill="#FFCB6B" stroke="${C.gold}" stroke-width="${f(3 * s)}"/>
  <path d="M${f(x - 22 * s)},${f(y + len + 18 * s)} L${f(x + 22 * s)},${f(y + len + 62 * s)} M${f(x + 22 * s)},${f(y + len + 18 * s)} L${f(x - 22 * s)},${f(y + len + 62 * s)} M${f(x)},${f(y + len)} V${f(y + len + 84 * s)}" stroke="${C.gold}" stroke-width="${f(1.5 * s)}"/>
  <path d="M${f(x - 30 * s)},${f(y + len + 18 * s)} Q${f(x)},${f(y + len - 14 * s)} ${f(x + 30 * s)},${f(y + len + 18 * s)} Z" fill="url(#goldbar)"/>
  <circle cx="${f(x)}" cy="${f(y + len + 92 * s)}" r="${f(5 * s)}" fill="${C.red}"/>`;
}

/* ---------- full-screen scenes ---------- */
function heroScene(W, H) {
  const portrait = H > W, s = portrait ? 1.0 : .78;
  const base = H * (portrait ? .8 : .8), horizon = base - 40 * s;
  let b = sky(W, H, horizon, horizon - H * .12);
  b += birds(W * .62, H * .2, s * 1.3, 7, 2) + birds(W * .2, H * .28, s, 5, 5);
  b += hills(W, horizon - 10, H * .07, '#E3BC8E', 11, true) + hills(W, horizon + 12, H * .045, '#D9A980', 23, false);
  const cx = W / 2;
  b += wing(cx - W * .62, base, W * .34, 150 * s, s) + wing(cx + W * .28, base, W * .34, 150 * s, s);
  b += wing(cx - W * .34, base, W * .1, 200 * s, s, '#F0C6A6') + wing(cx + W * .24, base, W * .1, 200 * s, s, '#F0C6A6');
  b += chhatri(cx - W * .29, base - 200 * s - 8 * s, s * 1.1) + chhatri(cx + W * .29, base - 200 * s - 8 * s, s * 1.1);
  b += chhatri(cx - W * .42, base - 150 * s - 8 * s, s) + chhatri(cx + W * .42, base - 150 * s - 8 * s, s);
  b += hawaMahal(cx, base, s);
  // courtyard, reflecting pool, cypress
  b += `<rect x="0" y="${f(base)}" width="${W}" height="${f(H - base)}" fill="#E9D0A0"/>`;
  b += `<clipPath id="pool"><path d="M${f(cx - W * .3)},${H} L${f(cx + W * .3)},${H} L${f(cx + W * .12)},${f(base + 8)} L${f(cx - W * .12)},${f(base + 8)} Z"/></clipPath>`;
  b += `<g clip-path="url(#pool)"><rect x="0" y="${f(base)}" width="${W}" height="${f(H - base)}" fill="#8DB4AC"/><g transform="translate(0 ${f(2 * base + 8)}) scale(1 -1)" opacity=".38">${hawaMahal(cx, base, s)}</g>`;
  for (let k = 0; k < 6; k++) b += `<line x1="0" y1="${f(base + 20 + k * (H - base) / 6)}" x2="${W}" y2="${f(base + 20 + k * (H - base) / 6)}" stroke="#fff" stroke-width="1.5" opacity=".25"/>`;
  b += `</g>`;
  b += `<path d="M${f(cx - W * .3)},${H} L${f(cx - W * .12)},${f(base + 8)} M${f(cx + W * .3)},${H} L${f(cx + W * .12)},${f(base + 8)}" stroke="${C.cream}" stroke-width="${f(8 * s)}"/>`;
  for (let k = 0; k < 4; k++) { const t = k / 3, y = base + 10 + (H - base) * t * .8, h = (80 + 110 * t) * s, off = W * (.14 + .2 * t); b += cypress(cx - off - 30 * s, y + h * .1, h) + cypress(cx + off + 30 * s, y + h * .1, h); }
  b += jharokhaFrame(W, H, portrait ? 1.25 : 1.1, portrait);
  b += peacock(W * (portrait ? .2 : .2), H - 40 * (portrait ? 1.25 : 1.1), portrait ? 1.1 : 1.0, true, 3) + peacock(W * (portrait ? .8 : .8), H - 40 * (portrait ? 1.25 : 1.1), portrait ? 1.1 : 1.0, false, 4);
  return doc(W, H, b);
}

function ganeshScene(W, H) {
  const portrait = H > W, s = portrait ? 1.2 : 1;
  let b = `<rect width="${W}" height="${H}" fill="${C.ivory}"/>`;
  b += `<rect width="${W}" height="${H}" fill="url(#jaali)" opacity=".7"/>`;
  b += mandala(W / 2, H * .52, Math.min(W, H) * .46, C.agold, .35);
  const ax = W / 2 - Math.min(W * .4, H * .42), aw = 2 * Math.min(W * .4, H * .42);
  b += `<path d="${archPath(ax, H * .1, aw, H * .84, 6)}" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".7"/>`;
  b += `<path d="${archPath(ax + 16, H * .1 + 14, aw - 32, H * .84 - 14, 6)}" fill="none" stroke="${C.agold}" stroke-width="1.4" stroke-dasharray="3 6" opacity=".8"/>`;
  b += toran(W, 0, portrait ? 4 : 7, s);
  for (const fx of portrait ? [.08, .92] : [.12, .2, .8, .88]) b += bell(W * fx, 40 * s, (portrait ? 160 : 120) * s * (fx < .15 || fx > .85 ? 1 : .6), s);
  b += `<rect x="0" y="${f(H - 60 * s)}" width="${W}" height="${f(60 * s)}" fill="url(#floral)" opacity=".95"/><rect x="0" y="${f(H - 64 * s)}" width="${W}" height="${f(5 * s)}" fill="url(#goldbar)"/>`;
  for (const fx of portrait ? [.1, .9] : [.08, .16, .84, .92]) b += diya(W * fx, H - 72 * s, s * 1.4);
  return doc(W, H, b);
}

function inviteScene(W, H) {
  const portrait = H > W;
  let b = `<rect width="${W}" height="${H}" fill="url(#floral)"/>`;
  b += `<rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
  if (!portrait) {
    for (const side of [0, 1]) {
      const px = side ? W - 300 : 0, pw = 300;
      let p = `<rect x="${px}" y="0" width="${pw}" height="${H}" fill="${C.navy}"/>`;
      p += `<rect x="${px + 14}" y="14" width="${pw - 28}" height="${H - 28}" fill="none" stroke="${C.agold}" stroke-width="3"/>`;
      for (let k = 0; k < 3; k++) {
        const cy = 60 + k * (H - 80) / 3, ch = (H - 80) / 3 - 20;
        p += `<clipPath id="pc${side}${k}"><path d="${archPath(px + 34, cy, pw - 68, ch, 4)}"/></clipPath>`;
        p += `<g clip-path="url(#pc${side}${k})"><rect x="${px}" y="${cy}" width="${pw}" height="${ch}" fill="#F7D9A8"/><circle cx="${px + pw / 2}" cy="${cy + ch * .55}" r="${ch * .5}" fill="url(#glow)"/>`;
        if (k === 1) p += peacock(px + pw / 2 + (side ? -30 : 30), cy + ch - 34, .9, !side, k + side * 7) + `<rect x="${px}" y="${cy + ch - 20}" width="${pw}" height="20" fill="${C.sand}"/>`;
        else p += hills(W, cy + ch * .7, 40, '#DDB287', k + 3, false).replace(`M0,`, `M0,`) + hawaMahal(px + pw / 2, cy + ch - 10, .36) + chhatri(px + 40, cy + ch - 10, .6) + chhatri(px + pw - 40, cy + ch - 10, .6) + `<rect x="${px}" y="${cy + ch - 12}" width="${pw}" height="12" fill="#8DB4AC"/>`;
        p += `</g><path d="${archPath(px + 34, cy, pw - 68, ch, 4)}" fill="none" stroke="url(#goldbar)" stroke-width="7"/>`;
      }
      b += p;
    }
  }
  return doc(W, H, b);
}

function coupleScene(W, H) {
  const portrait = H > W, s = portrait ? 1.3 : 1;
  let b = `<rect width="${W}" height="${H}" fill="#0B2B1F"/><rect width="${W}" height="${H}" fill="url(#jaali)"/>`;
  const n = portrait ? 3 : 6, aw = W / n;
  for (let k = 0; k < n; k++) b += `<path d="${archPath(k * aw + aw * .12, H * .14, aw * .76, H * .86, 5)}" fill="#4A0F18" opacity=".55" stroke="${C.agold}" stroke-width="2" stroke-opacity=".45"/>`;
  b += `<rect x="0" y="0" width="${W}" height="${f(44 * s)}" fill="url(#floral)"/><rect x="0" y="${f(44 * s)}" width="${W}" height="${f(6 * s)}" fill="url(#goldbar)"/>`;
  for (let k = 0; k < (portrait ? 4 : 7); k++) { const fx = (k + .5) / (portrait ? 4 : 7); b += lantern(W * fx, 50 * s, (k % 2 ? 60 : 110) * s, s * .9); }
  b += `<rect x="0" y="${f(H - 70 * s)}" width="${W}" height="${f(70 * s)}" fill="url(#floral)"/><rect x="0" y="${f(H - 76 * s)}" width="${W}" height="${f(6 * s)}" fill="url(#goldbar)"/>`;
  b += `<rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
  return doc(W, H, b);
}

function countdownScene(W, H) {
  const portrait = H > W, s = portrait ? 1.0 : .85;
  const base = H * .94;
  let b = `<linearGradient id="cdsky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${C.ivory}"/><stop offset=".6" stop-color="#F8E6C2"/><stop offset="1" stop-color="#F0C48E"/></linearGradient><rect width="${W}" height="${H}" fill="url(#cdsky)"/>`;
  b += mandala(W / 2, H * .38, Math.min(W, H) * .42, C.agold, .22);
  b += `<circle cx="${W / 2}" cy="${f(base - 200 * s)}" r="${f(Math.min(W, H) * .5)}" fill="url(#glow)" opacity=".7"/>`;
  b += hills(W, base - 120 * s, 80 * s, '#E2B48A', 31, true);
  const cx = W / 2;
  let sil = wing(cx - W * .55, base, W * .3, 130 * s, s, '#B65A47', '#7A2E25', '#5A1C18') + wing(cx + W * .25, base, W * .3, 130 * s, s, '#B65A47', '#7A2E25', '#5A1C18');
  sil += chhatri(cx - W * .33, base - 138 * s, s * 1.2, '#C66A52', '#B65A47', '#7A2E25') + chhatri(cx + W * .33, base - 138 * s, s * 1.2, '#C66A52', '#B65A47', '#7A2E25');
  b += sil + hawaMahal(cx, base, s * .9);
  b += `<rect x="0" y="${f(base)}" width="${W}" height="${f(H - base)}" fill="${C.maroon}"/><rect x="0" y="${f(base)}" width="${W}" height="${f(5)}" fill="url(#goldbar)"/>`;
  b += toran(W, 0, portrait ? 4 : 8, s * 1.1);
  return doc(W, H, b);
}

function venueScene(W, H) {
  const portrait = H > W, s = portrait ? 1.25 : 1;
  const base = portrait ? H * .56 : H * .86;
  const cx = portrait ? W / 2 : W * .66;
  let b = `<linearGradient id="night" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1F1630"/><stop offset=".6" stop-color="#43223A"/><stop offset="1" stop-color="#7A3A3A"/></linearGradient><rect width="${W}" height="${H}" fill="url(#night)"/>`;
  const r = rng(77); for (let i = 0; i < 140; i++) b += `<circle cx="${f(r() * W)}" cy="${f(r() * base * .7)}" r="${f(.6 + r() * 1.6)}" fill="#FFF4D6" opacity="${f(.3 + r() * .7)}"/>`;
  b += `<circle cx="${f(W * .15)}" cy="${f(H * .12)}" r="${f(48 * s)}" fill="#FFF1C9"/><circle cx="${f(W * .15 + 20 * s)}" cy="${f(H * .12 - 10 * s)}" r="${f(44 * s)}" fill="#24182F"/>`;
  b += hills(W, base - 90 * s, 70 * s, '#2E1F33', 41, false);
  for (let k = 0; k < 14; k++) { const x = (k + .5) * W / 14, h = (120 + r() * 120) * s; b += `<ellipse cx="${f(x)}" cy="${f(base - h * .55)}" rx="${f(h * .45)}" ry="${f(h * .55)}" fill="#1E2A1C"/>`; for (let j = 0; j < 14; j++) b += `<circle cx="${f(x + (r() - .5) * h * .8)}" cy="${f(base - h * .55 + (r() - .5) * h * .9)}" r="${f(2.2 * s)}" fill="#FFE29A" opacity=".85"/>`; }
  b += `<rect x="0" y="${f(base)}" width="${W}" height="${f(H - base)}" fill="#2F3A22"/>`;
  b += `<path d="M${f(cx - 60 * s)},${f(base)} L${f(cx + 60 * s)},${f(base)} L${f(cx + 260 * s)},${H} L${f(cx - 260 * s)},${H} Z" fill="#C8473F" opacity=".85"/>`;
  for (let i = 0; i < 90; i++) { const t = r(), y = base + (H - base) * t, half = (60 + 200 * t) * s; b += `<circle cx="${f(cx + (r() - .5) * 2 * half)}" cy="${f(y)}" r="${f(2 + 3 * t)}" fill="${r() > .5 ? C.mari2 : '#FFF0E0'}"/>`; }
  for (let k = 1; k <= 5; k++) { const t = k / 5, y = base + (H - base) * t * .9, off = (90 + 230 * t) * s; b += diya(cx - off, y, s * (.6 + t * .7)) + diya(cx + off, y, s * (.6 + t * .7)); }
  b += mandap(cx, base + 10 * s, s * (portrait ? 1.05 : 1.15));
  b += stringLights(W, 0, portrait ? 3 : 6, s, 9);
  return doc(W, H, b);
}

function tile(name, w, h, body) { save(name, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${DEFS}</defs>${body}</svg>`); }

/* ---------- write files ---------- */
const L = [1920, 1080], P = [1080, 1920];
save('hero-landscape-green.svg', heroScene(...L)); save('hero-portrait-green.svg', heroScene(...P));
save('ganesh-landscape-green.svg', ganeshScene(...L)); save('ganesh-portrait-green.svg', ganeshScene(...P));
save('invite-landscape-green.svg', inviteScene(...L)); save('invite-portrait-green.svg', inviteScene(...P));
save('couple-landscape-green.svg', coupleScene(...L)); save('couple-portrait-green.svg', coupleScene(...P));
save('countdown-landscape-green.svg', countdownScene(...L)); save('countdown-portrait-green.svg', countdownScene(...P));
save('venue-landscape-green.svg', venueScene(...L)); save('venue-portrait-green.svg', venueScene(...P));
save('ganesha.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" width="600" height="780">${ganeshaArt()}</svg>`);
save('groom.svg', framedPortrait(groomArt(), 'g'));
save('bride.svg', framedPortrait(brideArt(), 'b'));
tile('tile-floral.svg', 90, 90, `<rect width="90" height="90" fill="url(#floral)"/>`);
tile('tile-jaali.svg', 56, 56, `<rect width="56" height="56" fill="${C.ivory}"/><rect width="56" height="56" fill="url(#jaali)"/>`);
tile('tile-carve.svg', 64, 64, `<rect width="64" height="64" fill="url(#carve)"/>`);
save('mandap.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 520" width="700" height="520"><defs>${DEFS}</defs>${mandap(350, 500, 1.15)}</svg>`);
save('peacock-feather.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 420" width="120" height="420">
<path d="M60,410 C58,300 62,200 60,90" stroke="#8C6A30" stroke-width="3" fill="none"/>
${Array.from({ length: 34 }, (_, i) => { const y = 120 + i * 8.5, l = 34 - Math.abs(i - 10) * .6; return `<path d="M60,${y} q${-l * .6},-6 ${-l},${-14}" stroke="#4C7A3A" stroke-width="1.2" fill="none" opacity=".85"/><path d="M60,${y} q${l * .6},-6 ${l},${-14}" stroke="#4C7A3A" stroke-width="1.2" fill="none" opacity=".85"/>`; }).join('')}
<ellipse cx="60" cy="80" rx="44" ry="62" fill="#5E8A3A" opacity=".85"/><ellipse cx="60" cy="84" rx="32" ry="44" fill="#C9A24A"/><ellipse cx="60" cy="88" rx="24" ry="32" fill="#1F6F78"/><ellipse cx="60" cy="94" rx="14" ry="18" fill="#1B3F73"/><ellipse cx="60" cy="98" rx="6" ry="8" fill="#120d30"/>
</svg>`);
console.log('done');
