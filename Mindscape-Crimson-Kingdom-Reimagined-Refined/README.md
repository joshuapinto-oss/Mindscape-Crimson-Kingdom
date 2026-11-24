# Mindscape — Crimson Kingdom of Psychology

An extension of the existing Mindscape React application. The original nine chapters and their story-world experience remain in place; three additional PDF-derived chapters are integrated separately.

## Added chapters

1. **The Emergence of Psychology** — Greek and philosophical roots, mind–body positions, physiological and evolutionary roots, schools and forces, paradigms, Indian concepts of self and the development of psychology in India.
2. **The Biological Basis of Behaviour** — neurons and action potentials, synapses and neurotransmitters, nervous-system divisions, brain structures, cortical localisation, language, brain research methods, memory and plasticity, endocrine functions, sensory systems and behaviour genetics. The supplied PDF page headed “Sleep, Hunger, Thirst and Sex” contains no readable explanatory text, so the chapter does not invent detailed claims for that page.
3. **Cognitive Psychology** — psychophysics, signal detection, pain, attention, perception, learning, conditioning, memory, intelligence, concepts, problem-solving, reasoning, decision-making, language, creativity, metacognition and machine minds.

The additions create a total of **12 chapters**, **41 learning topics**, and a **44-question final assessment**. All new chapters use the existing chapter data model, interactive story scene, topic tabs, revealable knowledge checks, completion tracking, map pins, chapter index and assessment flow.

## Technology

- React + TypeScript
- Vite
- Tailwind CSS (existing Vite integration)
- Framer Motion
- Lucide React
- Browser LocalStorage for progress and assessment history

## Run locally

Use Node.js 20 or newer and npm. From the project root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production site to `dist/`. The Vercel build command is `npm run build`; the output directory is `dist`; the framework preset is **Vite**.

## Deploy to the existing Vercel website safely

This project is intended to update the existing GitHub repository already connected to the Mindscape Vercel project. It does not require a new domain or Vercel project.

1. Download and extract this ZIP.
2. Keep a backup of the current GitHub repository (or create a branch) before replacing files.
3. In the existing repository, replace the tracked project files with the contents of this ZIP. Do not upload `node_modules` or `dist`; both are generated locally/at build time.
4. Preserve any repository-specific environment variables or Vercel settings that are not part of this project. This application does not require an API key or backend service.
5. Commit and push to the same connected repository and deployment branch:

   ```bash
   git add -A
   git commit -m "Add three Mindscape psychology chapters"
   git push origin main
   ```

   If your deployment branch is not `main`, use the branch connected to your existing Vercel project.
6. Open the existing Vercel project and confirm the new deployment succeeds. The same domain will update when the deployment is promoted.

If you prefer GitHub’s web interface, upload/replace the extracted project files in the same repository, commit the changes, and allow the existing Vercel integration to deploy.

## Progress tracking

Chapter-topic completion and assessment attempts are stored in browser LocalStorage under `mindscape-progress`. Progress is local to the browser/device and is not synchronised across devices or accounts. Existing progress keys for the original chapters remain compatible; the three new chapters use their own IDs (`emergence`, `biological`, `cognitive`).

## Source integration notes

The three supplied PDFs were transformed into separate chapter content rather than displayed as raw PDF text. Key names, definitions, models, examples, dates and classifications have been retained in the learning explanations and checks. Where the source page provides only a heading without readable details, the site avoids adding unsupported source-specific claims.
