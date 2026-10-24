#!/usr/bin/env bash
iso_name="Catteny"
iso_label="CATTENY_$(date --date="@${SOURCE_DATE_EPOCH:-$(date +%s)}" +%Y%m)"
iso_publisher="Xerone0 <darekzarzycki11@fmail.com>"
iso_application="Catteny Live/Install"
iso_version="1.0"
install_dir="catteny"
buildmodes=('iso')
bootmodes=('bios.syslinux.mbr' 'bios.syslinux.eltorito'
           'uefi-x64.grub.esp' 'uefi-x64.grub.eltorito')
arch="x86_64"
pacman_conf="pacman.conf"
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'zstd' '-Xdict-size' '16M')
