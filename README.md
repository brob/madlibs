# Madlib generator with Sanity, Netlify, and 11ty Serverless

This repository is a demo for this Smashing Magazine article.

🎉 [Try the Demo here](https://brob.dev/madlibs).


It creates a madlib generator that stores madlib templates and user-generated madlibs in a Sanity content lake. It builds static and server-rendered pages with 11ty, and uses Netlify On-Demand builders and serverless functions to add interactivity.

## Installation

### Configuring the studio

```bash
cd studio
npm install -g @sanity/cli
sanity install
sanity init
```

The Sanity CLI will prompt to reconfigure the studio. You _do_ want to do this. Attach it to a Sanity project you own with a blank dataset.

### Running the site locally

The site requires the Netlify CLI tool to manage serverless functions and environment variables. If you don't have that installed globally run `npm install -g netlify-cli`.

```bash
cd site
npm install
netlify dev
```

To pull data from YOUR Sanity project, you need to change the project ID from `/site/utils/sanityClient.js`. You'll also need to create an Editor token from your [Sanity dashboard](https://sanity.io/manage) and create a new environment variable in your [Netlify](https://netlify.com) project. 

## Deployment
This repository contains two separate sites: the 11ty `site` and Sanity `studio`. It's not currently set up as a monorepo. The `site` directory is set to deploy to Netlify. The `studio` directory currently does not have deployment set up, but can be run locally or deployed to Sanity's hosted service with `sanity deploy`.

