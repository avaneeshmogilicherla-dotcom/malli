/**
 * malli — Jasmine Petal Physics Engine
 * Normalized, serene jasmine petal flow across the entire website.
 */
class PetalEngine {
  constructor(id) {
    this.canvas = document.getElementById(id);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.dust = [];
    this.maxP = window.innerWidth < 768 ? 20 : 34;
    this.maxD = window.innerWidth < 768 ? 25 : 45;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Uniform initial distribution across the entire viewport
    for (let i = 0; i < this.maxP; i++) this.petals.push(this.newPetal(true));
    for (let i = 0; i < this.maxD; i++) this.dust.push(this.newDust(true));
    this.tick();
  }

  resize() {
    this.W = this.canvas.width = window.innerWidth;
    this.H = this.canvas.height = window.innerHeight;
  }

  newPetal(rnd = false) {
    const gold = Math.random() < 0.14;
    return {
      x: Math.random() * (this.W || 1200),
      y: rnd ? Math.random() * (this.H || 800) : -(Math.random() * 30 + 15),
      sz: Math.random() * 8 + 8, // 8px to 16px delicate size
      asp: Math.random() * 0.35 + 0.6,
      ang: Math.random() * Math.PI * 2,
      dAng: (Math.random() - 0.5) * 0.015,
      flip: Math.random() * Math.PI,
      dFlip: Math.random() * 0.014 + 0.008,
      vx: (Math.random() - 0.5) * 0.35 + 0.1, // gentle uniform drift
      vy: Math.random() * 0.45 + 0.65, // normalized steady fall speed
      op: Math.random() * 0.35 + 0.45,
      gold,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.012 + 0.008,
      amp: Math.random() * 0.35 + 0.2, // subtle, natural horizontal sway
    };
  }

  newDust(rnd = false) {
    return {
      x: Math.random() * (this.W || 1200),
      y: rnd ? Math.random() * (this.H || 800) : -8,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.2 + 0.05,
      vy: Math.random() * 0.25 + 0.25,
      op: Math.random() * 0.45 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      dPulse: Math.random() * 0.02 + 0.01,
    };
  }

  // Click burst removed as requested - kept as safe no-op
  burst() {}

  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.ang);
    ctx.scale(Math.sin(p.flip), p.asp);

    const s = p.sz;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.62, -s * 0.55, s * 0.78, s * 0.22, 0, s);
    ctx.bezierCurveTo(-s * 0.78, s * 0.22, -s * 0.62, -s * 0.55, 0, -s);
    ctx.closePath();

    const g = ctx.createRadialGradient(0, -s * 0.15, 1, 0, s * 0.4, s);
    if (p.gold) {
      g.addColorStop(0, `rgba(252,238,198,${p.op})`);
      g.addColorStop(0.5, `rgba(219,188,113,${p.op * 0.85})`);
      g.addColorStop(1, `rgba(180,134,55,${p.op * 0.55})`);
    } else {
      g.addColorStop(0, `rgba(255,255,255,${p.op})`);
      g.addColorStop(0.6, `rgba(248,243,234,${p.op * 0.88})`);
      g.addColorStop(1, `rgba(232,218,195,${p.op * 0.6})`);
    }
    ctx.fillStyle = g;
    ctx.fill();

    // Subtle vein
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.8);
    ctx.quadraticCurveTo(s * 0.06, 0, 0, s * 0.8);
    ctx.strokeStyle = `rgba(210,195,170,${p.op * 0.25})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.restore();
  }

  drawDust(d) {
    const alpha = (Math.sin(d.pulse) * 0.25 + 0.75) * d.op;
    this.ctx.beginPath();
    this.ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(219,176,106,${alpha})`;
    this.ctx.shadowBlur = 4;
    this.ctx.shadowColor = `rgba(219,176,106,0.4)`;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  tick() {
    this.ctx.clearRect(0, 0, this.W, this.H);

    // Dust particles
    for (let i = 0; i < this.dust.length; i++) {
      const d = this.dust[i];
      d.pulse += d.dPulse;
      d.x += d.vx + Math.sin(d.pulse) * 0.2;
      d.y += d.vy;
      if (d.y > this.H + 10 || d.x < -10 || d.x > this.W + 10) {
        this.dust[i] = this.newDust(false);
      } else {
        this.drawDust(d);
      }
    }

    // Normalized Petal Flow
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.phase += p.freq;
      p.flip += p.dFlip;
      p.ang += p.dAng;

      // Steady, organic downward flow with gentle breeze sway
      p.x += p.vx + Math.sin(p.phase) * p.amp;
      p.y += p.vy;

      // Respawn smoothly when exiting screen
      if (p.y > this.H + 30 || p.x < -40 || p.x > this.W + 40) {
        this.petals[i] = this.newPetal(false);
      } else {
        this.drawPetal(p);
      }
    }

    requestAnimationFrame(() => this.tick());
  }
}

window.PetalEngine = PetalEngine;
