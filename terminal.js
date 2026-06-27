'use strict';
/* ── TERMINAL.JS — Enhanced with CV Download System ── */

const PROMPT = `<span class="p-user">kali</span><span class="p-at">㉿</span><span class="p-host">Mr-Tan</span><span class="p-sep">:</span><span class="p-dir">~</span><span class="p-dollar">$</span>&nbsp;`;

/* ── CV DOWNLOAD SYSTEM ── */
const CVSystem = {
  openModal: () => {
    const modal = document.getElementById('cv-modal');
    if (modal) modal.classList.add('active');
  },
  closeModal: () => {
    const modal = document.getElementById('cv-modal');
    if (modal) modal.classList.remove('active');
  },
  sendEmail: () => {
    const email = 'mrtanvai@gmail.com'; // ⚠️ আপনার ইমেইল এখানে আপডেট করুন
    window.location.href = `mailto:${email}?subject=CV Request - Abu Tanim (Mr. Tan)&body=Hello Abu Tanim,%0A%0AI would like to request your CV.%0A%0AThanks!`;
  },
  directDownload: () => {
    const link = document.createElement('a');
    link.href = 'assets/files/mrtan-cv.pdf'; // আপনার CV ফাইলের পাথ
    link.download = 'Abu_Tanim_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/* ── BOOT SEQUENCE ── */
const BOOT = [
  { html: '', delay: 0 },
  { html: '<span class="t-dim">┌──────────────────────────────────────────┐</span>', delay: 80 },
  { html: '<span class="t-dim">│</span>  <span class="t-cyan">INITIALIZING SECURE SESSION</span>             <span class="t-dim">│</span>', delay: 60 },
  { html: '<span class="t-dim">└──────────────────────────────────────────┘</span>', delay: 60 },
  { html: '', delay: 50 },
  { html: '<span class="t-label">whoami</span>', delay: 180, cmd: true },
  { html: '<span class="t-white">Abu Tanim</span> <span class="t-dim">// Mr. Tan</span>', delay: 40 },
  { html: '', delay: 30 },
  { html: '<span class="t-label">cat identity.json</span>', delay: 220, cmd: true },
  { html: '<span class="t-dim">{</span>', delay: 40 },
  { html: '  <span class="t-cyan">"role"</span>     <span class="t-dim">:</span> <span class="t-white">"Cybersecurity Researcher"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"stack"</span>    <span class="t-dim">:</span> <span class="t-white">"Python · Networks · AI Security"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"location"</span> <span class="t-dim">:</span> <span class="t-white">"Chittagong, Bangladesh"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"status"</span>   <span class="t-dim">:</span> <span class="t-green">"available"</span>', delay: 40 },
  { html: '<span class="t-dim">}</span>', delay: 30 },
  { html: '', delay: 50 },
  { html: '<span class="t-label">./check_systems.sh</span>', delay: 200, cmd: true },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Zero Trust Framework   <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> OSINT Toolkit          <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Shizuka AI             <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> NmapEasy CLI           <span class="t-green">online</span>', delay: 55 },
  { html: '', delay: 60 },
  { html: '<span class="t-green">Session ready.</span> <span class="t-dim">Type</span> <span class="t-white">help</span> <span class="t-dim">for available commands.</span>', delay: 0 },
  { html: '', delay: 0 },
];

/* ── COMMAND DEFINITIONS ── */
const COMMANDS = {
  help: () => [
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '<span class="t-cyan">AVAILABLE COMMANDS</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '  <span class="t-green">about</span>       <span class="t-dim">→</span> <span class="t-label">navigate to about page</span>',
    '  <span class="t-green">skills</span>      <span class="t-dim">→</span> <span class="t-label">view your capabilities</span>',
    '  <span class="t-green">projects</span>    <span class="t-dim">→</span> <span class="t-label">browse active projects</span>',
    '  <span class="t-green">contact</span>     <span class="t-dim">→</span> <span class="t-label">get in touch</span>',
    '  <span class="t-green">cv</span>          <span class="t-dim">→</span> <span class="t-label">download CV/Resume</span>',
    '  <span class="t-green">download-cv</span> <span class="t-dim">→</span> <span class="t-label">direct CV download</span>',
    '  <span class="t-green">whoami</span>      <span class="t-dim">→</span> <span class="t-label">current user identity</span>',
    '  <span class="t-green">ls</span>          <span class="t-dim">→</span> <span class="t-label">list available pages</span>',
    '  <span class="t-green">pwd</span>         <span class="t-dim">→</span> <span class="t-label">current directory</span>',
    '  <span class="t-green">date</span>        <span class="t-dim">→</span> <span class="t-label">system date/time</span>',
    '  <span class="t-green">uname</span>       <span class="t-dim">→</span> <span class="t-label">system information</span>',
    '  <span class="t-green">clear</span>       <span class="t-dim">→</span> <span class="t-label">clear terminal</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
  ],

  /* ── CV COMMANDS ── */
  'cv': () => {
    CVSystem.openModal();
    return [
      '<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">CV Download Portal</span>',
      '<span class="t-dim">Select your preferred format...</span>'
    ];
  },

  'resume': () => {
    CVSystem.openModal();
    return [
      '<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">Resume Download Portal</span>',
      '<span class="t-dim">Select your preferred format...</span>'
    ];
  },

  'download-cv': () => {
    CVSystem.directDownload();
    return [
      '<span class="t-green">✔</span> <span class="t-dim">Initiating direct download...</span>',
      '<span class="t-dim">File: Abu_Tanim_CV.pdf</span>'
    ];
  },

  'download': () => {
    CVSystem.openModal();
    return [
      '<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">Download Manager</span>'
    ];
  },

  /* ── NAVIGATION COMMANDS ── */
  whoami: () => [
    '<span class="t-white">Abu Tanim</span> <span class="t-dim">(Mr. Tan)</span>',
    '<span class="t-dim">Cybersecurity Researcher · Python Developer</span>',
    '<span class="t-dim">Premier University, CSE — Chittagong, BD</span>',
  ],

  about:    () => { nav('about.html');    return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">about.html</span>']; },
  skills:   () => { nav('skills.html');   return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">skills.html</span>']; },
  projects: () => { nav('projects.html'); return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">projects.html</span>']; },
  contact:  () => { nav('contact.html');  return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">contact.html</span>']; },

  /* ── FILE SYSTEM COMMANDS ── */
  ls: () => [
    '<span class="t-cyan">about.html</span>  <span class="t-cyan">skills.html</span>  <span class="t-cyan">projects.html</span>  <span class="t-cyan">contact.html</span>  <span class="t-white">mrtan-cv.pdf</span>'
  ],

  pwd: () => [
    '<span class="t-white">/home/mrtan/portfolio</span>'
  ],

  date: () => [
    `<span class="t-white">${new Date().toUTCString()}</span>`
  ],

  uname: () => [
    '<span class="t-white">Kali GNU/Linux 2025.1 x86_64</span>'
  ],

  sudo: () => [
    '<span class="t-warn">[sudo] password for mrtan:</span>',
    '<span class="t-warn">mrtan is not in the sudoers file. This incident will be reported.</span>'
  ],

  clear: () => {
    const out = document.getElementById('terminal-output');
    if (out) out.innerHTML = '';
    return [];
  },

  /* ── SMART HANDLERS ── */
  cat: (args) => {
    if (args && args[0] && (args[0].includes('cv') || args[0].includes('resume'))) {
      CVSystem.openModal();
      return [
        '<span class="t-dim">Attempting to display PDF in terminal...</span>',
        '<span class="t-green">→</span> <span class="t-dim">PDF viewer opened. Use</span> <span class="t-white">cv</span> <span class="t-dim">command instead.</span>'
      ];
    }
    return [
      `<span class="t-warn">cat: ${esc(args ? args.join(' ') : '')}: No such file or directory</span>`
    ];
  },
};

/* ── UTILITY FUNCTIONS ── */

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function nav(page) {
  setTimeout(() => { window.location.href = page; }, 600);
}

function appendLine(out, html, isCmd = false) {
  const d = document.createElement('div');
  d.innerHTML = isCmd ? `${PROMPT}<span class="t-white">${html}</span>` : html;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

/* ── CV MODAL INITIALIZATION ── */
function initCVModal() {
  const modal = document.getElementById('cv-modal');
  const closeBtn = document.getElementById('cv-modal-close');
  const emailBtn = document.getElementById('cv-email-btn');
  const navCVBtn = document.getElementById('nav-cv-btn');

  if (!modal) return;

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      CVSystem.closeModal();
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      CVSystem.closeModal();
    }
  });

  // Email button
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      CVSystem.sendEmail();
    });
  }

  // Nav button
  if (navCVBtn) {
    navCVBtn.addEventListener('click', (e) => {
      e.preventDefault();
      CVSystem.openModal();
    });
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      CVSystem.closeModal();
    }
  });
}

