# Development Guide

Technical reference for running and contributing to this portfolio project.

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Git | any recent version |

> **Note:** An Anthropic API key is required to use the AI chat feature. Without it the rest of the portfolio runs fine, but the chat assistant will return a 500 error.

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Jamil-Mouad/portfolio.git
cd portfolio

# 2. Move into the app directory
cd app

# 3. Install dependencies
npm install

# 4. Create your environment file
cp .env.example .env   # or create .env manually (see below)

# 5. Start the development server
npm run dev
```

The Vite dev server starts on **http://localhost:5173**.
The API proxy forwards `/api/*` requests to the local edge-function runtime on **port 3001**.

---

## Environment Variables

Create an `app/.env` file with the following:

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key. Get one at [console.anthropic.com](https://console.anthropic.com). |

Example `.env`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

> **Warning:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Project Structure

```
portfolio/
├── api/
│   └── chat.js            # Vercel Edge Function — streams Claude API responses via SSE
├── app/
│   ├── src/
│   │   ├── sections/      # Page-level section components (Hero, About, Projects, Chat, etc.)
│   │   ├── components/    # Shared UI components and Radix UI wrappers
│   │   │   └── ui/        # Primitive components (Button, Card, Dialog, etc.)
│   │   ├── data/          # Static data (projects list, skills, social links)
│   │   ├── config/        # App-level configuration
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   ├── public/
│   │   └── cv.pdf         # Downloadable CV
│   ├── Dockerfile         # Multi-stage build: Vite build → Nginx static server
│   ├── nginx.conf         # Nginx config for SPA routing
│   └── vite.config.ts     # Vite config including /api proxy to localhost:3001
├── scene.splinecode        # Spline 3D scene file
└── vercel.json            # Vercel build config and API/SPA routing rewrites
```

---

## Available Scripts

Run these from inside the `app/` directory:

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Starts Vite HMR dev server on port 5173 |
| Production build | `npm run build` | TypeScript check + Vite production bundle to `dist/` |
| Preview build | `npm run preview` | Serves the production `dist/` locally |
| Lint | `npm run lint` | Runs ESLint with TypeScript and React rules |

---

## API

### `POST /api/chat`

Vercel Edge Function defined in `api/chat.js`.

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "Tell me about your projects." }
  ]
}
```

**Response:** `text/event-stream` (Server-Sent Events)

Each event has the shape:
```
data: {"content": "chunk of text"}

data: {"done": true}
```

**How it works:**
1. Validates `ANTHROPIC_API_KEY` is set
2. Forwards `messages[]` to the Anthropic Messages API with `stream: true`
3. Transforms Anthropic's SSE format into a simplified `{ content }` / `{ done }` stream
4. Returns the stream with `Content-Type: text/event-stream`

**Local proxy:** `vite.config.ts` proxies `/api` → `http://localhost:3001` during development so the same fetch calls work in both dev and production.

---

## Docker

Build and run the portfolio as a self-contained Docker image using the existing `app/Dockerfile` and `app/nginx.conf`:

```bash
# Build the image (run from the repo root)
docker build -t portfolio ./app

# Run the container
docker run -p 8080:80 \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  portfolio
```

The app will be available at **http://localhost:8080**.

The multi-stage Dockerfile:
1. **Build stage** — installs dependencies and runs `npm run build`
2. **Serve stage** — copies `dist/` into an Nginx image configured by `nginx.conf` for SPA routing

---

## Deployment (Vercel)

1. **Connect your GitHub repository** in the Vercel dashboard (import project)
2. **Set the environment variable** `ANTHROPIC_API_KEY` in _Project → Settings → Environment Variables_
3. **Deploy** — Vercel uses `vercel.json` to:
   - Run `cd app && npm install && npm run build` as the build command
   - Serve `app/dist/` as the output directory
   - Route `/api/*` requests to the Edge Functions in `api/`
   - Rewrite all other paths to the SPA entry point

Every push to your default branch triggers an automatic redeploy.
