/**
 * Catteny DeepWiki Knowledge Base Data
 * Extracted directly from https://deepwiki.com/Cattens-Roses/Catteny
 */

const WIKI_ARTICLES = [
  {
    id: "overview",
    title: "Project Overview & Identity",
    category: "Architecture",
    badge: "Core",
    readTime: "4 min read",
    summary: "Catteny is an Arch Linux-derived rolling distribution specifically engineered for classroom computer labs, educational institutions, and managed workstation fleets.",
    content: `
      <h3>1. Distribution Identity</h3>
      <p>Catteny combines the bleeding-edge software freshness and flexibility of Arch Linux with enterprise-grade guardrails required by computer laboratory administrators, educators, and enterprise workstation managers.</p>
      
      <div class="code-preview">
        <div class="code-header">
          <span>/etc/os-release</span>
          <span class="lang-tag">CONFIG</span>
        </div>
        <pre><code>NAME="Catteny"
PRETTY_NAME="Catteny 0.1"
ID=catteny0.1
ID_LIKE=arch
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://github.com/Cattens-Roses/Catteny"</code></pre>
      </div>

      <h3>2. Key Pillars</h3>
      <ul>
        <li><strong>Dual-Profile Deployment:</strong> Both Full Desktop (offline capable) and Netinstall (minimal network bootstrap) ISO profiles.</li>
        <li><strong>Classroom Lab Management:</strong> Native, pre-configured Veyon monitoring server integrated into systemd and protected against accidental removal.</li>
        <li><strong>Modular Graphical Installer:</strong> Custom Calamares pipeline with dynamic package chooser bundles (Office, Dev, Gaming, Media).</li>
        <li><strong>Performance-Tuned Kernel:</strong> Support for Linux CachyOS and BORE (Burst-Oriented Response Enhancer) CPU schedulers for silky-smooth responsiveness under heavy multitasking.</li>
        <li><strong>Post-Install Onboarding:</strong> "Catteny Hello" PyGObject/GTK3 application enabling one-click software deployment for students and staff.</li>
      </ul>
    `
  },
  {
    id: "dual-profiles",
    title: "Dual-Profile Architecture: Full vs Netinstall",
    category: "Profiles",
    badge: "Archiso",
    readTime: "5 min read",
    summary: "Complete breakdown of the two distinct archiso build profiles: the all-in-one desktop ISO and the lightweight netinstall ISO.",
    content: `
      <h3>1. Profile Comparison</h3>
      <p>Catteny separates its release strategy into two specialized build targets designed for different network topologies and deployment constraints:</p>
      
      <div class="table-responsive">
        <table class="wiki-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Full Live/Install Profile (<code>profile/</code>)</th>
              <th>Netinstall Profile (<code>profile-netinstall/</code>)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Target</strong></td>
              <td>Offline installation, live demonstration, rescue disk</td>
              <td>Mass PXE boot, bandwidth-constrained labs, custom base</td>
            </tr>
            <tr>
              <td><strong>ISO Volume Label</strong></td>
              <td><code>CATTENY_YYYYMM</code></td>
              <td><code>CATTENY_NET</code></td>
            </tr>
            <tr>
              <td><strong>Desktop Environment</strong></td>
              <td>Pre-bundled KDE Plasma / XFCE stack</td>
              <td>Headless base (X11/Wayland pulled at install)</td>
            </tr>
            <tr>
              <td><strong>Compression</strong></td>
              <td>SquashFS with <code>zstd -Xcompression-level 19</code></td>
              <td>SquashFS with <code>zstd -Xcompression-level 19</code></td>
            </tr>
            <tr>
              <td><strong>Veyon Bundle</strong></td>
              <td>Pre-installed & active</td>
              <td>Installed during Calamares package execution</td>
            </tr>
            <tr>
              <td><strong>Typical Size</strong></td>
              <td>~2.2 GB - 2.8 GB</td>
              <td>~750 MB - 950 MB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. Profile Definition (<code>profiledef.sh</code>)</h3>
      <p>The build definition mandates specific boot parameters and compression flags:</p>
      <div class="code-preview">
        <div class="code-header"><span>profiledef.sh</span><span class="lang-tag">BASH</span></div>
        <pre><code>#!/usr/bin/env bash
iso_name="Catteny"
iso_label="CATTENY_$(date --date="@\${SOURCE_DATE_EPOCH:-$(date +%s)}" +%Y%m)"
iso_publisher="Catteny Project"
iso_application="Catteny Live/Install"
iso_version="1.0"
install_dir="catteny"
buildmodes=('iso')
bootmodes=('bios.syslinux' 'uefi.grub')
arch="x86_64"
pacman_conf="pacman.conf"
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'zstd' '-Xcompression-level' '19')</code></pre>
      </div>
    `
  },
  {
    id: "organization-bundle",
    title: "Organization Bundle & Classroom Management (Veyon)",
    category: "Veyon & Security",
    badge: "Enterprise",
    readTime: "6 min read",
    summary: "How Veyon is integrated into systemd, configured with access control lists, and tied to the Catteny Organization Console.",
    content: `
      <h3>1. Architecture & Veyon Role</h3>
      <p>In educational computer labs, instructors require transparent visibility, screen broadcast, remote input control, and lockdown capabilities. Catteny pre-integrates <strong>Veyon</strong> (Virtual Eye On Networks) as a fundamental operating system service rather than an optional afterthought.</p>

      <h3>2. Service Daemon (<code>veyon-service.service</code>)</h3>
      <p>The Veyon service is enabled by default in <code>airootfs/etc/systemd/system/</code> and automatically starts before user desktop session initialization:</p>
      
      <div class="code-preview">
        <div class="code-header"><span>/etc/systemd/system/veyon-service.service</span><span class="lang-tag">SYSTEMD</span></div>
        <pre><code>[Unit]
Description=Veyon Classroom Management Service
After=network.target display-manager.service

[Service]
Type=simple
ExecStart=/usr/bin/veyon-server
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target</code></pre>
      </div>

      <h3>3. Access Control & Network Directory</h3>
      <p>The configuration template at <code>profile/airootfs/etc/veyon/veyon.conf</code> configures built-in directory mode with role-based access:</p>
      <ul>
        <li><strong>Teacher / Admin Roles:</strong> <code>admin</code>, <code>teacher1</code>, <code>teacher2</code>, <code>org-admins</code>, <code>org-teachers</code></li>
        <li><strong>Monitored Workstations:</strong> Pre-registered host slots (<code>PC-01</code>, <code>PC-02</code>, etc.) on local subnet</li>
        <li><strong>Console Launcher:</strong> <code>catteny-org.desktop</code> surfaces <code>veyon-maestro</code> in the teacher's application launcher.</li>
      </ul>
    `
  },
  {
    id: "removal-guard",
    title: "Pacman System Integrity Guard (ALPM Hook)",
    category: "Veyon & Security",
    badge: "Security",
    readTime: "4 min read",
    summary: "Technical breakdown of the ALPM pre-transaction hook that aborts unauthorized attempts to remove Veyon and the organization bundle.",
    content: `
      <h3>1. The Need for System Integrity</h3>
      <p>In computer labs, curious or mischievous students frequently attempt to uninstall classroom monitoring software by running package manager commands (e.g. <code>sudo pacman -R veyon</code>). Catteny mitigates this at the package manager database transaction level.</p>

      <h3>2. ALPM Hook Definition</h3>
      <p>Located at <code>/etc/pacman.d/hooks/99-org-bundle.hook</code>, this hook intercepts any transaction attempting to remove packages matching <code>veyon</code>:</p>

      <div class="code-preview">
        <div class="code-header"><span>/etc/pacman.d/hooks/99-org-bundle.hook</span><span class="lang-tag">ALPM HOOK</span></div>
        <pre><code>[Trigger]
Operation = Remove
Type = Package
Target = veyon
Target = veyon-*

[Action]
Description = Checking Organization Core Component Integrity...
When = PreTransaction
Exec = /usr/local/bin/org-bundle-guard
AbortOnFail</code></pre>
      </div>

      <h3>3. Guard Script (<code>org-bundle-guard</code>)</h3>
      <p>The guard script prints a policy notification and exits with status code <code>1</code>, triggering <code>AbortOnFail</code> and halting the pacman transaction before any file is deleted:</p>

      <div class="code-preview">
        <div class="code-header"><span>/usr/local/bin/org-bundle-guard</span><span class="lang-tag">BASH</span></div>
        <pre><code>#!/usr/bin/env bash
# Catteny Organization Bundle Protection Guard
echo "========================================================"
echo " [SECURITY ALERT] Catteny System Integrity Protection"
echo " Removal of 'veyon' (Organization Bundle) is restricted."
echo " This machine is enrolled in an educational workstation fleet."
echo " Contact your system administrator to disenroll."
echo "========================================================"
exit 1</code></pre>
      </div>
    `
  },
  {
    id: "calamares-installer",
    title: "Calamares Installer Pipeline & GlobalStorage",
    category: "Installer",
    badge: "Calamares",
    readTime: "5 min read",
    summary: "Detailed look at the modular installer queues, module sequencing, and the packagechooser GlobalStorage data flow.",
    content: `
      <h3>1. Installer Flow Overview</h3>
      <p>Catteny integrates the Calamares universal installer framework, configured via <code>profile/airootfs/etc/calamares/settings.conf</code>. The installer is bifurcated into an interactive presentation queue and an unattended execution queue.</p>

      <h3>2. Queue Architecture</h3>
      <div class="code-preview">
        <div class="code-header"><span>settings.conf Module Sequencing</span><span class="lang-tag">YAML/CONF</span></div>
        <pre><code>sequence:
  # 1. Interactive User Presentation Queue (UI Phase)
  - show:
    - welcome
    - keyboard
    - partition
    - users
    - packagechooser
    - summary

  # 2. Disk Modification & Provisioning Queue (Exec Phase)
  - exec:
    - partition
    - mount
    - fstab
    - machineid
    - initcpio
    - packages
    - bootloader
    - services-systemd
    - preservefiles
    - umount

  # 3. Completion
  - show:
    - finished</code></pre>
      </div>

      <h3>3. GlobalStorage Inter-Module Data Flow</h3>
      <p>When the user selects optional software sets in the <code>packagechooser</code> module, Calamares serializes the chosen package IDs into its runtime <code>GlobalStorage</code> dictionary under the key <code>packagechooser_packagechooser</code>. When the execution queue reaches the <code>packages</code> module, it reads this array and passes them directly to <code>pacman -S --target /target</code>.</p>
    `
  },
  {
    id: "packagechooser-bundles",
    title: "Calamares Package Chooser & Software Bundles",
    category: "Installer",
    badge: "Bundles",
    readTime: "4 min read",
    summary: "The modular software categories and package sets selectable during system setup.",
    content: `
      <h3>1. Bundle Configuration</h3>
      <p>The optional software bundles offered during the installation step are defined in <code>packagechooser.conf</code>:</p>

      <div class="code-preview">
        <div class="code-header"><span>/etc/calamares/modules/packagechooser.conf</span><span class="lang-tag">YAML</span></div>
        <pre><code>mode: optionalmultiple
method: packages

items:
  - id: office
    name: "Office & Productivity"
    description: "Full LibreOffice office suite and Thunderbird email client."
    packages:
      - libreoffice-fresh
      - thunderbird

  - id: media
    name: "Media & Graphics Production"
    description: "VLC media player, GIMP image editor, and Kdenlive video suite."
    packages:
      - vlc
      - gimp
      - kdenlive

  - id: dev
    name: "Software Development Kit"
    description: "Visual Studio Code, Git version control, Python 3, and build tools."
    packages:
      - code
      - git
      - python
      - base-devel

  - id: gaming
    name: "Gaming & Simulation Tools"
    description: "Steam client, Lutris gaming runner, and Heroic Games Launcher."
    packages:
      - steam
      - lutris
      - heroic

  - id: browser
    name: "Alternative Web Browsers"
    description: "Privacy-oriented and modern high-speed browsers."
    packages:
      - firefox
      - brave-bin</code></pre>
      </div>
    `
  },
  {
    id: "catteny-hello",
    title: "Catteny Hello: Post-Install Onboarding Hub",
    category: "Onboarding",
    badge: "GTK3",
    readTime: "4 min read",
    summary: "In-depth inspection of the PyGObject/GTK3 onboarding application that launches on first boot.",
    content: `
      <h3>1. The Onboarding Hub Concept</h3>
      <p>Located at <code>/usr/local/bin/catteny-hello</code>, <strong>Catteny Hello</strong> provides users and students with a graphical, non-intimidating software hub to tailor their workstation immediately after first login.</p>

      <h3>2. Technical Specifications</h3>
      <ul>
        <li><strong>Language & Framework:</strong> Python 3 with <code>gi.repository.Gtk</code> and <code>gi.repository.GLib</code>.</li>
        <li><strong>Window Geometry:</strong> Fixed default at 600x450 pixels with clean headerbar layout.</li>
        <li><strong>Category Filter:</strong> Dropdown or sidebar switcher: <em>Productivity, Gaming, Development, Media, System Utilities</em>.</li>
        <li><strong>Privilege Escalation:</strong> Executes package installations asynchronously via PolicyKit:
          <pre><code>GLib.spawn_command_line_async("pkexec pacman -S --noconfirm " + selected_packages)</code></pre>
        </li>
      </ul>

      <h3>3. Autostart Integration</h3>
      <p>Configured at <code>/etc/xdg/autostart/catteny-hello.desktop</code>, with <code>OnlyShowIn=KDE;GNOME;XFCE;</code>, ensuring the welcome screen presents itself seamlessly on first desktop boot.</p>
    `
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Build Pipeline (.github/workflows/build.yml)",
    category: "CI/CD Pipeline",
    badge: "GitHub Actions",
    readTime: "6 min read",
    summary: "How GitHub Actions containerizes the Arch build environment, compiles AUR packages, and packages release ISOs.",
    content: `
      <h3>1. Containerized Arch Build Environment</h3>
      <p>Catteny utilizes GitHub Actions running on <code>ubuntu-latest</code> hosting an official privileged <code>docker://archlinux:base-devel</code> container to guarantee package parity with upstream Arch Linux.</p>

      <h3>2. Complete Workflow Steps</h3>
      <ol>
        <li><strong>Checkout:</strong> <code>actions/checkout@v4</code> clones repository tree.</li>
        <li><strong>Tooling Provisioning:</strong> <code>pacman -Sy archiso squashfs-tools libisoburn dosfstools grub --noconfirm</code>.</li>
        <li><strong>Unprivileged Builder Setup:</strong> <code>useradd -m -G wheel builder</code> with passwordless sudoers rights to allow unprivileged <code>makepkg</code> execution.</li>
        <li><strong>AUR Compilation & Local Repo:</strong> Compiles Veyon and Calamares PKGBUILDs into <code>*.pkg.tar.zst</code>, indexed via <code>repo-add /customrepo/custom.db.tar.zst</code>.</li>
        <li><strong>Mkarchiso Execution:</strong>
          <pre><code>mkarchiso -v -w /tmp/archiso-work -o ./out ./profile/</code></pre>
        </li>
        <li><strong>Checksumming:</strong> Computes <code>sha256sum out/*.iso > out/SHA256SUMS</code>.</li>
        <li><strong>Publishing:</strong> Uploads build artifacts to workflow summary and pushes release assets on version tags.</li>
      </ol>
    `
  },
  {
    id: "bootloader-config",
    title: "Bootloader Parity: Legacy BIOS & UEFI Setup",
    category: "Architecture",
    badge: "Syslinux & GRUB",
    readTime: "4 min read",
    summary: "Detailed view of the dual boot architecture supporting both legacy BIOS hardware and modern UEFI machines.",
    content: `
      <h3>1. Dual Boot Parity</h3>
      <p>Computer labs often contain a mixed inventory of hardware — older legacy BIOS machines and newer UEFI laptops. Catteny guarantees bootability on both.</p>

      <h3>2. Syslinux Configuration (BIOS)</h3>
      <p>Defined in <code>profile/syslinux/syslinux.cfg</code>:</p>
      <div class="code-preview">
        <div class="code-header"><span>syslinux.cfg</span><span class="lang-tag">SYSLINUX</span></div>
        <pre><code>TIMEOUT 20
PROMPT 1

LABEL arch
TEXT HELP
Boot the Catteny live environment.
ENDTEXT
MENU LABEL Boot Catteny (live)
LINUX /%INSTALL_DIR%/boot/vmlinuz-linux
INITRD /%INSTALL_DIR%/boot/initramfs-linux.img
APPEND archisobasedir=%INSTALL_DIR% archisointype=squashfs archiso_arch=x86_64 archiso_compression=zstd

LABEL memtest
TEXT HELP
Run the MemTest86+ memory test.
ENDTEXT
MENU LABEL Run a memory test
LINUX /%INSTALL_DIR%/boot/memtest</code></pre>
      </div>

      <h3>3. GRUB Configuration (UEFI)</h3>
      <p>Defined in <code>profile/grub/grub.cfg</code>:</p>
      <div class="code-preview">
        <div class="code-header"><span>grub.cfg</span><span class="lang-tag">GRUB</span></div>
        <pre><code>set default="0"
set timeout="10"

menuentry "Boot Catteny (live)" {
    set linux="/%INSTALL_DIR%/boot/vmlinuz-linux"
    set initrd="/%INSTALL_DIR%/boot/initramfs-linux.img"
    linux $linux archisobasedir=%INSTALL_DIR% archisointype=squashfs archiso_arch=x86_64 archiso_compression=zstd
    initrd $initrd
}

menuentry "Run a memory test" {
    linux /%INSTALL_DIR%/boot/memtest
}</code></pre>
      </div>
    `
  },
  {
    id: "pacman-conf-guide",
    title: "Pacman Mirrors, LF Line Endings & Architecture Options",
    category: "Troubleshooting",
    badge: "Best Practice",
    readTime: "5 min read",
    summary: "Crucial engineering insights on the removal of [community], Windows CRLF issues in Linux containers, and mirror resolution.",
    content: `
      <h3>1. The [community] Deprecation</h3>
      <p>Arch Linux merged the <code>[community]</code> repository into <code>[extra]</code> in May 2023. Retaining <code>[community]</code> in <code>pacman.conf</code> causes non-recoverable 404 database download errors during <code>mkarchiso</code> execution.</p>

      <h3>2. Production pacman.conf Configuration</h3>
      <div class="code-preview">
        <div class="code-header"><span>profile/pacman.conf</span><span class="lang-tag">CONF</span></div>
        <pre><code>[options]
Architecture = auto
ParallelDownloads = 5
SigLevel = Required DatabaseOptional
LocalFileSigLevel = Optional

[core]
Include = /etc/pacman.d/mirrorlist
Server = https://geo.mirror.pkgbuild.com/$repo/os/$arch
Server = https://mirrors.kernel.org/archlinux/$repo/os/$arch

[extra]
Include = /etc/pacman.d/mirrorlist
Server = https://geo.mirror.pkgbuild.com/$repo/os/$arch
Server = https://mirrors.kernel.org/archlinux/$repo/os/$arch

#[multilib]
#Include = /etc/pacman.d/mirrorlist</code></pre>
      </div>

      <h3>3. Windows CRLF vs Unix LF Line Endings</h3>
      <p>When developing on Windows hosts, git checkouts can convert line terminators to carriage return + line feed (<code>CRLF</code>). The Arch Linux pacman parser and bash scripts interpret <code>\\r</code> characters literally, causing obscure syntax errors like <code>unexpected token '\\r'</code>. Catteny enforces LF globally via <code>.gitattributes</code>:</p>
      <div class="code-preview">
        <div class="code-header"><span>.gitattributes</span><span class="lang-tag">GIT</span></div>
        <pre><code>* text=auto eol=lf
*.sh text eol=lf
*.conf text eol=lf</code></pre>
      </div>
    `
  }
];

