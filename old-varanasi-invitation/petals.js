/**
 * PUSHP VRISHTI - SACRED FLOWER SHOWER ENGINE
 * Simulates gentle drifting Indian wedding marigold and rose petals tumbling through the air,
 * with high-performance 3D rotation, fluttering physics, and interactive flower shower bursts.
 */

(function () {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let petals = [];
  const BASE_PETAL_COUNT = 24;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const PETAL_TYPES = [
    { name: 'marigold-yellow', color: '#ffcc00', shadow: '#e69900', shape: 'marigold' },
    { name: 'marigold-orange', color: '#ff7700', shadow: '#cc5200', shape: 'marigold' },
    { name: 'rose-red', color: '#b31b2c', shadow: '#7a111e', shape: 'rose' },
    { name: 'rose-pink', color: '#f06292', shadow: '#c2185b', shape: 'rose' },
    { name: 'jasmine-white', color: '#fff9e6', shadow: '#edd8b0', shape: 'jasmine' }
  ];

  class Petal {
    constructor(isBurst = false, burstX, burstY) {
      this.reset(isBurst, burstX, burstY);
    }

    reset(isBurst = false, burstX, burstY) {
      this.type = PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)];
      this.scale = 0.6 + Math.random() * 0.7;
      
      if (isBurst) {
        this.x = burstX !== undefined ? burstX + (Math.random() - 0.5) * 120 : Math.random() * width;
        this.y = burstY !== undefined ? burstY : -20;
        this.vy = 2.5 + Math.random() * 4.5;
        this.vx = (Math.random() - 0.5) * 5;
      } else {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1.0 + Math.random() * 1.8;
        this.vx = (Math.random() - 0.5) * 1.2;
      }

      this.rotX = Math.random() * Math.PI;
      this.rotY = Math.random() * Math.PI;
      this.rotZ = Math.random() * Math.PI;
      this.speedRotX = 0.02 + Math.random() * 0.04;
      this.speedRotY = 0.02 + Math.random() * 0.04;
      this.speedRotZ = 0.01 + Math.random() * 0.02;

      this.swaySpeed = 0.02 + Math.random() * 0.03;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.opacity = 0.85 + Math.random() * 0.15;
    }

    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.y * 0.015 + this.swayOffset) * 1.2;

      this.rotX += this.speedRotX;
      this.rotY += this.speedRotY;
      this.rotZ += this.speedRotZ;

      if (this.y > height + 40) {
        this.reset(false);
        this.y = -30;
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      const cosX = Math.cos(this.rotX);
      const cosY = Math.cos(this.rotY);
      ctx.rotate(this.rotZ);
      ctx.scale(this.scale * cosY, this.scale * cosX);

      ctx.globalAlpha = this.opacity;

      if (this.type.shape === 'rose') {
        ctx.fillStyle = this.type.color;
        ctx.beginPath();
        ctx.moveTo(0, 14);
        ctx.bezierCurveTo(-14, 8, -12, -10, 0, -14);
        ctx.bezierCurveTo(12, -10, 14, 8, 0, 14);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = this.type.shadow;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.quadraticCurveTo(-1, 0, 0, -10);
        ctx.stroke();

      } else if (this.type.shape === 'marigold') {
        ctx.fillStyle = this.type.color;
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.quadraticCurveTo(-7, 6, -8, -6);
        ctx.quadraticCurveTo(-4, -14, 0, -12);
        ctx.quadraticCurveTo(4, -14, 8, -6);
        ctx.quadraticCurveTo(7, 6, 0, 12);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = this.type.shadow;
        ctx.beginPath();
        ctx.arc(0, 10, 2.5, 0, Math.PI * 2);
        ctx.fill();

      } else {
        ctx.fillStyle = this.type.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, 4, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < BASE_PETAL_COUNT; i++) {
    petals.push(new Petal(false));
  }

  window.triggerPushpVrishti = function (originX, originY, count = 55) {
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(true, originX !== undefined ? originX : Math.random() * width, originY !== undefined ? originY : -20));
    }
    if (petals.length > 180) {
      petals.splice(0, petals.length - 180);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const showerBtns = document.querySelectorAll('.trigger-petals-btn');
    showerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.triggerPushpVrishti(e.clientX, e.clientY);
      });
    });
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let petal of petals) {
      petal.update();
      petal.draw(ctx);
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
