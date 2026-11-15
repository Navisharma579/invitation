/**
 * SPARROWS FLIGHT SIMULATION ENGINE
 * Renders graceful flying Indian sparrows across the sky with flapping wings,
 * flocking physics, gliding arcs, and interactive mouse responses.
 */

(function () {
  const canvas = document.getElementById('sparrows-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let sparrows = [];
  const SPARROW_COUNT = 9;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Sparrow {
    constructor(startX, startY, direction) {
      this.reset(startX, startY, direction);
    }

    reset(startX, startY, direction) {
      this.dir = direction !== undefined ? direction : (Math.random() > 0.5 ? 1 : -1);
      this.x = startX !== undefined ? startX : (this.dir === 1 ? -60 : width + 60);
      this.y = startY !== undefined ? startY : Math.random() * (height * 0.45) + 30;
      
      this.scale = 0.5 + Math.random() * 0.65;
      this.speed = (1.8 + Math.random() * 2.2) * (this.scale * 1.1);
      this.vy = (Math.random() - 0.5) * 0.6;
      
      this.wingAngle = 0;
      this.wingSpeed = 0.25 + Math.random() * 0.15;
      this.glideTimer = 0;
      this.isGliding = false;
      this.glideDuration = 0;

      this.bodyColor = '#3a2c20';
      this.wingColor = '#241a12';
      this.bellyColor = '#8c7058';
    }

    update() {
      this.x += this.speed * this.dir;

      if (this.glideTimer <= 0) {
        if (Math.random() < 0.02) {
          this.isGliding = true;
          this.glideDuration = 40 + Math.random() * 60;
          this.glideTimer = this.glideDuration;
        } else {
          this.isGliding = false;
        }
      } else {
        this.glideTimer--;
        if (this.glideTimer <= 0) {
          this.isGliding = false;
        }
      }

      if (this.isGliding) {
        this.wingAngle = Math.sin(0.2) * 0.3;
        this.y += Math.sin(this.x * 0.005) * 0.4 + 0.15;
      } else {
        this.wingAngle += this.wingSpeed;
        this.y += Math.sin(this.x * 0.008) * 0.7 + this.vy;
      }

      if (this.dir === 1 && this.x > width + 80) {
        this.reset(-60, undefined, 1);
      } else if (this.dir === -1 && this.x < -80) {
        this.reset(width + 60, undefined, -1);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.dir * this.scale, this.scale);

      const pitch = (this.vy + (this.isGliding ? 0.05 : 0)) * 0.4;
      ctx.rotate(pitch);

      const wingFlap = Math.sin(this.wingAngle);

      // Sparrow Body
      ctx.fillStyle = this.bodyColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Soft Belly
      ctx.fillStyle = this.bellyColor;
      ctx.beginPath();
      ctx.ellipse(2, 2, 9, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sparrow Head
      ctx.fillStyle = this.wingColor;
      ctx.beginPath();
      ctx.arc(12, -2, 5, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.moveTo(16, -3);
      ctx.lineTo(21, -2);
      ctx.lineTo(16, -1);
      ctx.closePath();
      ctx.fill();

      // Tail Feathers
      ctx.fillStyle = this.wingColor;
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-24, -4);
      ctx.lineTo(-20, 0);
      ctx.lineTo(-24, 4);
      ctx.closePath();
      ctx.fill();

      // Golden throat accent
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(8, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Far wing
      ctx.save();
      ctx.translate(-2, -3);
      ctx.scale(1, wingFlap * 0.85);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-6, -18, -14, -22);
      ctx.quadraticCurveTo(-4, -12, 8, -4);
      ctx.closePath();
      ctx.fillStyle = this.wingColor;
      ctx.fill();
      ctx.restore();

      // Near wing
      ctx.save();
      ctx.translate(0, 1);
      ctx.scale(1, wingFlap);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-8, -22, -18, -26);
      ctx.quadraticCurveTo(-5, -14, 10, -3);
      ctx.closePath();
      ctx.fillStyle = this.bodyColor;
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }
  }

  for (let i = 0; i < SPARROW_COUNT; i++) {
    const startX = Math.random() * width;
    const startY = Math.random() * (height * 0.4) + 20;
    const dir = i % 2 === 0 ? 1 : -1;
    sparrows.push(new Sparrow(startX, startY, dir));
  }

  window.addEventListener('click', (e) => {
    if (e.clientY < height * 0.55) {
      sparrows.push(new Sparrow(e.clientX - 40, e.clientY, 1));
      if (sparrows.length > 16) sparrows.shift();
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let sparrow of sparrows) {
      sparrow.update();
      sparrow.draw(ctx);
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