// Available Software Packages for Catteny Hello & Calamares Simulators
const SOFTWARE_CATALOG = [
  {
    category: "Productivity",
    id: "libreoffice",
    name: "LibreOffice Fresh",
    pkg: "libreoffice-fresh",
    size: "185 MB",
    installedSize: "550 MB",
    icon: "file-text",
    desc: "Complete office suite with Writer, Calc, Impress, and Draw."
  },
  {
    category: "Productivity",
    id: "thunderbird",
    name: "Mozilla Thunderbird",
    pkg: "thunderbird",
    size: "62 MB",
    installedSize: "210 MB",
    icon: "mail",
    desc: "Feature-rich open-source email, calendar, and contacts client."
  },
  {
    category: "Development",
    id: "vscode",
    name: "Visual Studio Code (OSS)",
    pkg: "code",
    size: "85 MB",
    installedSize: "320 MB",
    icon: "code",
    desc: "Extensible code editor with Git integration and debugging tools."
  },
  {
    category: "Development",
    id: "git",
    name: "Git & Base Devel",
    pkg: "git base-devel",
    size: "45 MB",
    installedSize: "160 MB",
    icon: "git-branch",
    desc: "Version control and compiler suite (gcc, make, autoconf)."
  },
  {
    category: "Development",
    id: "python",
    name: "Python 3 & Pip",
    pkg: "python python-pip",
    size: "35 MB",
    installedSize: "120 MB",
    icon: "terminal",
    desc: "Modern Python programming language environment and package manager."
  },
  {
    category: "Media",
    id: "vlc",
    name: "VLC Media Player",
    pkg: "vlc",
    size: "42 MB",
    installedSize: "140 MB",
    icon: "play-circle",
    desc: "Universal multimedia playback engine supporting all codecs."
  },
  {
    category: "Media",
    id: "gimp",
    name: "GIMP Image Editor",
    pkg: "gimp",
    size: "55 MB",
    installedSize: "180 MB",
    icon: "image",
    desc: "GNU Image Manipulation Program for photo retouching and graphic design."
  },
  {
    category: "Media",
    id: "kdenlive",
    name: "Kdenlive Video Editor",
    pkg: "kdenlive",
    size: "92 MB",
    installedSize: "280 MB",
    icon: "film",
    desc: "Non-linear multi-track video editing suite by KDE."
  },
  {
    category: "Gaming",
    id: "steam",
    name: "Steam Client",
    pkg: "steam",
    size: "70 MB",
    installedSize: "230 MB",
    icon: "gamepad-2",
    desc: "Digital gaming platform with Proton Windows compatibility layer."
  },
  {
    category: "Gaming",
    id: "lutris",
    name: "Lutris Gaming Platform",
    pkg: "lutris",
    size: "25 MB",
    installedSize: "85 MB",
    icon: "cpu",
    desc: "Open source gaming manager for Linux games, emulators, and runners."
  },
  {
    category: "Internet",
    id: "firefox",
    name: "Mozilla Firefox",
    pkg: "firefox",
    size: "75 MB",
    installedSize: "240 MB",
    icon: "globe",
    desc: "Fast, private, and independent web browser."
  },
  {
    category: "Internet",
    id: "brave",
    name: "Brave Browser",
    pkg: "brave-bin",
    size: "110 MB",
    installedSize: "310 MB",
    icon: "shield",
    desc: "Chromium-based privacy browser with built-in ad and tracker blocking."
  }
];
