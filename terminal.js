'use strict';
/* ── TERMINAL.JS — Mr. Tan Home ── */

/* prompt HTML — reused for echoing commands */
const PROMPT_HTML =
  `<span class="pu">kali</span>` +
  `<span class="pa">&#x1F311;</span>` +
  `<span class="ph">Mr-Tan</span>` +
  `<span class="ps">:</span>` +
  `<span class="pd">~</span>` +
  `<span class="pk">$</span>&nbsp;`;

/* ── BOOT SEQUENCE ── */
const BOOT = [
  { t:'',                                                                    d:0   },
  { t:'<span class="tl">whoami</span>',                                      d:180, cmd:true },
  { t:'<span class="tw">Abu Tanim</span> <span class="tl">// Mr. Tan</span>', d:40  },
  { t:'',                                                                    d:30  },
  { t:'<span class="tl">cat identity.json</span>',                           d:220, cmd:true },
  { t:'<span class="tl">{</span>',                                            d:35  },
  { t:'  <span class="tc">"role"</span>     <span class="tl">:</span> <span class="tw">"Cybersecurity Researcher"</span><span class="tl">,</span>', d:40 },
  { t:'  <span class="tc">"stack"</span>    <span class="tl">:</span> <span class="tw">"Python · Networks · AI Security"</span><span class="tl">,</span>', d:40 },
  { t:'  <span class="tc">"location"</span> <span class="tl">:</span> <span class="tw">"Chittagong, Bangladesh"</span><span class="tl">,</span>', d:40 },
  { t:'  <span class="tc">"status"</span>   <span class="tl">:</span> <span class="tg">"available"</span>', d:40 },
  { t:'<span class="tl">}</span>',                                             d:30  },
  { t:'',                                                                    d:50  },
  { t:'<span class="tl">./check_systems.sh</span>',                          d:200, cmd:true },
  { t:'<span class="tl">[</span><span class="tg">&#10003;</span><span class="tl">]</span>  Zero Trust Framework   <span class="tg">online</span>', d:60 },
  { t:'<span class="tl">[</span><span class="tg">&#10003;</span><span class="tl">]</span>  OSINT Toolkit          <span class="tg">online</span>', d:60 },
  { t:'<span class="tl">[</span><span class="tg">&#10003;</span><span class="tl">]</span>  Shizuka AI             <span class="tg">online</span>', d:60 },
  { t:'<span class="tl">[</span><span class="tg">&#10003;</span><span class="tl">]</span>  NmapEasy CLI           <span class="tg">online</span>', d:60 },
  { t:'',                                                                    d:55  },
  { t:'<span class="tg">Session ready.</span> <span class="tl">Type</span> <span class="tw">help</span> <span class="tl">for available commands.</span>', d:0 },
  { t:'',                                                                    d:0   },
];

