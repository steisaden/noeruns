# Implementation Plan: 918 Runs Shader MVP

**Feature Branch**: `001-what-i-m`  
**Feature Spec**: [./spec.md](./spec.md)  
**Status**: In Progress

## Execution Flow (main)
*This plan is a living document, updated as each phase completes.*

1.  ✅ **Phase 0: Research & Discovery**
    - [x] Analyze `spec.md` for requirements.
    - [x] Analyze user-provided `Technical Context`.
    - [x] Generate `research.md` artifact.
2.  ✅ **Phase 1: System Design**
    - [x] Define data models in `data-model.md`.
    - [x] Define API contracts in `contracts/`.
    - [x] Create developer setup guide `quickstart.md`.
3.  ⏳ **Phase 2: Task Breakdown**
    - [ ] Generate `tasks.md` from component architecture and features.
4.  ⬜ **Phase 3: Implementation**
    - [ ] Execute tasks from `tasks.md`.
5.  ⬜ **Phase 4: Verification**
    - [ ] Verify success criteria from `spec.md` and this plan.

---

## Technical Context

### 1. What & Why (30-second recap)
**What**: Rebuild the 918 Runs site as a React SPA that still registers girls for Sunday sessions, but now feels alive—gooey metaballs in the hero, micro-interactions from ReactBits, and the same zero-cost hosting. 
**Why**: The static MVP works, but we need wow-factor for Gen-Z athletes and their TikTok-attention span; shaders + slick UI bits = instant social-media shareability.

### 2. Tech Stack
| Layer             | Choice                               | Rationale                                                 |
| ----------------- | ------------------------------------ | --------------------------------------------------------- |
| UI Runtime        | React 18 (Vite)                      | Fast HMR, native ESM, easy shader imports.                |
| Shaders           | `@paper-design/shaders-react`        | MetaballsZero-dep, 60 fps on mid-tier phones, <18 kB gzipped. |
| Micro-Interactions| reactbits.dev components             | Copy-paste hooks, tree-shakeable, no extra CSS files.     |
| Styling           | CSS Modules + CSS variables          | Keeps brand lock from logo; scoped styles for bits.       |
| Form & Data       | React-Hook-Form + Zod → Vercel func  | Type-safe, tiny bundle, still free tier.                  |
| Gallery           | Cloudinary free tier                 | Off-load video/image traffic; shader background stays smooth. |
| Newsletter        | Buttondown API (free ≤ 1k subs)      | Webhook from serverless; no DB to maintain.               |
| Deploy            | Front: Vite → GH Pages, Back: Vercel | Both auto-deploy on main push.                            |

### 3. Component Architecture
```plaintext
src/
 ├─ assets/
 │  ├─ logo.svg (navy & red vectors)
 │  └─ shaders/ (only if custom uniforms needed)
 ├─ components/
 │  ├─ Hero.jsx ← Metaballs shader + text-reveal bit
 │  ├─ RegisterForm.jsx
 │  ├─ SessionCalendar.jsx
 │  ├─ Gallery.jsx ← Cloudinary gallery + glassmorphism cards
 │  ├─ Newsletter.jsx ← magnetic button bit
 │  └─ common/ (MagneticButton, GlassCard, etc.)
 ├─ hooks/
 │  ├─ useCloudinaryGallery.js
 │  └─ useButtondownSubscribe.js
 ├─ styles/
 │  └─ theme.css (CSS vars for colors)
 └─ api/
    └─ submit.js (Vercel serverless)
```

### 4. Shader Integration Details
- **Hero only** (performance budget)
- Props locked to brand: `<Metaballs colorBack="var(--cream)" colors={['var(--red)', 'var(--navy)']} count={6} size={0.75} speed={0.4} scale={1.2} />`
- Fallback: static PNG for `prefers-reduced-motion`.

### 5. ReactBits Pick-List
| Bit                 | Location                  | Purpose                     |
| ------------------- | ------------------------- | --------------------------- |
| Text-Reveal         | Hero headline             | animate “Level Up Every Sunday.” |
| Glassmorphism Card  | Session calendar tiles    | modern, sporty depth.       |
| Magnetic Button     | Register CTA & Newsletter | tactile feedback.           |
| Gradient Border     | Gallery items             | subtle premium feel.        |

### 6. Performance Guardrails
- Shader canvas limited to viewport height → `ResizeObserver` cleanup.
- <200 kB first JS bundle (Vite split chunks).
- WebP images, `loading="lazy"`, shader paused when off-screen via `IntersectionObserver`.
- 60 FPS budget: if `requestAnimationFrame` drops <45 fps for 3s, auto-fallback to static gradient.

### 7. Deployment Steps
1.  `pnpm create vite@latest 918-runs-shader --template react`
2.  `pnpm i @paper-design/shaders-react react-hook-form zod axios`
3.  Copy chosen ReactBits into `src/components/bits/`.
4.  Build serverless function `api/submit.js` (Zod validate → write JSON → POST Buttondown).
5.  GitHub repo + Vercel git integration (only `api/` folder serverless).
6.  GitHub Pages action pushes `dist/` on tag `v*`.

### 8. Success Criteria
- **Lighthouse**: perf ≥ 90, a11y ≥ 95, no CLS caused by shader canvas.
- **Interaction**: first visual paint <1.5s on 4G, shader starts <3s.
- **Registration**: same 70% conversion as static MVP.
- **Share-rate**: at least 5 IG story reposts/week tagged @918runswbb.
