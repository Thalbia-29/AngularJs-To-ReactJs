# Shell

This shell hosts microfrontends.

How to try locally:
1. Serve `angularjs-app` static files (for example `npx serve angularjs-app`).
2. Serve `shell` (for example `npx serve shell`).
3. Optionally build a React app and mount it into `shell/index.html`.

Next steps in migration:
- Create a dedicated React app in `react-app/` (use CRA or Vite).
- Expose a mount function from the React build so the shell can mount/unmount it.
- Consider single-spa or Module Federation for advanced integration.