/* ── MAIN INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const out   = document.getElementById('terminal-output');
  const row   = document.getElementById('prompt-row');
  const input = document.getElementById('terminal-input');
  
  if (!out || !row || !input) return;

  // Initialize CV modal
  initCVModal();

  // Boot sequence
  let delay = 0;
  BOOT.forEach(line => {
    delay += line.delay;
    setTimeout(() => appendLine(out, line.html, line.cmd || false), delay);
  });
  
  setTimeout(() => { 
    row.classList.add('visible'); 
    input.focus(); 
  }, delay + 250);

  // History handler
  const history = [];
  let histIdx = -1;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';
      if (!val) return;

      history.unshift(val); 
      if (history.length > 50) history.pop();
      histIdx = -1;

      appendLine(out, esc(val), true);
      
      // Parse command
      const parts = val.toLowerCase().split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);
      const fn = COMMANDS[cmd];
      
      // Execute or show unknown command
      let lines = [];
      if (fn) {
        lines = fn(args);
      } else {
        lines = [
          `<span class="t-warn">bash: ${esc(cmd)}: command not found</span>`,
          '<span class="t-dim">Type <span class="t-white">help</span> for available commands.</span>'
        ];
      }
      
      if (lines && lines.length) {
        lines.forEach(l => appendLine(out, l));
      }
      appendLine(out, '');
      
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      histIdx = Math.min(histIdx + 1, history.length - 1);
      if (histIdx >= 0) input.value = history[histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx = Math.max(histIdx - 1, -1);
      input.value = histIdx >= 0 ? history[histIdx] : '';
    }
  });

  out.addEventListener('click', () => input.focus());
});
