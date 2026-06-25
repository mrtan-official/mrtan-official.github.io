/* =============================================
   MR. TAN — PORTFOLIO SCRIPT
   Terminal Animation | Interactive Features
   ============================================= */

// ============================================
// 1. TERMINAL TYPEWRITER EFFECT
// ============================================

class TerminalTypewriter {
  constructor(outputElementId, inputElementId, promptRowId) {
    this.output = document.getElementById(outputElementId);
    this.input = document.getElementById(inputElementId);
    this.promptRow = document.getElementById(promptRowId);
    this.speed = 30; // ms per character
    this.isTyping = false;
  }

  async type(text, className = '') {
    this.isTyping = true;
    const span = document.createElement('span');
    if (className) span.className = className;

    for (let char of text) {
      span.textContent += char;
      await this.delay(this.speed);
    }

    this.output.appendChild(span);
    return span;
  }

  async typeBlock(text, className = '') {
    const block = document.createElement('div');
    block.className = 't-block';
    const span = document.createElement('span');
    if (className) span.className = className;

    for (let char of text) {
      span.textContent += char;
      block.appendChild(span.cloneNode(true));
      span.textContent = '';
      await this.delay(this.speed);
    }

    this.output.appendChild(block);
    return block;
  }

  async newLine() {
    const br = document.createElement('div');
    br.className = 't-block';
    this.output.appendChild(br);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sequence(commands) {
    for (let cmd of commands) {
      if (cmd.type === 'line') {
        await this.typeBlock(cmd.text, cmd.class || '');
        await this.delay(100);
      } else if (cmd.type === 'prompt') {
        await this.typeBlock(cmd.text, 't-label');
        await this.delay(150);
      } else if (cmd.type === 'pause') {
        await this.delay(cmd.duration || 500);
      } else if (cmd.type === 'newline') {
        await this.newLine();
      }
    }
    this.isTyping = false;
    this.promptRow.classList.add('visible');
    this.input.focus();
  }

  clear() {
    this.output.innerHTML = '';
  }
}

// ============================================
// 2. INITIALIZATION SEQUENCE
// ============================================

const terminal = new TerminalTypewriter('terminal-output', 'terminal-input', 'terminal-prompt-row');

window.addEventListener('DOMContentLoaded', () => {
  runInitializationSequence();
  setupNavigation();
  setupCommandPrompt();
  setupScrollAnimations();
  setupMobileMenu();
});

async function runInitializationSequence() {
  const commands = [
    { type: 'newline' },
    { type: 'prompt', text: '> System Initialization Started...' },
    { type: 'pause', duration: 400 },
    { type: 'newline' },
    { type: 'line', text: '⚙️  Loading system components...' },
    { type: 'pause', duration: 600 },
    { type: 'line', text: '✓ Kernel: Linux 6.2.1' },
    { type: 'line', text: '✓ Shell: Zsh 5.9' },
    { type: 'line', text: '✓ Database: Connected' },
    { type: 'pause', duration: 400 },
    { type: 'newline' },
    { type: 'prompt', text: '> User Authentication...' },
    { type: 'pause', duration: 500 },
    { type: 'line', text: '✓ User: ', class: 't-label' },
    { type: 'pause', duration: 300 },
    { type: 'newline' },
    { type: 'line', text: '>>> Abu Tanim (Mr. Tan)', class: 't-green' },
    { type: 'pause', duration: 400 },
    { type: 'newline' },
    { type: 'prompt', text: '> Profile Loaded' },
    { type: 'pause', duration: 300 },
    { type: 'line', text: '✓ Role: Cybersecurity Researcher & Python Developer', class: 't-white' },
    { type: 'line', text: '✓ Status: ONLINE 🟢', class: 't-green' },
    { type: 'line', text: '✓ Location: Chittagong, Bangladesh', class: 't-cyan' },
    { type: 'pause', duration: 400 },
    { type: 'newline' },
    { type: 'prompt', text: '> Security Status' },
    { type: 'pause', duration: 300 },
    { type: 'line', text: '✓ Firewall: ACTIVE', class: 't-green' },
    { type: 'line', text: '✓ Encryption: AES-256', class: 't-green' },
    { type: 'line', text: '✓ Threat Level: MINIMAL', class: 't-green' },
    { type: 'pause', duration: 400 },
    { type: 'newline' },
    { type: 'prompt', text: '> Ready for Collaboration' },
    { type: 'pause', duration: 300 },
    { type: 'line', text: 'Type "help" to explore available commands.', class: 't-dim' },
    { type: 'pause', duration: 200 },
  ];

  await terminal.sequence(commands);
}

// ============================================
// 3. COMMAND PROMPT HANDLER
// ============================================

const COMMANDS = {
  help: {
    description: 'Display available commands',
    action: () => `
Available Commands:
  help        — Show this message
  about       — Learn about Mr. Tan
  projects    — View featured projects
  skills      — Check skill set
  contact     — Get in touch
  cv          — Download resume (PDF)
  github      — Visit GitHub profile
  clear       — Clear terminal
  easter      — Unlock hidden message 🎯
    `.trim(),
  },

  about: {
    description: 'Display about information',
    action: () => `
ABOUT ME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Abu Tanim (Mr. Tan)
Cybersecurity Researcher & Python Developer
Premier University, Chittagong | CSE Student

EXPERTISE:
  → Zero Trust Architecture
  → Network Security & Penetration Testing
  → Vulnerability Assessment & VAPT
  → AI-driven Automation & Threat Intelligence
  → Python Development & CLI Tools
  → Digital Forensics & Incident Response

PHILOSOPHY:
"Security is not a destination—it's a continuous 
process of learning, adapting, and building 
resilient systems."

Current Focus: Zero Trust implementation, 
Advanced threat modeling, AI-augmented security.
    `.trim(),
  },

  projects: {
    description: 'List featured projects',
    action: () => `
FEATURED PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[01] Shizuka AI
    AI-powered threat intelligence assistant
    Tech: Python | LLM API | NLP | OSINT
    Status: ● Active Development
    
[02] Zero Trust Security Framework
    Modular ZTNA implementation for SMBs
    Tech: Python | IAM | mTLS | Micro-segmentation
    Status: ● Active Development

[03] NmapEasy CLI
    Menu-driven Nmap wrapper with 14+ scan profiles
    Tech: Python | Nmap | Rich CLI | ANSI
    Status: ● Production Ready

[04] IP Geolocation Intel Tool
    Multi-source IP intelligence & geolocation
    Tech: Python | Rich | ip-api | REST
    Status: ● In Development

[05] Digital Forensics Toolkit
    Evidence collection & incident response automation
    Tech: Python | Forensics | IR | Log Analysis
    Status: ● Research Phase

View detailed project info at: ~/projects section
    `.trim(),
  },

  skills: {
    description: 'Display skill set',
    action: () => `
SKILL SET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛡️  NETWORK SECURITY
    Nmap | Wireshark | Metasploit | Burp Suite
    Penetration Testing | Traffic Analysis | IDS/IPS

🔒 ZERO TRUST ARCHITECTURE
    IAM | MFA | ZTNA | mTLS
    Identity-centric Security | Micro-segmentation

🐍 PYTHON DEVELOPMENT
    Python | Scapy | Rich | FastAPI
    CLI Tools | Automation | Scripting

🤖 AI-DRIVEN AUTOMATION
    ML | NLP | SIEM Integration | LLM APIs
    Anomaly Detection | Threat Intelligence

🔍 VULNERABILITY ASSESSMENT
    OWASP | CVE Research | OSINT | Kali Linux
    Exploit Development | Attack Surface Analysis

🌐 OSINT & FORENSICS
    Shodan | Maltego | theHarvester | ip-api
    Digital Forensics | Incident Response
    `.trim(),
  },

  contact: {
    description: 'Get contact information',
    action: () => `
GET IN TOUCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Have a security challenge or research idea?
I'm always open to collaboration and discussion.

📧 Email:    contact@mrtan.dev
🔗 GitHub:   github.com/mrtan-official
💼 LinkedIn: linkedin.com/in/mrtan-official
🐦 Twitter:  @mrtan_security
📍 Location: Chittagong, Bangladesh

Response time: Usually within 24 hours
Preferred: Security-related inquiries & collaboration
    `.trim(),
  },

  cv: {
    description: 'Download resume/CV',
    action: () => {
      window.open('assets/files/mrtan-cv.pdf', '_blank');
      return '📄 Downloading resume... (CV-Abu-Tanim.pdf)';
    },
  },

  github: {
    description: 'Open GitHub profile',
    action: () => {
      window.open('https://github.com/mrtan-official', '_blank');
      return '🔗 Opening GitHub profile in new tab...';
    },
  },

  clear: {
    description: 'Clear terminal output',
    action: () => {
      terminal.clear();
      terminal.promptRow.classList.remove('visible');
      return null; // Don't display output
    },
  },

  easter: {
    description: 'Unlock hidden message',
    action: () => `
🎯 EASTER EGG UNLOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"In the silence of the digital, we build fortresses.
In the chaos of the network, we find peace.
Security is not about fear—it's about freedom."

— Mr. Tan

P.S. You're now part of the inner circle. 
Welcome to the matrix. 🟢
    `.trim(),
  },
};

function setupCommandPrompt() {
  const input = document.getElementById('terminal-input');

  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';

      if (terminal.isTyping) return;

      // Display user command
      const cmdDisplay = document.createElement('div');
      cmdDisplay.className = 't-block';
      cmdDisplay.innerHTML = `<span class="t-label">mrtan@kali:~$ </span><span class="t-white">${command}</span>`;
      terminal.output.appendChild(cmdDisplay);

      await terminal.newLine();

      // Execute command
      if (COMMANDS[command]) {
        const result = COMMANDS[command].action();
        if (result) {
          const output = document.createElement('div');
          output.className = 't-block t-white';
          output.textContent = result;
          terminal.output.appendChild(output);
        }
      } else if (command === '') {
        // Do nothing on empty command
      } else {
        const error = document.createElement('div');
        error.className = 't-block t-warn';
        error.textContent = `Command not found: "${command}" | Type "help" for available commands`;
        terminal.output.appendChild(error);
      }

      await terminal.newLine();

      // Scroll to bottom
      terminal.output.parentElement.scrollTop = terminal.output.parentElement.scrollHeight;
    }
  });
}

// ============================================
// 4. NAVIGATION
// ============================================

function setupNavigation() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (target.startsWith('#')) {
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          closeMobileMenu();
        }
      }
    });
  });
}

// ============================================
// 5. MOBILE MENU
// ============================================

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
}

// ============================================
// 6. SCROLL REVEAL ANIMATIONS
// ============================================

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal class to elements
  document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ============================================
// 7. ACCESSIBILITY & KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Focus terminal input with '/'
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    const input = document.getElementById('terminal-input');
    if (input) input.focus();
  }

  // Close mobile menu with Escape
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

// ============================================
// 8. PREFERS REDUCED MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  terminal.speed = 10; // Much faster if user prefers reduced motion
}

// ============================================
// 9. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// 10. EASTER EGG KONAMI CODE
// ============================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiMode() {
  document.body.style.filter = 'hue-rotate(360deg)';
  setTimeout(() => {
    document.body.style.filter = 'none';
  }, 2000);

  const input = document.getElementById('terminal-input');
  if (input) {
    input.value = 'easter';
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  }
}

console.log('%c🟢 Mr. Tan Portfolio Loaded', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cType "help" in the terminal to explore | Konami Code: ↑↑↓↓←→←→BA', 'color: #00b4d8; font-size: 12px;');
