# Catteny
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Cattens-Roses/Catteny)

Catteny is an Arch Linux-based distribution profile designed for organizational and educational environments.

## Features

*   **Arch Linux Base:** A rolling-release model providing up-to-date software.
*   **Graphical Installer:** Uses Calamares for a user-friendly installation experience.
*   **Optional Software Bundles:** During installation, you can choose from pre-defined software sets for Office, Media, Gaming, Development, and more.
*   **Organization-Ready:** Comes with Veyon integrated, a powerful classroom and computer lab management tool. The Veyon service is enabled by default on the installed system.
*   **Welcome App:** Includes "Catteny Hello", a simple post-installation application to help users install common software.
*   **System Integrity:** A Pacman hook is in place to prevent the accidental removal of the core Veyon "Organization Bundle".
*   **Custom Branding:** Features a custom `fastfetch` configuration and OS identity.

## Getting the ISO

The installable ISO is automatically built by a GitHub Actions workflow.

1.  Navigate to the **Actions** tab of this repository.
2.  Click on the latest successful workflow run under the "Build ISO" list.
3.  Under the **Artifacts** section, download the `catteny-iso` archive.

## Building from Source

You can build the Catteny ISO yourself. An Arch Linux environment is required.

### 1. Prerequisites

Install the necessary build tools:
```bash
sudo pacman -S --needed archiso squashfs-tools git dosfstools grub
```

### 2. Build Dependencies

Catteny requires custom-built packages for `Calamares` and `Veyon` to be present in the `profile/` directory before building the ISO. The official build process is defined in the `.github/workflows/build.yml` file.

You must replicate the "Build Veyon package" and "Build Calamares package" steps from the workflow to generate the required `.pkg.tar.zst` files and place them in the `profile/` directory.

### 3. Build the ISO

Once the prerequisites are met and the dependency packages are in place:

1.  Clone the repository:
    ```bash
    git clone https://github.com/Cattens-Roses/Catteny.git
    cd Catteny
    ```

2.  Run `mkarchiso` as root:
    ```bash
    sudo mkarchiso -v -w /tmp/catteny-build -o ./out ./profile/
    ```

The final ISO will be located in the `out/` directory.

## Key Components

### Organization Bundle (Veyon)

Catteny is designed for managed environments. It includes Veyon, an open-source tool for monitoring and controlling computers across a network.

*   **Service:** The Veyon server is configured to start on boot (`veyon-service.service`).
*   **Configuration:** A sample configuration is provided in `profile/airootfs/etc/veyon/veyon.conf`. You should modify this to match your organization's network and user groups.
*   **Removal Guard:** A Pacman hook (`99-org-bundle.hook`) prevents Veyon from being uninstalled, treating it as a core system component.

### Calamares Installer

The installation process is handled by Calamares.

*   **Modules:** The installer sequence is defined in `profile/airootfs/etc/calamares/settings.conf`.
*   **Base Packages:** The core packages installed on the target system are listed in `profile/airootfs/etc/calamares/modules/packages.conf`.
*   **Package Chooser:** The optional software bundles offered during installation are configured in `profile/airootfs/etc/calamares/modules/packagechooser.conf`.

### Catteny Hello

After installation, a simple GTK-based welcome application is available.

*   **Functionality:** It allows users to point-and-click to install popular applications sorted by category.
*   **Location:** The script is located at `profile/airootfs/usr/local/bin/catteny-hello`.
*   **Autostart:** It is configured to run automatically on the first boot of a new session.