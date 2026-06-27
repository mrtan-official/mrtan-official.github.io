/* =============================================
   MR. TAN — PORTFOLIO SCRIPT v3.0
   Terminal engine · Nav · Scroll reveal
   ============================================= */

'use strict';

/* ─── TERMINAL BOOT SEQUENCE ─────────────────── */

const BOOT_LINES = [
  { text: '',                                                             delay: 0 },
  { text: '<span class="t-dim">┌──────────────────────────────────────────┐</span>', delay: 80 },
  { text: '<span class="t-dim">│</span>  <span class="t-cyan">INITIALIZING SECURE SESSION</span>             <span class="t-dim">│</span>', delay: 60 },
  { text: '<span class="t-dim">└──────────────────────────────────────────┘</span>', delay: 60 },
  { text: '',                                                             delay: 50 },
  { text: '<span class="t-label">whoami</span>',                          delay: 180, isCmd: true },
  { text: '<span class="t-white">Abu Tanim</span> <span class="t-dim">// Mr. Tan</span>', delay: 40 },
  { text: '',                                                             delay: 30 },
  { text: '<span class="t-label">cat identity.json</span>',              delay: 220, isCmd: true },
  { text: '<span class="t-dim">{</span>',                                 delay: 40 },
  { text: '  <span class="t-cyan">"role"</span>     <span class="t-dim">:</span> <span class="t-white">"Cybersecurity Researcher"</span><span class="t-dim">,</span>', delay: 40 },
  { text: '  <span class="t-cyan">"stack"</span>    <span class="t-dim">:</span> <span class="t-white">"Python · Networks · AI Security"</span><span class="t-dim">,</span>', delay: 40 },
  { text: '  <span class="t-cyan">"location"</span> <span class="t-dim">:</span> <span class="t-white">"Chittagong, Bangladesh"</span><span class="t-dim">,</span>', delay: 40 },
  { text: '  <span class="t-cyan">"status"</span>   <span class="t-dim">:</span> <span class="t-green">"available"</span>', delay: 40 },
  { text: '<span class="t-dim">}</span>',                                  delay: 30 },
  { text: '',                                                             delay: 50 },
  { text: '<span class="t-label">./check_systems.sh</span>',             delay: 200, isCmd: true },
  { text: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Zero Trust Framework   <span class="t-green">online</span>', delay: 55 },
  { text: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> OSINT Toolkit          <span class="t-green">online</span>', delay: 55 },
  { text: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Shizuka AI             <span class="t-green">online</span>', delay: 55 },
  { text: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> NmapEasy CLI           <span class="t-green">online</span>', delay: 55 },
  { text: '',                                                             delay: 60 },
  { text: '<span class="t-green">Session ready.</span> <span class="t-dim">Type</span> <span class="t-white">help</span> <span class="t-dim">for available commands.</span>', delay: 0 },
  { text: '',                                                             delay: 0 },
];

const PROMPT_HTML = `<span class="prompt__user">kali</span><span class="prompt__at">㉿</span><span class="prompt__host">Mr-Tan</span><span class="prompt__sep">:</span><span class="prompt__dir">~</span><span class="prompt__dollar">$</span>&nbsp;`;

/* Command definitions */
const COMMANDS = {
  help: () => [
    '<span class="t-dim">─────────────────────────────────────────</span>',
    '<span class="t-cyan">AVAILABLE COMMANDS</span>',
    '<span class="t-dim">─────────────────────────────────────────</span>',
    '  <span class="t-green">about</span>      <span class="t-dim">—</span> <span class="t-label">who is Mr. Tan?</span>',
    '  <span class="t-green">skills</span>     <span class="t-dim">—</span> <span class="t-label">technical capabilities</span>',
    '  <span class="t-green">projects</span>   <span class="t-dim">—</span> <span class="t-label">active & research projects</span>',
    '  <span class="t-green">contact</span>    <span class="t-dim">—</span> <span class="t-label">get in touch</span>',
    '  <span class="t-green">whoami</span>     <span class="t-dim">—</span> <span class="t-label">current user identity</span>',
    '  <span class="t-green">clear</span>      <span class="t-dim">—</span> <span class="t-label">clear terminal output</span>',
    '<span class="t-dim">─────────────────────────────────────────</span>',
  ],

  whoami: () => [
    '<span class="t-white">Abu Tanim</span> <span class="t-dim">(Mr. Tan)</span>',
    '<span class="t-dim">Cybersecurity Researcher · Python Developer</span>',
    '<span class="t-dim">Premier University, CSE — Chittagong, BD</span>',
  ],

  about: () => {
    smoothScrollTo('#about');
    return ['<span class="t-green">→</span> <span class="t-dim">Navigating to</span> <span class="t-white">About</span>'];
  },

  skills: () => {
    smoothScrollTo('#skills');
    return ['<span class="t-green">→</span> <span class="t-dim">Navigating to</span> <span class="t-white">Skills</span>'];
  },

  projects: () => {
    smoothScrollTo('#projects');
    return ['<span class="t-green">→</span> <span class="t-dim">Navigating to</span> <span class="t-white">Projects</span>'];
  },

  contact: () => {
    smoothScrollTo('#contact');
    return ['<span class="t-green">→</span> <span class="t-dim">Navigating to</span> <span class="t-white">Contact</span>'];
  },

  clear: () => {
    const output = document.getElementById('terminal-output');
    if (output) output.innerHTML = '';
    return [];
  },

  ls: () => [
    '<span class="t-cyan">about/</span>   <span class="t-cyan">projects/</span>   <span class="t-cyan">skills/</span>   <span class="t-white">identity.json</span>   <span class="t-white">README.md</span>',
  ],

  pwd: () => ['<span class="t-white">/home/mrtan/portfolio</span>'],

  date: () => [`<span class="t-white">${new Date().toUTCString()}</span>`],

  uname: () => ['<span class="t-white">Kali GNU/Linux 2025.1 x86_64</span>'],

  sudo: (args) => [
    '<span class="t-warn">[sudo] password for mrtan:</span>',
    '<span class="t-warn">mrtan is not in the sudoers file. This incident will be reported.</span>',
  ],
};

/* Unknown command response */
function unknownCmd(cmd) {
  return [
    `<span class="t-warn">bash: ${escHtml(cmd)}: command not found</span>`,
    '<span class="t-dim">Type <span class="t-white">help</span> to list available commands.</span>',
  ];
}

/* ─── UTILITY ─────────────────────────────────── */

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) {
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─── TERMINAL ENGINE ─────────────────────────── */

class Terminal {
  constructor(outputEl, promptRowEl) {
    this.output    = outputEl;
    this.promptRow = promptRowEl;
    this.history   = [];
    this.histIdx   = -1;
    this.booted    = false;
  }

  /** Append a line of HTML to the output */
  appendLine(html, isCmdLine = false) {
    const div = document.createElement('div');
    div.className = isCmdLine ? 'terminal-cmd-line' : 'terminal-response';

    if (isCmdLine) {
      div.innerHTML = `${PROMPT_HTML}<span class="t-white">${html}</span>`;
    } else {
      div.innerHTML = html;
    }

    this.output.appendChild(div);
    this.output.scrollTop = this.output.scrollHeight;
  }

  /** Run the boot animation */
  async boot() {
    let cumDelay = 0;

    for (const line of BOOT_LINES) {
      cumDelay += line.delay;
      await this._schedule(cumDelay, () => {
        this.appendLine(line.text, line.isCmd || false);
      });
    }

    // Show prompt row after boot
    await this._schedule(cumDelay + 200, () => {
      this.promptRow.classList.add('visible');
      this.booted = true;
    });
  }

  _schedule(ms, fn) {
    return new Promise(resolve => {
      setTimeout(() => { fn(); resolve(); }, ms);
    });
  }

  /** Handle user command submission */
  handleCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Echo the command
    this.appendLine(escHtml(trimmed), true);

    // History
    this.history.unshift(trimmed);
    if (this.history.length > 50) this.history.pop();
    this.histIdx = -1;

    // Execute
    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const handler = COMMANDS[cmd];
    const lines = handler ? handler(args) : unknownCmd(cmd);

    if (lines && lines.length) {
      lines.forEach(l => this.appendLine(l));
    }

    this.appendLine(''); // blank spacer
    this.output.scrollTop = this.output.scrollHeight;
  }

  /** Navigate command history */
  historyUp(inputEl) {
    if (this.history.length === 0) return;
    this.histIdx = Math.min(this.histIdx + 1, this.history.length - 1);
    inputEl.value = this.history[this.histIdx];
  }

  historyDown(inputEl) {
    if (this.histIdx <= 0) {
      this.histIdx = -1;
      inputEl.value = '';
      return;
    }
    this.histIdx--;
    inputEl.value = this.history[this.histIdx];
  }
}

/* ─── NAV SCROLL BEHAVIOUR ────────────────────── */

function initNav() {
  const nav  = document.getElementById('nav');
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');

  // Scroll-triggered class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger toggle
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close mobile menu on link click
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ─── SCROLL REVEAL ───────────────────────────── */

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.revealed)')];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 60, 240);

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  reveals.forEach(el => observer.observe(el));
}

/* ─── INIT ────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* Nav */
  initNav();

  /* Terminal */
  const outputEl    = document.getElementById('terminal-output');
  const promptRowEl = document.getElementById('terminal-prompt-row');
  const inputEl     = document.getElementById('terminal-input');

  if (outputEl && promptRowEl && inputEl) {
    const term = new Terminal(outputEl, promptRowEl);
    term.boot();

    /* Input: Enter to run, arrows for history */
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = inputEl.value;
        inputEl.value = '';
        term.handleCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        term.historyUp(inputEl);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        term.historyDown(inputEl);
      }
    });

    /* Click anywhere on terminal body to focus input */
    outputEl.addEventListener('click', () => inputEl.focus());
  }

  /* Scroll reveal */
  initReveal();

});
