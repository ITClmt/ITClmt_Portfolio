#!/usr/bin/env bash
# Converts every CV PDF in public/ to a matching WebP (first page, ~200 DPI).
# Used locally and by .github/workflows/cv-to-webp.yml
set -euo pipefail

cd "$(dirname "$0")/.."

shopt -s nullglob
pdfs=(public/CV*.pdf)

if [ ${#pdfs[@]} -eq 0 ]; then
  echo "No CV PDFs found in public/, nothing to do."
  exit 0
fi

for pdf in "${pdfs[@]}"; do
  base="${pdf%.pdf}"
  tmp_prefix="$(mktemp -u)"

  pdftoppm -png -r 200 -f 1 -l 1 "$pdf" "$tmp_prefix"

  png_file=$(ls "${tmp_prefix}"*.png 2>/dev/null | head -n1)
  if [ -z "$png_file" ]; then
    echo "Failed to rasterize $pdf" >&2
    exit 1
  fi

  convert "$png_file" -quality 85 "${base}.webp"
  rm -f "${tmp_prefix}"*.png

  echo "Converted $pdf -> ${base}.webp"
done