/* ── COMMANDS ── */
const COMMANDS = {
  help: () => [
    '<span class="tl">--------------------------------------------</span>',
    '<span class="tc">AVAILABLE COMMANDS</span>',
    '<span class="tl">--------------------------------------------</span>',
    '  <span class="tg">about</span>      <span class="tl">--</span>  <span class="tl">who is Mr. Tan</span>',
    '  <span class="tg">skills</span>     <span class="tl">--</span>  <span class="tl">technical capabilities</span>',
    '  <span class="tg">projects</span>   <span class="tl">--</span>  <span class="tl">active &amp; research projects</span>',
    '  <span class="tg">contact</span>    <span class="tl">--</span>  <span class="tl">get in touch</span>',
    '  <span class="tg">cv</span>         <span class="tl">--</span>  <span class="tl">open my resume / CV</span>',
    '  <span class="tg">whoami</span>     <span class="tl">--</span>  <span class="tl">current identity</span>',
    '  <span class="tg">ls</span>         <span class="tl">--</span>  <span class="tl">list pages</span>',
    '  <span class="tg">clear</span>      <span class="tl">--</span>  <span class="tl">clear terminal</span>',
    '<span class="tl">--------------------------------------------</span>',
  ],

  whoami: () => [
    '<span class="tw">Abu Tanim</span> <span class="tl">(Mr. Tan)</span>',
    '<span class="tl">Cybersecurity Researcher · Python Developer</span>',
    '<span class="tl">Premier University CSE — Chittagong, BD</span>',
  ],

  about:    () => { go('about.html');    return ['<span class="tg">-&gt;</span> <span class="tl">navigating to</span> <span class="tw">about</span>']; },
  skills:   () => { go('skills.html');   return ['<span class="tg">-&gt;</span> <span class="tl">navigating to</span> <span class="tw">skills</span>']; },
  projects: () => { go('projects.html'); return ['<span class="tg">-&gt;</span> <span class="tl">navigating to</span> <span class="tw">projects</span>']; },
  contact:  () => { go('contact.html');  return ['<span class="tg">-&gt;</span> <span class="tl">navigating to</span> <span class="tw">contact</span>']; },

  cv: () => {
    setTimeout(() => window.open('assets/files/mrtan-cv.pdf', '_blank'), 350);
    return [
      '<span class="tl">accessing</span> <span class="tw">assets/files/mrtan-cv.pdf</span>',
      '<span class="tl">[</span><span class="tg">&#10003;</span><span class="tl">]</span>  opening CV in new tab...',
    ];
  },

  ls:    () => ['<span class="tc">about.html</span>  <span class="tc">skills.html</span>  <span class="tc">projects.html</span>  <span class="tc">contact.html</span>'],
  pwd:   () => ['<span class="tw">/home/mrtan/portfolio</span>'],
  date:  () => [`<span class="tw">${new Date().toUTCString()}</span>`],
  uname: () => ['<span class="tw">Kali GNU/Linux 2025.1 x86_64</span>'],
  sudo:  () => ['<span class="twn">mrtan is not in the sudoers file. This incident will be reported.</span>'],

  clear: () => {
    const o = document.getElementById('t-output');
    if (o) o.innerHTML = '';
    return [];
  },
};

/* ── HELPERS ── */
const esc = s => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function go(page) {
  setTimeout(() => { window.location.href = page; }, 600);
}

function addLine(out, html, isCmd) {
  const div = document.createElement('div');
  if (isCmd) {
    div.innerHTML = PROMPT_HTML + '<span class="tw">' + html + '</span>';
  } else {
    div.innerHTML = html;
  }
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const out   = document.getElementById('t-output');
  const row   = document.getElementById('t-prompt');
  const input = document.getElementById('t-input');
  if (!out || !row || !input) return;

  /* boot */
  let acc = 0;
  BOOT.forEach(line => {
    acc += line.d;
    setTimeout(() => addLine(out, line.t, line.cmd || false), acc);
  });
  setTimeout(() => { row.classList.add('show'); input.focus(); }, acc + 280);

  /* command history */
  const hist = [];
  let hi = -1;

  /* keydown */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';
      hi = -1;
      if (!raw) return;
      hist.unshift(raw);
      if (hist.length > 60) hist.pop();

      addLine(out, esc(raw), true);

      const cmd = raw.toLowerCase().split(/\s+/)[0];
      const fn  = COMMANDS[cmd];
      const out_lines = fn
        ? fn()
        : [
            `<span class="twn">bash: ${esc(cmd)}: command not found</span>`,
            `<span class="tl">type <span class="tw">help</span> to list commands</span>`,
          ];

      if (out_lines && out_lines.length) {
        out_lines.forEach(l => addLine(out, l, false));
      }
      addLine(out, '', false);

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      hi = Math.min(hi + 1, hist.length - 1);
      if (hi >= 0) input.value = hist[hi];

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      hi = Math.max(hi - 1, -1);
      input.value = hi >= 0 ? hist[hi] : '';
    }
  });

  /* click output → focus input */
  out.addEventListener('click', () => input.focus());
});
