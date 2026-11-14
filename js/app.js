/**
 * Catteny Web App & DeepWiki Interactive Application Logic
 * Featuring interactive particle canvas, cyber terminal, simulators, and wiki explorer
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initParticleCanvas();
  initMobileDrawer();
  initTerminal();
  initWikiExplorer();
  initSoftwareSimulators();
  initVeyonVisualizer();
  initLabCalculator();
  initFlashingGuide();
  fetchGitHubStats();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("catteny-theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("catteny-theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById("theme-icon-container");
  if (!iconContainer) return;
  if (theme === "light") {
    iconContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    iconContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
}

/* ==========================================================================
   2. Interactive Cyber Constellation Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -1000, y: -1000, radius: 140 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? "rgba(225, 29, 72," : "rgba(255, 51, 102,"
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;

      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + "0.8)";
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse interactivity
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouse.radius) {
        const malpha = (1 - mdist / mouse.radius) * 0.35;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 51, 102, ${malpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-close-btn");
  const drawer = document.getElementById("mobile-drawer");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  if (!drawer) return;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      drawer.classList.add("open");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });
}

/* ==========================================================================
   4. Interactive Terminal Emulator
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById("term-input");
  const terminalBody = document.getElementById("term-body");
  const terminalOutput = document.getElementById("term-output");
  const cmdPills = document.querySelectorAll(".cmd-pill");

  if (!terminalInput || !terminalOutput) return;

  // Print initial greeting & fastfetch
  printToTerminal(getFastfetchOutput());

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = terminalInput.value.trim();
      terminalInput.value = "";
      if (rawCmd) {
        handleCommand(rawCmd);
      }
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  cmdPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const cmd = pill.getAttribute("data-cmd");
      if (cmd) {
        handleCommand(cmd);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  });

  function handleCommand(cmd) {
    const promptLine = `\n<span style="color: #ff3366; font-weight: 700;">[liveuser@catteny ~]$</span> ${escapeHtml(cmd)}\n`;
    terminalOutput.innerHTML += promptLine;

    const lower = cmd.toLowerCase().trim();
    let response = "";

    switch (lower) {
      case "fastfetch":
        response = getFastfetchOutput();
        break;
      case "neofetch":
        response = getNeofetchOutput();
        break;
      case "cat /etc/os-release":
        response = `NAME="Catteny"
PRETTY_NAME="Catteny 0.1"
ID=catteny0.1
ID_LIKE=arch
ANSI_COLOR="38;2;225;29;72"
HOME_URL="https://github.com/Cattens-Roses/Catteny"`;
        break;
      case "uname -a":
        response = `Linux catteny 6.6.32-1-cachyos-bore #1 SMP PREEMPT_DYNAMIC CachyOS x86_64 GNU/Linux`;
        break;
      case "pacman -ss veyon":
        response = `<span style="color:#10b981; font-weight:bold;">extra/veyon</span> 4.8.2-1 [installed]
    Virtual Eye On Networks - Classroom management and computer monitoring software.
<span style="color:#10b981; font-weight:bold;">extra/veyon-plugins</span> 4.8.2-1 [installed]
    Additional plugin suite for Veyon network broadcast.`;
        break;
      case "pacman -r veyon":
      case "sudo pacman -r veyon":
      case "pacman -r veyon-server":
        response = `<span style="color:#f59e0b;">:: Running pre-transaction hooks...</span>
(1/1) Checking Organization Core Component Integrity...
<span style="color:#e11d48; font-weight:bold;">
========================================================
 [SECURITY ALERT] Catteny System Integrity Protection
 Removal of 'veyon' (Organization Bundle) is restricted.
 This machine is enrolled in an educational workstation fleet.
 Contact your system administrator to disenroll.
========================================================
</span>
<span style="color:#e11d48;">error: command failed to execute correctly: /usr/local/bin/org-bundle-guard</span>
<span style="color:#e11d48;">error: failed to commit transaction (hook failed)</span>`;
        break;
      case "catteny-hello":
        response = `Starting Catteny Welcome Hub (/usr/local/bin/catteny-hello)...
[GTK3] Initialized 600x450 dialog with PolicyKit integration.
Tip: Explore the live visual simulator tab below!`;
        break;
      case "ls /profile":
      case "ls profile":
        response = `airootfs/  grub/  packages.x86_64  packages_desktop.x86_64  pacman.conf  profiledef.sh  syslinux/`;
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        return;
      case "help":
        response = `Available commands in Catteny Live Shell:
  <span style="color:#ff3366;">fastfetch</span>            - Display system banner and specs
  <span style="color:#ff3366;">cat /etc/os-release</span>  - View distribution metadata
  <span style="color:#ff3366;">uname -a</span>             - Kernel & scheduler identification
  <span style="color:#ff3366;">pacman -Ss veyon</span>     - Search Organization Bundle package
  <span style="color:#ff3366;">sudo pacman -R veyon</span> - Test system integrity removal guard
  <span style="color:#ff3366;">catteny-hello</span>        - Launch onboarding software assistant
  <span style="color:#ff3366;">ls profile</span>           - Inspect archiso profile directory
  <span style="color:#ff3366;">clear</span>                - Clear the terminal screen`;
        break;
      default:
        response = `<span style="color:#ef4444;">bash: command not found: ${escapeHtml(cmd)}</span>. Type <span style="color:#ff3366;">'help'</span> for a list of commands.`;
    }

    terminalOutput.innerHTML += response + "\n";
  }

  function printToTerminal(text) {
    terminalOutput.innerHTML += text + "\n";
  }
}

function getFastfetchOutput() {
  return `<span style="color: #e11d48; font-weight:bold;">
       /\\         <span style="color:#ff3366;">liveuser</span>@<span style="color:#dc2626;">catteny</span>
      /  \\        ----------------
     /\\   \\       <span style="color:#ff3366;">OS:</span> Catteny 0.1 x86_64 (Arch Linux base)
    /      \\      <span style="color:#ff3366;">Host:</span> Educational Computer Lab Workstation
   /   ,,   \\     <span style="color:#ff3366;">Kernel:</span> 6.6.32-1-cachyos-bore
  /   |  |  -\\    <span style="color:#ff3366;">Uptime:</span> 4 hours, 12 mins
 /_-''    ''-_\\   <span style="color:#ff3366;">Packages:</span> 1,148 (pacman), Veyon active
                  <span style="color:#ff3366;">Shell:</span> bash 5.2.26
                  <span style="color:#ff3366;">DE:</span> KDE Plasma 6.0.4 / XFCE4
                  <span style="color:#ff3366;">WM:</span> KWin (Wayland/X11)
                  <span style="color:#ff3366;">CPU:</span> Multi-core Workstation Processor
                  <span style="color:#ff3366;">Memory:</span> 3.42 GiB / 16.00 GiB (21%)
</span>
<span style="background-color:#000000;">   </span><span style="background-color:#991b1b;">   </span><span style="background-color:#dc2626;">   </span><span style="background-color:#e11d48;">   </span><span style="background-color:#ff3366;">   </span><span style="background-color:#f43f5e;">   </span><span style="background-color:#fb7185;">   </span><span style="background-color:#ffffff;">   </span>`;
}

function getNeofetchOutput() {
  return `<span style="color: #e11d48; font-weight:bold;">  ____      _   _
 / ___|__ _| |_| |_ ___ _ __  _   _
| |   / _\` | __| __/ _ \\ '_ \\| | | |
| |__| (_| | |_| ||  __/ | | | |_| |
 \\____\\__,_|\\__|\\__\\___|_| |_|\\__, |
                              |___/</span>
<span style="color:#e11d48;">liveuser@catteny</span>
----------------
<span style="color:#ff3366;">OS:</span> Catteny 0.1 x86_64
<span style="color:#ff3366;">Kernel:</span> 6.6.arch1-cachyos-bore
<span style="color:#ff3366;">Uptime:</span> 4h 12m
<span style="color:#ff3366;">Packages:</span> 1148 (pacman)
<span style="color:#ff3366;">Shell:</span> bash 5.2.26
<span style="color:#ff3366;">DE:</span> Plasma
<span style="color:#ff3366;">Terminal:</span> Alacritty`;
}

/* ==========================================================================
   5. DeepWiki Documentation Explorer
   ========================================================================== */
