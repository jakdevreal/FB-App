# FB-App

A minimal web app that uses a public Google Cloud project ID to connect to a Firebase Hosting app.

The page shows the project ID and connection status, with a refresh button and a link to the Firebase app. It fetches `https://<projectId>.web.app/lab-status.json` and checks that the response identifies the expected project.

## Run

Use Node.js 22.12+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173.

## Build

```sh
npm run build
npm run preview
```

The static output is in `dist/`. The preview runs at http://127.0.0.1:4173.

## Configuration

Set `projectId` in `lab-config.json` to change the Firebase project. The project ID is public and is included in the browser bundle. The linked status endpoint must allow cross-origin requests.

For a local companion app, set `VITE_FIREBASE_ORIGIN` before starting Vite:

```sh
VITE_FIREBASE_ORIGIN=http://127.0.0.1:5174 npm run dev
```

This repository contains only the portal. The companion Firebase app is hosted separately at https://gva-lab-261102-a7c9.web.app.
