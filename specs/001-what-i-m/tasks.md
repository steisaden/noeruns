# Phase 2: Task Breakdown

This document breaks down the implementation of the "918 Runs Shader MVP" into actionable tasks.

## Phase 2.1: Project Foundation
- [ ] **Task 01**: Initialize Vite project using `pnpm create vite@latest 918-runs-shader --template react`.
- [ ] **Task 02**: Install all dependencies (`@paper-design/shaders-react`, `react-hook-form`, `zod`, `axios`).
- [ ] **Task 03**: Create the directory structure as defined in `plan.md` (components, hooks, styles, api).
- [ ] **Task 04**: Create `src/styles/theme.css` and populate with brand color CSS variables (`--navy`, `--red`, `--cream`).
- [ ] **Task 05**: Set up Prettier and ESLint for code quality.

## Phase 2.2: Core Components
- [ ] **Task 06**: **Component: `Hero.jsx`**
    - [ ] Integrate `<Metaballs>` from `@paper-design/shaders-react`.
    - [ ] Lock props to brand colors and settings from `plan.md`.
    - [ ] Implement the "Text-Reveal" ReactBit for the headline.
    - [ ] Add `prefers-reduced-motion` media query to show a static fallback.
    - [ ] Implement `IntersectionObserver` to pause the shader when not visible.
- [ ] **Task 07**: **Component: `RegisterForm.jsx`**
    - [ ] Build the form UI with fields defined in `data-model.md`.
    - [ ] Integrate `react-hook-form` for state management.
    - [ ] Use `Zod` and `RegistrationSchema` for client-side validation.
    - [ ] On successful submission, POST data to the `/api/submit` endpoint.
    - [ ] Implement the "Magnetic Button" ReactBit for the submit button.
- [ ] **Task 08**: **Component: `SessionCalendar.jsx`**
    - [ ] Fetch session data (from a local JSON file for now).
    - [ ] Display available sessions using the "Glassmorphism Card" ReactBit.
    - [ ] Handle session selection, passing `sessionId` to the `RegisterForm.jsx`.
- [ ] **Task 09**: **Component: `Gallery.jsx`**
    - [ ] Create `useCloudinaryGallery.js` hook to fetch video/image data.
    - [ ] Display items in a masonry layout.
    - [ ] Apply the "Gradient Border" ReactBit to gallery items.
    - [ ] Ensure images are lazy-loaded.
- [ ] **Task 10**: **Component: `Newsletter.jsx`**
    - [ ] Create a simple form with an email input.
    - [ ] Use the "Magnetic Button" for the subscribe action.
    - [ ] On submit, POST to a dedicated newsletter endpoint or the main `/api/submit` function.

## Phase 2.3: Backend & Deployment
- [ ] **Task 11**: **API: `api/submit.js`**
    - [ ] Create the Vercel serverless function.
    - [ ] Use `RegistrationSchema` to validate incoming `req.body`.
    - [ ] On valid submission, make a POST request to the Buttondown API.
    - [ ] Add environment variable for `BUTTONDOWN_API_KEY`.
    - [ ] Return a structured JSON response (success or error).
- [ ] **Task 12**: **Deployment: GitHub Pages**
    - [ ] Create a GitHub Actions workflow (`.github/workflows/deploy.yml`).
    - [ ] Configure the action to build the Vite app (`pnpm build`).
    - [ ] Configure the action to deploy the `dist/` folder to the `gh-pages` branch.
- [ ] **Task 13**: **Deployment: Vercel**
    - [ ] Create a new Vercel project linked to the GitHub repository.
    - [ ] Configure Vercel to only use the `api` directory for serverless functions.
    - [ ] Set the `BUTTONDOWN_API_KEY` secret in the Vercel project settings.

## Phase 2.4: Finalization & Verification
- [ ] **Task 14**: **Performance Audit**: Run Lighthouse and verify all performance guardrails from `plan.md` are met.
- [ ] **Task 15**: **Testing**: Manually test all user stories and acceptance criteria from `spec.md`.
- [ ] **Task 16**: **Documentation**: Update `README.md` with setup and deployment instructions.
