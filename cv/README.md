# CV

Single source of truth for Eirik Mo's CV.

- **Edit:** `Eirik_Mo_CV.md` (this is the only file you touch).
- **Regenerate the PDF:** `bun run cv`
  - Renders `Eirik_Mo_CV.md` → `../src/public/Eirik_Mo_CV.pdf` via the gstack `make-pdf` tool.
- **Publish:** commit and deploy the site as usual. The PDF is served at
  `/Eirik_Mo_CV.pdf` and the "Download CV" buttons (NavBar + About section)
  point there, so a normal deploy ships the new CV — no external upload needed.

## Requirements

`bun run cv` needs the gstack `make-pdf` binary at
`~/.claude/skills/gstack/make-pdf/dist/pdf` (or set `MAKE_PDF_BIN=/path/to/pdf`).
If it's missing, run `./setup` in the gstack repo.

## Notes

- The old `storage.mowebdev.com/main/Eirik_Mo_CV.pdf` URL is no longer referenced
  by the site. Upload the regenerated PDF there too only if you need that URL kept fresh.
