'use strict';
/* ── TERMINAL.JS — updated with download-cv command ── */

const PROMPT = `<span class="p-user">kali</span><span class="p-at">㉿</span><span class="p-host">Mr-Tan</span><span class="p-sep">:</span><span class="p-dir">~</span><span class="p-dollar">$</span>&nbsp;`;

// ... (BOOT এবং অন্যান্য কনস্ট্যান্ট আগের মতোই থাকবে) ...

const COMMANDS = {
  help: () => [
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '<span class="t-cyan">COMMANDS</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
    '  <span class="t-green">about</span>       <span class="t-dim">→</span> <span class="t-label">navigate to about page</span>',
    '  <span class="t-green">skills</span>      <span class="t-dim">→</span> <span class="t-label">view capabilities</span>',
    '  <span class="t-green">projects</span>    <span class="t-dim">→</span> <span class="t-label">browse projects</span>',
    '  <span class="t-green">contact</span>     <span class="t-dim">→</span> <span class="t-label">get in touch</span>',
    '  <span class="t-green">download-cv</span> <span class="t-dim">→</span> <span class="t-label">download my resume</span>',
    '  <span class="t-green">whoami</span>      <span class="t-dim">→</span> <span class="t-label">current identity</span>',
    '  <span class="t-green">ls</span>          <span class="t-dim">→</span> <span class="t-label">list pages</span>',
    '  <span class="t-green">clear</span>       <span class="t-dim">→</span> <span class="t-label">clear terminal</span>',
    '<span class="t-dim">──────────────────────────────────────────</span>',
  ],
  // নতুন ডাউনলোড কমান্ড
  'download-cv': () => {
    const link = document.createElement('a');
    link.href = 'assets/files/cv-mrtan.pdf'; // আপনার ফাইলের পাথ নিশ্চিত করুন
    link.download = 'Mr_Tan_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return ['<span class="t-green">Initiating download...</span>'];
  },
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

  // History handler
  const history = [];
  let histIdx = -1;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';
      if (!val) return;
      history.unshift(val); 
      if (history.length > 40) history.pop();
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
