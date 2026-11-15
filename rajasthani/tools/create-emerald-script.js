const fs = require('fs');
const path = require('path');

// Read the original gen-art.js
const origPath = path.join(__dirname, 'gen-art.js');
let code = fs.readFileSync(origPath, 'utf8');

// Replace Maroon / Red with Deep Royal Emerald & Forest Jade
code = code.replace(/maroon:\s*'#741F2B'/g, "maroon: '#0E3829'");
code = code.replace(/red:\s*'#9F2638'/g, "red: '#164E39'");
code = code.replace(/win:\s*'#7E3326'/g, "win: '#09251B'");
code = code.replace(/fill="#5E1520"/g, 'fill="#0B2B1F"');
code = code.replace(/fill="#741F2B"/g, 'fill="#0E3829"');
code = code.replace(/stroke="#741F2B"/g, 'stroke="#0E3829"');
code = code.replace(/fill="#9F2638"/g, 'fill="#164E39"');
code = code.replace(/#FFF9E9/g, '#F4F9F6'); // Soft ivory mint

// Change save outputs to *-green.svg
code = code.replace(/save\('hero-landscape\.svg'/g, "save('hero-landscape-green.svg'");
code = code.replace(/save\('hero-portrait\.svg'/g, "save('hero-portrait-green.svg'");
code = code.replace(/save\('ganesh-landscape\.svg'/g, "save('ganesh-landscape-green.svg'");
code = code.replace(/save\('ganesh-portrait\.svg'/g, "save('ganesh-portrait-green.svg'");
code = code.replace(/save\('invite-landscape\.svg'/g, "save('invite-landscape-green.svg'");
code = code.replace(/save\('invite-portrait\.svg'/g, "save('invite-portrait-green.svg'");
code = code.replace(/save\('couple-landscape\.svg'/g, "save('couple-landscape-green.svg'");
code = code.replace(/save\('couple-portrait\.svg'/g, "save('couple-portrait-green.svg'");
code = code.replace(/save\('countdown-landscape\.svg'/g, "save('countdown-landscape-green.svg'");
code = code.replace(/save\('countdown-portrait\.svg'/g, "save('countdown-portrait-green.svg'");
code = code.replace(/save\('venue-landscape\.svg'/g, "save('venue-landscape-green.svg'");
code = code.replace(/save\('venue-portrait\.svg'/g, "save('venue-portrait-green.svg'");

const outScript = path.join(__dirname, 'gen-art-emerald.js');
fs.writeFileSync(outScript, code);
console.log('Written gen-art-emerald.js');
