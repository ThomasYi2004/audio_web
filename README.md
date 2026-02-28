# Voice Chat & Audio Demo Webapp

This Next.js project now includes a fully automatic **voice chat** interface
and a backup audio upload/player demo.  The browser uses the Web Speech API
for speech-to-text (STT) and the SpeechSynthesis API for text-to-speech (TTS);
the only server component is a simple Python FastAPI endpoint that generates
text replies.

## Voice Chat Features

- **Automatic speech detection:** recognition starts and stops without buttons
- **Browser-side STT:** recognized speech is converted to text locally
- **Server communication:** text is POSTed to `/reply` and the JSON reply is
  returned
- **Browser TTS:** server text is spoken automatically
- Works over `localhost` (https not required for development)

## Audio Upload Demo (legacy)

- Select an audio file to upload to `public/uploads`
- Uploaded files are listed and playable

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Python backend

The voice chat frontend sends recognized speech to `POST /reply` on a small
FastAPI server.  Start it separately (in a new shell):

```bash
cd server
python -m venv .venv        # optional
# activate the environment:
#   source .venv/bin/activate   (macOS/Linux)
#   .venv\Scripts\activate     (Windows PowerShell)
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

With both servers up, speak into your microphone and the app will reply
verbally.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
