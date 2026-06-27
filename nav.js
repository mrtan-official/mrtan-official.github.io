'use strict';
/* ── NAV.JS — shared across all pages ── */

document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.getElementById('nav');
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');
  if (!nav || !btn || !menu) return;

  // Scroll-triggered class
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});
