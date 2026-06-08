//   - process.env.NODE_ENV — "development", "production", "test"
//   - process.env.PORT — port number for the dev server
//   - process.env.PUBLIC_PATH — the publicPath for Module Federation / asset loading
//   - process.env.API_URL — backend API base URL
//   - process.env.WEBPACK_SERVE — true when running via webpack-dev-server (built-in, no need to set)
//   - process.env.WEBPACK_BUILD — true when doing a production build (built-in)
//   - process.env.CI — set by CI/CD environments (GitHub Actions, Jenkins, etc.)

// ------------------------

Because Babel handles the conversion, not Node.

  - "type": "module" in package.json only affects how Node interprets .js files — that's the webpack config files,
    which run directly in Node.
  - The source files (bootstrap.js, App.js, Pricing.js) never touch Node directly. They go through
    webpack → babel-loader → @babel/preset-env, which transpiles all the import/export syntax into
    CommonJS require() calls before bundling.

  So two completely separate worlds:

  ┌──────────────┬────────────────────────────┬───────────────────────────────────┐
  │              │ Resolved by                │ Affects                           │
  ├──────────────┼────────────────────────────┼───────────────────────────────────┤
  │ Config files │ Node (package.json "type") │ webpack.dev.js, webpack.common.js │
  ├──────────────┼────────────────────────────┼───────────────────────────────────┤
  │ Source files │ Babel (webpack loader)     │ bootstrap.js, App.js, Pricing.js  │
  └──────────────┴────────────────────────────┴───────────────────────────────────┘

  The other packages (auth, container) also don't have "type": "module" and use import/export in their
  source just fine — same setup.

-------------------------------------