# 918 Runs Shader MVP

Live site: https://steisaden.github.io/noeruns/

Mobile‑first React SPA with shader hero, registration, highlights gallery, and newsletter.

- Frontend: Vite + React
- Visuals: @paper-design/shaders-react (metaballs)
- Forms: react-hook-form + Zod
- API: Serverless functions (Vercel) for submit/subscribe
- Deploy: GitHub Pages (frontend) + Vercel (API)

## Getting Started

Prereqs: Node 20+, pnpm 9+

Install and run dev server:

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
Outputs to `dist/`.

## Serverless APIs

- POST `/api/submit` — registration (validated by Zod, forwards to Buttondown)
- POST `/api/subscribe` — newsletter subscribe (email only)

Set in Vercel project settings:
- BUTTONDOWN_API_KEY: Token for Buttondown API (do not print this value).

## Deployments

### GitHub Pages (Frontend)

This repo includes a workflow at `.github/workflows/deploy.yml` that:
- Builds with `VITE_BASE="/${REPO_NAME}/"` to ensure correct asset paths
- Publishes `dist/` to `gh-pages` branch

Steps:
1) Push to `main` (or run workflow via Actions UI)
2) In GitHub repo settings → Pages, set source to `gh-pages` branch

### Vercel (Serverless API)

1) Import the GitHub repo into Vercel
2) Root directory: this project folder (if monorepo)
3) Environment Variable: `BUTTONDOWN_API_KEY`
4) Framework preset: Other (no frontend build needed); functions in `/api`

`vercel.json` config pins Node runtime and routes.

## Lighthouse

CI on PRs runs Lighthouse via LHCI. You can also run it locally:

To generate a local Lighthouse report without starting a server:

```bash
pnpm build
npx @lhci/cli@0.13.0 autorun --collect.staticDistDir=dist --upload.target=filesystem --upload.outputDir=.lighthouse
```

Artifacts land in `.lighthouse/`.

## Acceptance Criteria (Spec Summary)

- Players can register for Sunday sessions
- Newsletter subscribe with explicit opt‑in
- Highlights gallery shows items lazily
- Mobile‑first layout; shader paused off‑screen and respects reduced motion

## Brand Guardrails

- Colors via CSS vars only: `--red`, `--navy`, `--cream`, `--white`
- Typography: Montserrat + Open Sans

---

CI: LHCI test PR – touching README to trigger the Lighthouse CI workflow.
