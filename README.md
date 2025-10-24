# AngularJS -> React Micro-frontend Migration Scaffold

This repo contains a scaffold to run the original AngularJS app and introduce React microfrontends incrementally.

Structure:
- `angularjs-app/` - moved AngularJS app (templates, scripts, assets)
- `react-app/` - placeholder for new React microfrontends
- `shell/` - application shell to host microfrontends
- `shared/` - shared utils/services

Quick run:
- Serve `angularjs-app` static files: `npx serve angularjs-app`
- Serve `shell`: `npx serve shell`

Integration approaches:
- Simple: iframe/embed AngularJS app into shell and mount React build into a div.
- Recommended: use single-spa or Webpack Module Federation for integrated routing and shared dependencies.

Next recommended tasks:
1. Initialize `react-app` with a real build (CRA or Vite).
2. Expose a mount/unmount API for the React build.
3. Configure the shell to load microfrontends dynamically (import maps / module federation / single-spa).
4. Start migrating components/routes from AngularJS to React and load them via the shell.

## Webpack Module Federation Setup

To run the shell and React microfrontend with Module Federation:

1. Install dependencies in both `shell` and `react-app`:
   ```powershell
   cd shell
   npm install
   cd ../react-app
   npm install
   ```
2. Start both apps in separate terminals:
   ```powershell
   cd shell
   npm start
   # In another terminal
   cd ../react-app
   npm start
   ```
3. Open http://localhost:9000 for the shell. It will dynamically load the React microfrontend from http://localhost:9001.

You can now share dependencies and dynamically load React components from the shell using Module Federation.

## Start each app with `npm start`

To make running easier, you can start each application by running `npm start` inside the respective folder:

PowerShell example:

```powershell
cd angularjs-app
npm install    # installs http-server used by start script
npm start      # serves AngularJS app on http://localhost:8080

# In another terminal
cd react-app
npm install
npm start      # starts webpack dev server on http://localhost:9001

# In another terminal
cd shell
npm install
npm start      # starts shell on http://localhost:9000
```

Open the shell at http://localhost:9000. The shell will load the React remote from http://localhost:9001 and you can also open the AngularJS app directly at http://localhost:8080.
