#!/usr/bin/env bash
iso_name="Catteny"
iso_label="CATTENY_$(date --date="@${SOURCE_DATE_EPOCH:-$(date +%s)}" +%Y%m)"
iso_publisher="Xerone0 <darekzarzycki11@fmail.com>"
iso_application="Catteny Live/Install"
iso_version="1.0"
install_dir="catteny"
buildmodes=('iso')
bootmodes=('bios.syslinux' 'uefi.grub')
arch="x86_64"
pacman_conf="pacman.conf"
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'zstd' '-Xcompression-level' '19')
