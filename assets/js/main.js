/**
 * malli — Main Controller
 * Cursor, preloader, scroll reveal, header,
 * room-select pills, reservation boarding pass.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Petal Engine ──────────────────────────────────────────
  if (window.PetalEngine) new window.PetalEngine('petal-canvas');

  // ── Preloader ─────────────────────────────────────────────
  const pre = document.getElementById('preloader');
  const dismiss = () => pre?.classList.add('out');
  window.addEventListener('load', () => setTimeout(dismiss, 900));
  setTimeout(dismiss, 2600);

  // ── Minimalist Luxury Gold Arrow Cursor ───────────────────
  const pointer = document.getElementById('cur-pointer');
  const ripple  = document.getElementById('cur-ripple');

  if (pointer && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let mx = -100, my = -100;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      pointer.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-2px, -2px)`;
    }, { passive: true });

    window.addEventListener('mousedown', e => {
      pointer.classList.add('clicking');
      if (ripple) {
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top  = `${e.clientY}px`;
        ripple.classList.remove('active');
        void ripple.offsetWidth;
        ripple.classList.add('active');
      }
    });

    window.addEventListener('mouseup', () => {
      pointer.classList.remove('clicking');
    });

    const interactiveSelectors = 'a, button, input, select, textarea, .room-card, .room-select-pill, .room-panel, .rpill, [role="button"]';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => pointer.classList.add('hover'));
      el.addEventListener('mouseleave', () => pointer.classList.remove('hover'));
    });
  }

  // ── Header Scroll State ────────────────────────────────────
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Scroll Reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ── Hero 3D Emblem Tilt ────────────────────────────────────
  const heroEmblem = document.querySelector('.hero-emblem');
  const heroSec = document.querySelector('.hero');
  if (heroEmblem && heroSec) {
    heroSec.addEventListener('mousemove', e => {
      const r = heroSec.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 22;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -22;
      heroEmblem.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`;
    });
    heroSec.addEventListener('mouseleave', () => {
      heroEmblem.style.transform = '';
    });
  }

  // ── Room Selection Pills (Reservation Form) ────────────────
  const pills = document.querySelectorAll('.room-select-pill');
  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(pp => pp.classList.remove('active'));
      p.classList.add('active');
    });
  });

  // ── Reservation Form → Boarding Pass ──────────────────────
  const form = document.getElementById('res-form');
  const backdrop = document.getElementById('pass-backdrop');
  const passClose = document.getElementById('pass-close');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const date  = form.querySelector('#res-date')?.value  || '—';
      const time  = form.querySelector('#res-time')?.value  || '—';
      const guests = form.querySelector('#res-guests')?.value || '—';
      const room  = document.querySelector('.room-select-pill.active')?.dataset.room || 'Jasmine';
      const ref   = 'ML-' + String(Math.floor(1000 + Math.random() * 9000));

      document.getElementById('p-ref').textContent    = ref;
      document.getElementById('p-date').textContent   = date;
      document.getElementById('p-time').textContent   = time;
      document.getElementById('p-guests').textContent = guests;
      document.getElementById('p-room').textContent   = room + ' Room';

      backdrop.classList.add('open');
    });
  }

  const closePass = () => backdrop?.classList.remove('open');
  passClose?.addEventListener('click', closePass);
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) closePass(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closePass(); });

  // ── Mobile nav toggle ──────────────────────────────────────
  const ham = document.querySelector('.nav-ham');
  const navEl = document.querySelector('nav');
  if (ham && navEl) {
    ham.addEventListener('click', () => {
      const open = navEl.style.display === 'flex';
      Object.assign(navEl.style, open
        ? { display: '' }
        : { display: 'flex', position: 'fixed', top: '68px', left: '0', width: '100%', flexDirection: 'column', background: 'rgba(14,9,5,.96)', backdropFilter: 'blur(24px)', padding: '30px 40px', gap: '24px', borderBottom: '1px solid rgba(217,176,106,.18)', zIndex: '999' }
      );
    });
  }
});
