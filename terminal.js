'use strict';
/* ── TERMINAL.JS — home page only ── */

const PROMPT = `<span class="p-user">kali</span><span class="p-at">㉿</span><span class="p-host">Mr-Tan</span><span class="p-sep">:</span><span class="p-dir">~</span><span class="p-dollar">$</span>&nbsp;`;

const BOOT = [
  { html: '', delay: 0 },
  { html: '<span class="t-dim">┌──────────────────────────────────────────┐</span>', delay: 80 },
  { html: '<span class="t-dim">│</span>  <span class="t-cyan">INITIALIZING SECURE SESSION</span>             <span class="t-dim">│</span>', delay: 60 },
  { html: '<span class="t-dim">└──────────────────────────────────────────┘</span>', delay: 60 },
  { html: '', delay: 50 },
  { html: 'whoami', delay: 200, cmd: true },
  { html: '<span class="t-white">Abu Tanim</span> <span class="t-dim">// Mr. Tan</span>', delay: 40 },
  { html: '', delay: 30 },
  { html: 'cat identity.json', delay: 220, cmd: true },
  { html: '<span class="t-dim">{</span>', delay: 40 },
  { html: '  <span class="t-cyan">"role"</span>     <span class="t-dim">:</span> <span class="t-white">"Cybersecurity Researcher"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"stack"</span>    <span class="t-dim">:</span> <span class="t-white">"Python · Networks · AI Security"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"location"</span> <span class="t-dim">:</span> <span class="t-white">"Chittagong, Bangladesh"</span><span class="t-dim">,</span>', delay: 40 },
  { html: '  <span class="t-cyan">"status"</span>   <span class="t-dim">:</span> <span class="t-green">"available"</span>', delay: 40 },
  { html: '<span class="t-dim">}</span>', delay: 30 },
  { html: '', delay: 50 },
  { html: './check_systems.sh', delay: 200, cmd: true },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Zero Trust Framework   <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> OSINT Toolkit          <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Shizuka AI             <span class="t-green">online</span>', delay: 55 },
  { html: '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> NmapEasy CLI           <span class="t-green">online</span>', delay: 55 },
  { html: '', delay: 60 },
  { html: '<span class="t-green">Session ready.</span> <span class="t-dim">Type</span> <span class="t-white">help</span> <span class="t-dim">for commands. Try</span> <span class="t-white">cv</span> <span class="t-dim">to download my resume.</span>', delay: 0 },
  { html: '', delay: 0 },
];

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const COMMANDS = {
  help: () => [
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '<span class="t-cyan">COMMANDS</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '  <span class="t-green">about</span>      <span class="t-dim">→</span> <span class="t-label">navigate to about page</span>',
    '  <span class="t-green">skills</span>     <span class="t-dim">→</span> <span class="t-label">view capabilities</span>',
    '  <span class="t-green">projects</span>   <span class="t-dim">→</span> <span class="t-label">browse projects</span>',
    '  <span class="t-green">contact</span>    <span class="t-dim">→</span> <span class="t-label">get in touch</span>',
    '  <span class="t-green">whoami</span>     <span class="t-dim">→</span> <span class="t-label">current identity</span>',
    '  <span class="t-green">ls</span>         <span class="t-dim">→</span> <span class="t-label">list pages</span>',
    '  <span class="t-green">cv</span>         <span class="t-dim">→</span> <span class="t-label">download my CV / resume</span>',
    '  <span class="t-green">clear</span>      <span class="t-dim">→</span> <span class="t-label">clear terminal</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
  ],
  whoami: () => [
    '<span class="t-white">Abu Tanim</span> <span class="t-dim">(Mr. Tan)</span>',
    '<span class="t-dim">Cybersecurity Researcher · Python Developer</span>',
    '<span class="t-dim">Premier University, CSE — Chittagong, BD</span>',
  ],
  about:    () => { nav('about.html');    return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">about.html</span>']; },
  skills:   () => { nav('skills.html');   return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">skills.html</span>']; },
  projects: () => { nav('projects.html'); return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">projects.html</span>']; },
  contact:  () => { nav('contact.html');  return ['<span class="t-green">→</span> <span class="t-dim">Opening</span> <span class="t-white">contact.html</span>']; },
  ls:       () => ['<span class="t-cyan">about.html</span>  <span class="t-cyan">skills.html</span>  <span class="t-cyan">projects.html</span>  <span class="t-cyan">contact.html</span>'],
  pwd:      () => ['<span class="t-white">/home/mrtan/portfolio</span>'],
  date:     () => [`<span class="t-white">${new Date().toUTCString()}</span>`],
  uname:    () => ['<span class="t-white">Kali GNU/Linux 2025.1 x86_64</span>'],
  sudo:     () => ['<span class="t-warn">mrtan is not in the sudoers file. This incident will be reported.</span>'],
  clear:    () => { document.getElementById('terminal-output').innerHTML = ''; return []; },
  cv:       () => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = 'https://mrtan-official.github.io/assets/files/mrtan-cv.pdf';
      a.download = 'MrTan-CV.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 400);
    return [
      '<span class="t-green">→</span> <span class="t-dim">Fetching</span> <span class="t-white">mrtan-cv.pdf</span> <span class="t-dim">from GitHub...</span>',
      '<span class="t-dim">[</span><span class="t-green">✔</span><span class="t-dim">]</span> Download started — <span class="t-white">mrtan-cv.pdf</span>',
    ];
  },
};

function nav(page) {
  setTimeout(() => { window.location.href = page; }, 600);
}

function appendLine(out, html, isCmd = false) {
  const d = document.createElement('div');
  d.innerHTML = isCmd ? `${PROMPT}<span class="t-white">${html}</span>` : html;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  const out   = document.getElementById('terminal-output');
  const row   = document.getElementById('prompt-row');
  const input = document.getElementById('terminal-input');
  if (!out || !row || !input) return;

  // Boot sequence
  let delay = 0;
  BOOT.forEach(line => {
    delay += line.delay;
    setTimeout(() => appendLine(out, line.html, line.cmd || false), delay);
  });
  setTimeout(() => { row.classList.add('visible'); input.focus(); }, delay + 250);

  // History
  const history = [];
  let histIdx = -1;

  // Input handler
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';
      if (!val) return;
      history.unshift(val); if (history.length > 40) history.pop();
      histIdx = -1;
      appendLine(out, esc(val), true);
      const [cmd] = val.toLowerCase().split(/\s+/);
      const fn = COMMANDS[cmd];
      const lines = fn ? fn() : [`<span class="t-warn">bash: ${esc(cmd)}: command not found</span>`, '<span class="t-dim">Type <span class="t-white">help</span> for available commands.</span>'];
      if (lines && lines.length) lines.forEach(l => appendLine(out, l));
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