function initWikiExplorer() {
  const articlesListEl = document.getElementById("wiki-articles-list");
  const articleContentEl = document.getElementById("wiki-article-content");
  const searchInput = document.getElementById("wiki-search");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!articlesListEl || !articleContentEl) return;

  let currentCategory = "All";
  let searchQuery = "";
  let activeArticleId = WIKI_ARTICLES[0].id;

  renderArticleList();
  renderActiveArticle();

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-cat");
      renderArticleList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderArticleList();
    });
  }

  function renderArticleList() {
    articlesListEl.innerHTML = "";

    const filtered = WIKI_ARTICLES.filter(article => {
      const matchCat = (currentCategory === "All") || (article.category === currentCategory);
      const matchQuery = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery) ||
        article.summary.toLowerCase().includes(searchQuery) ||
        article.category.toLowerCase().includes(searchQuery);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      articlesListEl.innerHTML = `<div style="padding: 1rem; color: var(--text-dim); text-align: center;">No matching wiki articles found.</div>`;
      return;
    }

    filtered.forEach(article => {
      const item = document.createElement("div");
      item.className = `wiki-nav-item ${article.id === activeArticleId ? 'active' : ''}`;
      item.innerHTML = `
        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 210px;">${escapeHtml(article.title)}</span>
        <span style="font-size: 0.72rem; padding: 0.15rem 0.4rem; border-radius: 4px; background: rgba(255,255,255,0.06);">${escapeHtml(article.badge)}</span>
      `;

      item.addEventListener("click", () => {
        activeArticleId = article.id;
        renderArticleList();
        renderActiveArticle();
      });

      articlesListEl.appendChild(item);
    });
  }

  function renderActiveArticle() {
    const article = WIKI_ARTICLES.find(a => a.id === activeArticleId) || WIKI_ARTICLES[0];
    articleContentEl.innerHTML = `
      <div class="article-header">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
          <span class="pill-badge">${escapeHtml(article.category)}</span>
          <span style="font-size: 0.8rem; color: var(--accent-red); font-weight: 700;">DeepWiki Verified</span>
        </div>
        <h1 class="article-title">${escapeHtml(article.title)}</h1>
        <div class="article-meta">
          <span>Read time: ${escapeHtml(article.readTime)}</span>
          <span>•</span>
          <span>Target: Arch Linux mkarchiso</span>
          <span>•</span>
          <a href="https://deepwiki.com/Cattens-Roses/Catteny" target="_blank" rel="noopener">Upstream Wiki &rarr;</a>
        </div>
      </div>
      <div class="article-body">
        <p style="font-size: 1.05rem; color: var(--text-main); font-weight: 500; border-left: 3px solid var(--accent-red); padding-left: 1rem; margin-bottom: 1.5rem;">
          ${escapeHtml(article.summary)}
        </p>
        ${article.content}
      </div>
    `;
  }
}

