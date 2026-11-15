/**
 * RIVER GANGA DYNAMIC CANVAS
 * Simulates flowing water, traditional wooden rowboats with animated oars and boatmen,
 * drifting sacred floating diyas with flickering flames, and sparkling water ripples.
 */

(function () {
  const canvas = document.getElementById('river-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  }
  setTimeout(resize, 100);
  setTimeout(resize, 500);

  // Time ticker
  let t = 0;

  // Boats collection
  class RiverBoat {
    constructor(x, y, scale, speed, dir, passengers = 1) {
      this.x = x;
      this.y = y;
      this.scale = scale;
      this.speed = speed;
      this.dir = dir; // 1 = right, -1 = left
      this.passengers = passengers; // 1 = boatman, 2 = boatman + devotee, 3 = royal couple + boatman
      this.oarAngle = 0;
      this.bobOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speed * this.dir;
      this.oarAngle += 0.05;
      
      // Screen wrap
      if (this.dir === 1 && this.x > width + 120 * this.scale) {
        this.x = -120 * this.scale;
        this.y = height * 0.3 + Math.random() * (height * 0.5);
      } else if (this.dir === -1 && this.x < -120 * this.scale) {
        this.x = width + 120 * this.scale;
        this.y = height * 0.3 + Math.random() * (height * 0.5);
      }
    }

    draw(ctx, isNight) {
      ctx.save();
      const bob = Math.sin(t * 0.03 + this.bobOffset) * 3;
      const rock = Math.cos(t * 0.02 + this.bobOffset) * 0.04;
      
      ctx.translate(this.x, this.y + bob);
      ctx.scale(this.scale * this.dir, this.scale);
      ctx.rotate(rock);

      // Water Ripple wake behind boat
      ctx.strokeStyle = isNight ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(-30, 8, 25, 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Boat Shadow
      ctx.fillStyle = 'rgba(10, 25, 35, 0.3)';
      ctx.beginPath();
      ctx.ellipse(0, 10, 48, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Boat Hull (traditional wooden carved Ganga bajra/dinghy)
      ctx.fillStyle = isNight ? '#1e140d' : '#4a2c18';
      ctx.beginPath();
      ctx.moveTo(-50, 0);
      ctx.quadraticCurveTo(-45, 12, 0, 13);
      ctx.quadraticCurveTo(45, 12, 52, -2);
      ctx.quadraticCurveTo(35, 3, 0, 3);
      ctx.quadraticCurveTo(-35, 3, -50, 0);
      ctx.closePath();
      ctx.fill();

      // Wooden Trim / Planks
      ctx.strokeStyle = isNight ? '#3a2717' : '#784725';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-45, 4);
      ctx.quadraticCurveTo(0, 7, 45, 2);
      ctx.stroke();

      // --- PASSENGERS & BOATMEN (MOVING PERSONS) ---
      // Boatman at stern rowing
      ctx.fillStyle = isNight ? '#181210' : '#2d2218';
      ctx.beginPath();
      ctx.ellipse(14, -6, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Boatman head with traditional safa
      ctx.beginPath();
      ctx.arc(15, -16, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isNight ? '#ffb300' : '#d43d1a';
      ctx.beginPath();
      ctx.ellipse(15, -18, 5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Passenger 1 (Devotee or Bride)
      if (this.passengers >= 2) {
        // Red / Gold traditional saree lehenga silhouette
        ctx.fillStyle = isNight ? '#7a1c1d' : '#aa3838';
        ctx.beginPath();
        ctx.ellipse(-12, -5, 5, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isNight ? '#181210' : '#2d2218';
        ctx.beginPath();
        ctx.arc(-12, -14, 4, 0, Math.PI * 2);
        ctx.fill();
        // Golden chunri / dupatta
        ctx.fillStyle = '#e5a722';
        ctx.beginPath();
        ctx.arc(-12, -15, 4.5, Math.PI * 0.8, Math.PI * 1.8);
        ctx.fill();
      }

      // Passenger 2 (Devotee or Groom)
      if (this.passengers >= 3) {
        // Ivory / Gold Kurta
        ctx.fillStyle = isNight ? '#3a2c20' : '#e8d9bf';
        ctx.beginPath();
        ctx.ellipse(-26, -5, 5.5, 7.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isNight ? '#181210' : '#2d2218';
        ctx.beginPath();
        ctx.arc(-26, -15, 4.2, 0, Math.PI * 2);
        ctx.fill();
        // Saffron Safa
        ctx.fillStyle = '#ff9800';
        ctx.beginPath();
        ctx.ellipse(-26, -17, 4.5, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rowing Oar with rhythmic stroke
      const oarStroke = Math.sin(this.oarAngle);
      ctx.save();
      ctx.translate(14, 2);
      ctx.rotate(0.3 + oarStroke * 0.4);
      // Oar shaft
      ctx.strokeStyle = isNight ? '#4e3620' : '#8d5930';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-2, -10);
      ctx.lineTo(8, 22);
      ctx.stroke();
      // Oar blade dipping in water
      ctx.fillStyle = isNight ? '#3b2414' : '#6b4020';
      ctx.beginPath();
      ctx.ellipse(8, 22, 4, 1.5, 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Splash ripple where oar dips
      if (oarStroke > 0.4) {
        ctx.strokeStyle = isNight ? 'rgba(255, 235, 150, 0.4)' : 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(8, 22, 4, 0, Math.PI);
        ctx.stroke();
      }
      ctx.restore();

      // Boat Lantern (glowing softly at night)
      if (isNight) {
        ctx.save();
        ctx.translate(46, -6);
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(0, -6);
        ctx.stroke();
        const grad = ctx.createRadialGradient(0, -6, 1, 0, -6, 16);
        grad.addColorStop(0, 'rgba(255, 220, 120, 0.85)');
        grad.addColorStop(0.5, 'rgba(255, 160, 40, 0.35)');
        grad.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, -6, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -6, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    }
  }

  // Floating Diyas (Sacred leaf bowls with marigolds and oil flames)
  class FloatingDiya {
    constructor() {
      this.reset();
      this.x = Math.random() * (width || 800);
    }

    reset() {
      this.x = width + 20 + Math.random() * 50;
      this.y = (height || 200) * 0.5 + Math.random() * ((height || 200) * 0.42);
      this.speed = 0.35 + Math.random() * 0.5;
      this.scale = 0.55 + (this.y / (height || 200)) * 0.5;
      this.flickerSpeed = 0.1 + Math.random() * 0.1;
      this.bobOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.x -= this.speed;
      if (this.x < -30) {
        this.reset();
      }
    }

    draw(ctx, isNight) {
      ctx.save();
      const bob = Math.sin(t * 0.04 + this.bobOffset) * 2;
      ctx.translate(this.x, this.y + bob);
      ctx.scale(this.scale, this.scale);

      // Water Ripple
      ctx.strokeStyle = isNight ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 3, 12, 3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Leaf boat / Dona
      ctx.fillStyle = '#2b4d24';
      ctx.beginPath();
      ctx.ellipse(0, 2, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Marigold flower rim
      ctx.fillStyle = '#f58220';
      ctx.beginPath();
      ctx.arc(-4, 0, 2.5, 0, Math.PI * 2);
      ctx.arc(4, 0, 2.5, 0, Math.PI * 2);
      ctx.arc(0, 1.5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Golden Clay Diya
      ctx.fillStyle = '#b85d19';
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flickering Flame & Halo
      const flicker = 0.8 + Math.sin(t * this.flickerSpeed) * 0.25;
      
      // Glow halo
      const flameGlow = ctx.createRadialGradient(0, -3, 1, 0, -3, isNight ? 22 : 12);
      flameGlow.addColorStop(0, `rgba(255, 230, 130, ${isNight ? 0.9 : 0.6})`);
      flameGlow.addColorStop(0.5, `rgba(255, 140, 20, ${isNight ? 0.4 : 0.2})`);
      flameGlow.addColorStop(1, 'rgba(255, 90, 0, 0)');
      ctx.fillStyle = flameGlow;
      ctx.beginPath();
      ctx.arc(0, -3, (isNight ? 22 : 12) * flicker, 0, Math.PI * 2);
      ctx.fill();

      // Flame Teardrop
      ctx.fillStyle = '#fff4bd';
      ctx.beginPath();
      ctx.moveTo(-1.5, 0);
      ctx.quadraticCurveTo(-2, -5 * flicker, 0, -8 * flicker);
      ctx.quadraticCurveTo(2, -5 * flicker, 1.5, 0);
      ctx.closePath();
      ctx.fill();

      // Water flame reflection
      ctx.fillStyle = `rgba(255, 190, 40, ${isNight ? 0.4 : 0.15})`;
      ctx.beginPath();
      ctx.ellipse(0, 6, 6, 2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Populate scene with boats carrying boatmen and passengers
  const boats = [
    new RiverBoat(80, 50, 0.85, 0.45, 1, 1),
    new RiverBoat(380, 95, 1.1, 0.55, -1, 3), // Boat carrying royal couple + boatman!
    new RiverBoat(620, 65, 0.75, 0.35, 1, 2)  // Boat carrying devotee + boatman!
  ];

  const diyas = [];
  for (let i = 0; i < 14; i++) {
    diyas.push(new FloatingDiya());
  }

  function render() {
    t++;
    ctx.clearRect(0, 0, width, height);

    const isNight = document.body.classList.contains('night-mode');

    // Subtle water surface shimmer lines
    ctx.strokeStyle = isNight ? 'rgba(255, 215, 0, 0.08)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const lineY = (height * 0.4) + (i * 22) + Math.sin(t * 0.02 + i) * 3;
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      for (let x = 0; x < width; x += 40) {
        const wave = Math.sin(x * 0.03 + t * 0.04 + i) * 2;
        ctx.lineTo(x, lineY + wave);
      }
      ctx.stroke();
    }

    // Update and draw floating diyas (deep background)
    for (let i = 0; i < diyas.length / 2; i++) {
      diyas[i].update();
      diyas[i].draw(ctx, isNight);
    }

    // Update and draw boats
    for (let boat of boats) {
      boat.update();
      boat.draw(ctx, isNight);
    }

    // Update and draw foreground diyas
    for (let i = Math.floor(diyas.length / 2); i < diyas.length; i++) {
      diyas[i].update();
      diyas[i].draw(ctx, isNight);
    }

    requestAnimationFrame(render);
  }

  render();
})();
