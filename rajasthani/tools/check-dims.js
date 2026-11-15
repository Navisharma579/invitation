const fs = require('fs');
const path = require('path');

function getJpegDimensions(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) break;
    let marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
    }
    let length = buffer.readUInt16BE(i + 2);
    i += 2 + length;
  }
  return null;
}

const files = ['IMG-20261115-WA0000.jpg', 'IMG-20261115-WA0001.jpg', 'IMG-20261115-WA0002.jpg'];
files.forEach(f => {
  const buf = fs.readFileSync(path.join('C:', 'Users', 'navar', 'Downloads', f));
  console.log(f, getJpegDimensions(buf));
});
