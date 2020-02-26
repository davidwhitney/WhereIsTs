# WhereIsTs
TypeScript port of Azure Functions "/whereis" slackbot

# Development

Just work in TypeScript with a test runner.

To run with the GCP cloud functions emulator run:

```bash
npm run watch
```

It'll watch for ts changes and start the emulator when they occur.

# Deployment

On the commandline, run

```bash
npm run build
```

Which invokes tsc, and outputs files into the /dist folder.
These files are *not* bundled, but should be checked into the repo to "release".

The "active" version of the app, is the one checked in to /dist.

This may seem a little counter-intuitive, but it allows us to mirror this repository to
Google cloud functions, and allow GCP to cache / restore the node_modules instead of us pushing ~120mb artifacts.

**Push to GCP to deploy**