/* ==========================================================================
   6. Software Hub & Calamares Bundle Simulator
   ========================================================================== */
function initSoftwareSimulators() {
  const tabBtns = document.querySelectorAll(".sim-tab-btn");
  const tabPanels = document.querySelectorAll(".sim-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add("active");
    });
  });

  const catalogGrid = document.getElementById("catalog-grid");
  const selectedCountEl = document.getElementById("selected-pkgs-count");
  const totalDownloadEl = document.getElementById("total-download-size");
  const totalInstallEl = document.getElementById("total-install-size");
  const generatedCmdEl = document.getElementById("generated-pacman-cmd");
  const installBtn = document.getElementById("simulate-install-btn");
  const installProgressBox = document.getElementById("install-progress-box");
  const installProgressBar = document.getElementById("install-progress-bar");
  const installStatusText = document.getElementById("install-status-text");
  const catChips = document.querySelectorAll(".category-chip");

  if (!catalogGrid) return;

  let activeCategory = "All";
  let selectedPackageIds = new Set(["libreoffice", "firefox", "vlc"]);

  renderSoftwareCards();
  updateCalculationSummary();

  catChips.forEach(chip => {
    chip.addEventListener("click", () => {
      catChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.getAttribute("data-cat");
      renderSoftwareCards();
    });
  });

  if (installBtn) {
    installBtn.addEventListener("click", () => {
      if (selectedPackageIds.size === 0) {
        alert("Please select at least one software bundle.");
        return;
      }
      runSimulatedInstall();
    });
  }

  function renderSoftwareCards() {
    catalogGrid.innerHTML = "";

    const filtered = SOFTWARE_CATALOG.filter(item => {
      return (activeCategory === "All") || (item.category === activeCategory);
    });

    filtered.forEach(item => {
      const isSelected = selectedPackageIds.has(item.id);
      const card = document.createElement("div");
      card.className = `pkg-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <input type="checkbox" class="pkg-checkbox" ${isSelected ? 'checked' : ''} />
        <div class="pkg-info">
          <div class="pkg-title">
            <span>${escapeHtml(item.name)}</span>
            <span class="pkg-size">${escapeHtml(item.size)}</span>
          </div>
          <div class="pkg-desc">${escapeHtml(item.desc)}</div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 0.35rem; font-family: var(--font-mono);">
            pkg: ${escapeHtml(item.pkg)}
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.tagName !== "INPUT") {
          const cb = card.querySelector(".pkg-checkbox");
          cb.checked = !cb.checked;
        }
        if (selectedPackageIds.has(item.id)) {
          selectedPackageIds.delete(item.id);
          card.classList.remove("selected");
        } else {
          selectedPackageIds.add(item.id);
          card.classList.add("selected");
        }
        updateCalculationSummary();
      });

      catalogGrid.appendChild(card);
    });
  }

  function updateCalculationSummary() {
    let dlTotalMB = 0;
    let instTotalMB = 0;
    const pkgList = [];

    SOFTWARE_CATALOG.forEach(item => {
      if (selectedPackageIds.has(item.id)) {
        dlTotalMB += parseInt(item.size, 10) || 0;
        instTotalMB += parseInt(item.installedSize, 10) || 0;
        pkgList.push(item.pkg);
      }
    });

    if (selectedCountEl) selectedCountEl.textContent = selectedPackageIds.size;
    if (totalDownloadEl) totalDownloadEl.textContent = `${dlTotalMB} MB`;
    if (totalInstallEl) totalInstallEl.textContent = `${instTotalMB} MB`;

    if (generatedCmdEl) {
      if (pkgList.length > 0) {
        generatedCmdEl.textContent = `pkexec pacman -S --noconfirm ${pkgList.join(" ")}`;
      } else {
        generatedCmdEl.textContent = `# No software packages selected.`;
      }
    }
  }

  function runSimulatedInstall() {
    installBtn.disabled = true;
    installProgressBox.style.display = "block";
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      installProgressBar.style.width = `${progress}%`;

      if (progress < 40) {
        installStatusText.textContent = "Resolving dependencies and fetching pacman mirrors...";
      } else if (progress < 80) {
        installStatusText.textContent = "Downloading packages via ParallelDownloads stream...";
      } else if (progress < 100) {
        installStatusText.textContent = "Running post-transaction hooks and desktop shortcuts...";
      } else {
        clearInterval(interval);
        installStatusText.innerHTML = `<span style="color:#10b981; font-weight:700;">✓ Installation complete! Packages registered in Catteny OS.</span>`;
        setTimeout(() => {
          installBtn.disabled = false;
        }, 1500);
      }
    }, 250);
  }
}

