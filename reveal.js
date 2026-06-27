'use strict';
/* ── REVEAL.JS — scroll reveal for all pages ── */

function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.revealed)');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.revealed)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, Math.min(idx * 65, 260));

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => obs.observe(el));
}

// Export so projects.html can call it after dynamic load
window.initReveal = initReveal;

document.addEventListener('DOMContentLoaded', initReveal);
