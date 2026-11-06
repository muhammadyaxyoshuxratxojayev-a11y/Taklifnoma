// ==========================================================================
// TO'Y TAKLIFNOMASI - ATIRGUL YAPROQLARI VA OLTIN ZARRALAR KANVASI
// ==========================================================================

class PetalsCanvas {
  constructor() {
    this.canvas = document.getElementById("petals-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.petals = [];
    this.particles = [];
    this.maxPetals = 28;
    this.maxParticles = 35;
    this.isRunning = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Boshlang'ich yaproqlar
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    // Oltin porloq zarralar
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createPetal(randomY = false) {
    const colors = [
      { r: 232, g: 180, b: 184 }, // Soft rose
      { r: 247, g: 215, b: 218 }, // Very light blush
      { r: 220, g: 155, b: 165 }, // Romantic pink
      { r: 250, g: 235, b: 215 }  // Ivory petal
    ];
    const c = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      tilt: Math.random() * Math.PI,
      tiltSpeed: Math.random() * 0.03 + 0.01,
      color: c,
      alpha: Math.random() * 0.5 + 0.4
    };
  }

  createParticle(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : Math.random() * this.height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: (Math.random() - 0.5) * 0.02
    };
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Oltin zarralar chizish
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += p.alphaSpeed;

      if (p.alpha <= 0.1 || p.alpha >= 0.8) {
        p.alphaSpeed = -p.alphaSpeed;
      }

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, p.alpha)})`;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = "rgba(255, 230, 150, 0.8)";
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Atirgul yaproqlarini chizish
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.tilt) * 1.2 + p.speedX;
      p.rotation += p.rotSpeed;
      p.tilt += p.tiltSpeed;

      if (p.y > this.height + 30) {
        this.petals[i] = this.createPetal(false);
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.scale(Math.cos(p.tilt), 1);

      // Yaproq shakli
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      this.ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);

      const grad = this.ctx.createLinearGradient(0, 0, 0, p.size);
      grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`);
      grad.addColorStop(1, `rgba(${p.color.r - 20}, ${p.color.g - 30}, ${p.color.b - 20}, ${p.alpha * 0.8})`);

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
      this.ctx.shadowBlur = 4;
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.petalsCanvas = new PetalsCanvas();
});