/* ==========================================================================
   7. Veyon Classroom Management Visualizer
   ========================================================================== */
function initVeyonVisualizer() {
  const labGrid = document.getElementById("veyon-lab-grid");
  const lockBtn = document.getElementById("btn-lock-lab");
  const unlockBtn = document.getElementById("btn-unlock-lab");
  const broadcastBtn = document.getElementById("btn-broadcast-lab");
  const hackSimBtn = document.getElementById("btn-sim-hack");
  const alertModal = document.getElementById("security-alert-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (!labGrid) return;

  const TOTAL_PCS = 12;
  labGrid.innerHTML = "";

  for (let i = 1; i <= TOTAL_PCS; i++) {
    const pcId = i < 10 ? `0${i}` : `${i}`;
    const node = document.createElement("div");
    node.className = "student-node online";
    node.id = `node-pc-${pcId}`;
    node.innerHTML = `
      <div style="font-size: 1.5rem; margin-bottom: 0.35rem;">🖥️</div>
      <div style="font-weight: 700; font-size: 0.85rem;">PC-${pcId}</div>
      <div style="font-size: 0.72rem; color: var(--text-dim);">
        <span class="node-status-dot status-online"></span>Online
      </div>
    `;
    labGrid.appendChild(node);
  }

  if (lockBtn) {
    lockBtn.addEventListener("click", () => {
      const nodes = document.querySelectorAll(".student-node");
      nodes.forEach(n => {
        n.className = "student-node locked";
        n.querySelector(".node-status-dot").className = "node-status-dot status-locked";
        n.querySelector("div:last-child").innerHTML = `<span class="node-status-dot status-locked"></span>Locked`;
      });
    });
  }

  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      const nodes = document.querySelectorAll(".student-node");
      nodes.forEach(n => {
        n.className = "student-node online";
        n.querySelector(".node-status-dot").className = "node-status-dot status-online";
        n.querySelector("div:last-child").innerHTML = `<span class="node-status-dot status-online"></span>Online`;
      });
    });
  }

  if (broadcastBtn) {
    broadcastBtn.addEventListener("click", () => {
      alert("Teacher Screen is now streaming to all PC-01 through PC-12 endpoints via Veyon Maestro!");
    });
  }

  if (hackSimBtn && alertModal) {
    hackSimBtn.addEventListener("click", () => {
      alertModal.classList.add("open");
    });
  }

  if (modalCloseBtn && alertModal) {
    modalCloseBtn.addEventListener("click", () => {
      alertModal.classList.remove("open");
    });
  }
}

