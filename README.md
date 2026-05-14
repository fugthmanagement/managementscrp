# Fugth Management Next.js App

This folder is now a standalone Next.js App Router project prepared for Vercel.

## Included

- `app/`: landing page, login page, dashboard, and secure chat API route
- `components/`: auth providers, route protection, and dashboard UI
- `lib/firebase.js`: Firebase initialization using the requested config
- `.env.example`: environment variable template for Firebase and Gemini
- `index.html` and `fugthmanagement.html`: legacy static snapshots from the earlier export phase

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. When Vercel asks for the Root Directory, set it to `github/fugthmanagement` exactly.
4. Add environment variables:
	- `NEXT_PUBLIC_FIREBASE_API_KEY`
	- `GEMINI_API_KEY`
5. Deploy with the default Next.js settings.

## If Vercel keeps failing

- Do not point Vercel at the repository root if the app lives in `github/fugthmanagement`.
- Do not upload only the loose HTML files; the deployable app is the Next.js folder with `package.json`.
- Make sure Firebase Email/Password auth is enabled in Firebase Console.
- Add `NEXT_PUBLIC_FIREBASE_API_KEY` in Vercel before testing login.
- Add `GEMINI_API_KEY` in Vercel before testing the Executive AI Consultant tab.

## Local commands

- `npm install`
- `npm run dev`
- `npm run build`

## Notes

- The shell in this workspace did not have `node`, `npm`, or `pnpm`, so package installation and runtime verification could not be executed here.
- The auth layer includes a local fallback mode so the UI remains explorable before Firebase keys are configured.
