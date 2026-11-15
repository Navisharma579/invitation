const fs = require('fs');
const path = require('path');

const files = [
  'IMG-20261115-WA0000.jpg',
  'IMG-20261115-WA0001.jpg',
  'IMG-20261115-WA0002.jpg',
  'ChatGPT Image Sep 27, 2026, 10_06_54 PM.png'
];

files.forEach(f => {
  const p = path.join('C:', 'Users', 'navar', 'Downloads', f);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(f, (stat.size / 1024).toFixed(0) + ' KB');
  }
});
