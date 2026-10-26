#!/usr/bin/env bash
iso_name="Catteny-Net"
iso_label="CATTENY_NET"
iso_publisher="Xerone0 <darekzarzycki11@fmail.com>"
iso_application="Catteny Netinstall"
iso_version="1.0"
install_dir="catteny"
buildmodes=('iso')
bootmodes=('bios.syslinux' 'uefi.grub')
arch="x86_64"
pacman_conf="pacman.conf"
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'zstd' '-Xcompression-level' '19')
bootstrap_tarball_compression=(zstd -c -T0 --long -19)
