# The Couch

Pull a random psychology topic — grounded in real, current research pulled from
Semantic Scholar / Crossref — with an AI-generated explanation, key theories,
modern applications, and ready-to-post content ideas for Instagram, YouTube,
and LinkedIn.

## How it works

1. You (or your friend) click **New topic**.
2. The server picks a random topic from `lib/topics.js` (54 topics across
   9 categories: cognitive biases, attachment theory, social psychology,
   learning theories, personality, developmental psychology, neuroscience,
   clinical psychology, research methods).
3. It searches Semantic Scholar (falling back to Crossref) for real, recent
   papers on that topic.
4. It sends the topic + real paper abstracts to a free AI model (Groq) and
   asks it to write a plain-English summary, key theories, modern
   applications, and content ideas — grounded in the actual research, not
   invented.
5. The references shown are the real papers fetched in step 3, with working
   links — not AI-generated citations.

Your AI API key stays on the server (as an environment variable). It is never
sent to the browser, so it's safe to share the live link with your friend.

## Run it locally

```bash
npm install
cp .env.example .env.local
# paste your free Groq key into .env.local
npm run dev
```

Open http://localhost:3000.

## Get a free Groq API key

1. Go to https://console.groq.com/keys
2. Sign up (free) and create an API key.
3. Paste it into `.env.local` as `GROQ_API_KEY=...` (locally) or into Vercel's
   environment variables (when deployed — see below).

Groq's free tier has daily rate limits but no cost. If your friend posts a lot
and you hit the limit, `lib/ai.js` has a `MODEL` constant at the top you can
swap, or you can switch providers later (e.g. Gemini) by editing
`lib/ai.js` only — nothing else needs to change.

## Deploy it so your friend can just visit a link

You said you already have GitHub — that's all you need to get a Vercel
account (it signs up via GitHub in one click).

1. **Push this folder to a new GitHub repo:**
   ```bash
   cd the-couch-app
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create the-couch --public --source=. --push
   ```
   (No `gh` CLI? Create an empty repo on github.com, then:
   `git remote add origin <your-repo-url>` and `git push -u origin main`.)

2. **Go to https://vercel.com** → "Sign up with GitHub" → "Add New Project"
   → select the `the-couch` repo → it auto-detects Next.js, no config needed.

3. Before clicking Deploy, open **Environment Variables** and add:
   - `GROQ_API_KEY` = your key from console.groq.com

4. Click **Deploy**. In under a minute you'll get a live URL
   (like `the-couch.vercel.app`) — send that to your friend. Every time you
   push to GitHub, Vercel redeploys automatically.

## Editing the topic list

Open `lib/topics.js` — each entry is `{ id, cat, name, seed }`. `seed` is the
search query sent to the research APIs, so keep it short and specific. Add a
new category by adding it to `CATEGORIES` too.

## Notes

- Semantic Scholar and Crossref are free and don't require API keys, but they
  are rate-limited — fine for a single content creator's usage, not built for
  high traffic.
- If a topic search comes back with no recent papers with abstracts, the app
  falls back to grounding the explanation in established theory and says so
  in the references section, rather than inventing sources.
