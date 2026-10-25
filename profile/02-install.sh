#!/usr/bin/env bash
# Install Calamares from a pre-built package
pacman -U "${SCRIPT_DIR}"/calamares-*.pkg.tar.* --noconfirm
