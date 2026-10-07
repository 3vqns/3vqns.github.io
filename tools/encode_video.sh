#!/usr/bin/env bash
# Rebuild the hero loop from the Higgsfield render in assets/src/hero_raw.mp4.
# Needs ffmpeg with libx264 + libvpx-vp9 (e.g. `pip install imageio-ffmpeg`, or a system ffmpeg).
# Run from the repo root:  bash tools/encode_video.sh
set -euo pipefail

FF="${FFMPEG:-ffmpeg}"
SRC=assets/src
OUT=assets/video
D=1.25     # crossfade length (s) that hides the loop seam
T=5.875    # duration of hero_raw.mp4 (s)
OFFSET=$(python -c "print($T - 2 * $D)")

# 1. Seamless loop: play from D to the end, crossfading the tail into the first D seconds.
"$FF" -y -v error -i "$SRC/hero_raw.mp4" -filter_complex \
  "[0:v]fps=24,split[a][b];[a]trim=start=$D,setpts=PTS-STARTPTS,fps=24[A];[b]trim=end=$D,setpts=PTS-STARTPTS,fps=24[B];[A][B]xfade=transition=fade:duration=$D:offset=$OFFSET,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -crf 12 -an "$SRC/loop_master.mp4"

# 2. Slow it down ~35% with motion interpolation for a calmer background.
"$FF" -y -v error -i "$SRC/loop_master.mp4" \
  -vf "setpts=1.35*PTS,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
  -c:v libx264 -crf 12 -an "$SRC/loop_slow.mp4"

# 3. Web exports (no audio track).
"$FF" -y -v error -i "$SRC/loop_slow.mp4" -c:v libx264 -preset veryslow -crf 23 -profile:v high -pix_fmt yuv420p -movflags +faststart -an "$OUT/hero-1080.mp4"
"$FF" -y -v error -i "$SRC/loop_slow.mp4" -vf scale=960:540:flags=lanczos -c:v libx264 -preset veryslow -crf 24 -profile:v high -pix_fmt yuv420p -movflags +faststart -an "$OUT/hero-540.mp4"
"$FF" -y -v error -i "$SRC/loop_slow.mp4" -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p -an "$OUT/hero-1080.webm"
"$FF" -y -v error -i "$SRC/loop_slow.mp4" -vf scale=960:540:flags=lanczos -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p -an "$OUT/hero-540.webm"

ls -la "$OUT"
