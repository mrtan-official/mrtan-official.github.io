'use strict';

const PROMPT_HTML =
  `<span class="pu">kali</span>` +
  `<span class="pa">@</span>` +
  `<span class="ph">Mr-Tan</span>` +
  `<span class="ps">:</span>` +
  `<span class="pd">~</span>` +
  `<span class="pk">$</span> `;

const BOOT = [
  { t: 'Last login: ' + new Date().toDateString() + ' on ttys001',          d: 0   },
  { t: '',                                                                    d: 60  },
  { t: 'whoami',                                                             d: 300, cmd: true },
  { t: 'mrtan',                                                              d: 40  },
  { t: '',                                                                    d: 30  },
  { t: 'cat .profile',                                                       d: 260, cmd: true },
  { t: '<span class="tc">NAME</span>      Abu Tanim <span class="tl">(Mr. Tan)</span>',         d: 40 },
  { t: '<span class="tc">ROLE</span>      Cybersecurity Researcher',                            d: 40 },
  { t: '<span class="tc">STACK</span>     Python · Nmap · Wireshark · Kali · LLM APIs',        d: 40 },
  { t: '<span class="tc">FOCUS</span>     Zero Trust · VAPT · OSINT · AI Security',            d: 40 },
  { t: '<span class="tc">LOCATION</span>  Chittagong, Bangladesh',                              d: 40 },
  { t: '',                                                                    d: 50  },
  { t: 'ls tools/',                                                          d: 260, cmd: true },
  { t: '<span class="tc">shizuka-ai</span>        <span class="tc">zero-trust-framework</span>  <span class="tc">nmapeasy-cli</span>', d: 40 },
  { t: '<span class="tc">ip-geo-tool</span>       <span class="tc">forensics-toolkit</span>',   d: 40 },
  { t: '',                                                                    d: 50  },
  { t: 'echo $STATUS',                                                       d: 240, cmd: true },
  { t: '<span class="tg">available_for_collaboration</span>',                d: 40  },
  { t: '',                                                                    d: 40  },
  { t: '<span class="tl">type <span class="tw">help</span> for available commands</span>',      d: 0   },
  { t: '',                                                                    d: 0   },
];

const COMMANDS = {
  help: () => [
    '<span class="tl">NAME             DESCRIPTION</span>',
    '<span class="tl">-----------      --------------------------</span>',
    '<span class="tg">about</span>            who is Mr. Tan',
    '<span class="tg">skills</span>           technical capabilities',
    '<span class="tg">projects</span>         active & research tools',
    '<span class="tg">contact</span>          get in touch',
    '<span class="tg">cv</span>               open resume / CV',
    '<span class="tg">whoami</span>           current user',
    '<span class="tg">ls tools/</span>        list all tools',
    '<span class="tg">clear</span>            clear terminal',
    '',
  ],

  whoami: () => ['mrtan'],

  'ls tools/': () => [
    '<span class="tc">shizuka-ai</span>        <span class="tc">zero-trust-framework</span>  <span class="tc">nmapeasy-cli</span>',
    '<span class="tc">ip-geo-tool</span>       <span class="tc">forensics-toolkit</span>',
  ],

  ls: () => [
    '<span class="tc">about.html</span>  <span class="tc">skills.html</span>  <span class="tc">projects.html</span>  <span class="tc">contact.html</span>  <span class="tc">tools/</span>',
  ],

  about:    () => { go('about.html');    return ['<span class="tl">navigating...</span>']; },
  skills:   () => { go('skills.html');   return ['<span class="tl">navigating...</span>']; },
  projects: () => { go('projects.html'); return ['<span class="tl">navigating...</span>']; },
  contact:  () => { go('contact.html');  return ['<span class="tl">navigating...</span>']; },

  cv: () => {
    setTimeout(() => window.open('assets/files/mrtan-cv.pdf', '_blank'), 350);
    return [
      'opening <span class="tw">assets/files/mrtan-cv.pdf</span>...',
    ];
  },

  pwd:   () => ['/home/mrtan/portfolio'],
  date:  () => [new Date().toString()],
  uname: () => ['Linux Mr-Tan 6.1.0-kali9 x86_64 GNU/Linux'],
  sudo:  () => ['<span class="twn">mrtan is not in the sudoers file. This incident will be reported.</span>'],
  echo:  (args) => [args.join(' ')],

  clear: () => {
    const o = document.getElementById('t-output');
    if (o) o.innerHTML = '';
    return [];
  },
};

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function go(page) {
  setTimeout(() => { window.location.href = page; }, 500);
}

function addLine(out, html, isCmd) {
  const div = document.createElement('div');
  div.className = 'tline';
  div.innerHTML = isCmd ? PROMPT_HTML + '<span class="tw">' + html + '</span>' : (html === '' ? '&nbsp;' : html);
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  const out   = document.getElementById('t-output');
  const row   = document.getElementById('t-prompt');
  const input = document.getElementById('t-input');
  if (!out || !row || !input) return;

  let acc = 0;
  BOOT.forEach(line => {
    acc += line.d;
    setTimeout(() => addLine(out, line.t, line.cmd || false), acc);
  });
  setTimeout(() => { row.classList.add('show'); input.focus(); }, acc + 300);

  const hist = [];
  let hi = -1;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';
      hi = -1;
      if (!raw) return;
      hist.unshift(raw); if (hist.length > 60) hist.pop();

      addLine(out, esc(raw), true);

      // handle args
      const parts = raw.toLowerCase().split(/\s+/);
      const cmd   = parts[0];
      const args  = parts.slice(1);

      // try full string first (e.g. "ls tools/")
      const fullKey = raw.toLowerCase();
      const fn = COMMANDS[fullKey] || COMMANDS[cmd];

      const lines = fn
        ? fn(args)
        : [
            '<span class="twn">command not found: ' + esc(cmd) + '</span>',
            '<span class="tl">type <span class="tw">help</span> to list commands</span>',
          ];

      if (lines && lines.length) lines.forEach(l => addLine(out, l, false));
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

  out.addEventListener('click', () => input.focus());
});
