# Phase 0: Research & Discovery

## Objective
Validate the technical approach outlined in the implementation plan against the feature specification and constitutional requirements.

## Key Findings

1.  **Wow-Factor on a Budget**: The core challenge is delivering a visually rich, modern user experience without incurring costs. The proposed stack directly addresses this by combining a free-tier frontend (GitHub Pages), backend (Vercel Serverless Functions), and media hosting (Cloudinary) with high-impact, low-footprint libraries.

2.  **Performance is Key**: The use of shaders (`@paper-design/shaders-react`) and micro-interactions (`reactbits.dev`) introduces performance risks. The plan correctly identifies these risks and proposes specific guardrails, such as `IntersectionObserver` for pausing off-screen animations and a hard FPS budget with a static fallback. This aligns with the constitutional need for a fast, accessible user experience.

3.  **Decoupled & Maintainable**: The architecture is well-defined.
    *   **Styling**: CSS Modules and CSS variables prevent style conflicts and make theme changes trivial.
    *   **Forms**: `react-hook-form` and `Zod` provide a robust, type-safe way to handle user input, decoupling the frontend from the backend data submission logic.
    *   **Backend**: A single serverless function for form submission is simple, scalable, and fits within Vercel's free tier. It acts as a lightweight bridge to the Buttondown API, avoiding the need for a dedicated database.

## Technology Validation

| Technology                    | Purpose                      | Alignment & Justification                                                                 |
| ----------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| Vite + React                  | UI Runtime                   | Excellent developer experience (HMR) and optimized builds are perfect for a fast SPA.     |
| `@paper-design/shaders-react` | Hero Visuals                 | Provides the desired "metaball" effect with minimal setup and acceptable performance.     |
| `reactbits.dev`               | Micro-interactions           | Tree-shakeable, copy-paste components that add polish without significant bundle size increase. |
| Cloudinary                    | Media (Player Highlights)    | Free tier is generous. `f_auto,q_auto` transformations will optimize delivery and save bandwidth. |
| Buttondown                    | Newsletter Management        | Simple API, generous free tier (≤ 1k subscribers), and can be triggered by a simple webhook. |
| Vercel Serverless             | Backend Logic                | The perfect "tiny Node layer" described in the spec. Handles the single API endpoint for free. |

## Conclusion
The proposed technical plan is sound and directly aligns with the project's goals and constraints. It balances the desire for a modern, engaging frontend with the hard requirement of zero operational cost. The identified performance risks are manageable with the proposed guardrails.