/* ==========================================================================
   8. Classroom Hardware & Deployment Calculator
   ========================================================================== */
function initLabCalculator() {
  const seatsInput = document.getElementById("calc-seats");
  const seatsVal = document.getElementById("calc-seats-val");
  const speedInput = document.getElementById("calc-speed");
  const speedVal = document.getElementById("calc-speed-val");

  const resProfile = document.getElementById("res-profile");
  const resTime = document.getElementById("res-time");
  const resBandwidth = document.getElementById("res-bandwidth");
  const resStorage = document.getElementById("res-storage");

  if (!seatsInput || !speedInput) return;

  function calculate() {
    const seats = parseInt(seatsInput.value, 10);
    const speed = parseInt(speedInput.value, 10);

    if (seatsVal) seatsVal.textContent = `${seats} Workstations`;
    if (speedVal) speedVal.textContent = `${speed >= 1000 ? (speed / 1000) + ' Gbps' : speed + ' Mbps'}`;

    if (speed < 500 || seats > 40) {
      resProfile.textContent = "Full Live/Desktop ISO (profile/)";
      resProfile.style.color = "var(--primary)";
    } else {
      resProfile.textContent = "Netinstall ISO (profile-netinstall/)";
      resProfile.style.color = "var(--secondary)";
    }

    const veyonBandwidth = Math.round(seats * 2.2);
    resBandwidth.textContent = `~${veyonBandwidth} Mbps LAN Overhead`;

    let minutes = Math.round((seats * 3.5) / (speed >= 1000 ? 4 : 1.2));
    if (minutes < 3) minutes = 3;
    resTime.textContent = `~${minutes} - ${minutes + 6} minutes`;

    const totalGB = Math.round(seats * 14.5);
    resStorage.textContent = `~${totalGB} GB Cumulative Fleet Disk`;
  }

  seatsInput.addEventListener("input", calculate);
  speedInput.addEventListener("input", calculate);
  calculate();
}

/* ==========================================================================
   9. Flashing & Device Command Generator
   ========================================================================== */
function initFlashingGuide() {
  const flashBtns = document.querySelectorAll(".flash-tab-btn");
  const flashPanels = document.querySelectorAll(".flash-panel");
  const ddDriveInput = document.getElementById("dd-drive-input");
  const ddCmdEl = document.getElementById("dd-generated-cmd");

  flashBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      flashBtns.forEach(b => b.classList.remove("active"));
      flashPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tool");
      const p = document.getElementById(`flash-${target}`);
      if (p) p.classList.add("active");
    });
  });

  if (ddDriveInput && ddCmdEl) {
    ddDriveInput.addEventListener("input", (e) => {
      const dev = e.target.value.trim() || "/dev/sdX";
      ddCmdEl.textContent = `sudo dd bs=4M if=Catteny-0.1-x86_64.iso of=${dev} conv=fsync oflag=direct status=progress`;
    });
  }
}

/* ==========================================================================
   10. Live GitHub Repository Stats
   ========================================================================== */
function fetchGitHubStats() {
  const starCountEl = document.getElementById("gh-stars");

  fetch("https://api.github.com/repos/Cattens-Roses/Catteny")
    .then(res => res.json())
    .then(data => {
      if (data && starCountEl) {
        starCountEl.textContent = data.stargazers_count !== undefined ? `${data.stargazers_count} ★` : "GitHub";
      }
    })
    .catch(() => {
      if (starCountEl) starCountEl.textContent = "GitHub";
    });
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}
