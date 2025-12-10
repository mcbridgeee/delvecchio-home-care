# quality-gates-starter

a reusable setup script that starts a complete eleventy web project with modern development tooling, automated formatting, linting, and ci/cd pipelines.  
this repo lets you create clean, production-ready projects in seconds, without configuring anything by hand.

---

## what this script sets up for you

running `setup-quality-gates.sh` generates a full development environment including:

### eleventy project structure
- `eleventy.config.js`
- `src/` folder with:
  - starter layout (`_includes/layouts/base.njk`)
  - starter homepage (`index.njk`)
  - starter stylesheet (`style.css`)

### code quality tools
- prettier (`.prettierrc`, `.prettierignore`)
- eslint v8 (`.eslintrc.cjs`, `.eslintignore`)
- stylelint (`.stylelintrc.json`, `.stylelintignore`)
- unified formatting + linting scripts added to `package.json`

### automation & safety
- husky pre-commit hook  
  - blocks commits that fail formatting or linting  
- lighthouse ci (`lighthouserc.json`)  
  - automated checks for performance, accessibility, best practices, and seo

### github actions ci/cd
created automatically at:
.github/workflows/ci-cd.yml

this pipeline:
- installs dependencies  
- runs prettier checks  
- runs eslint + stylelint  
- builds the eleventy site  
- runs lighthouse ci  
- deploys to github pages if everything passes  

---

## how to use this script

inside any new project folder:

`cp ~/quality-gates-starter/setup-quality-gates.sh .`
`chmod +x setup-quality-gates.sh`
`./setup-quality-gates.sh`

that’s it.  
you now have a full eleventy project with quality gates.

## available npm scripts

after running the setup script, your project will include:

| command | description |
|--------|-------------|
| `npm run dev` | start eleventy with live reload |
| `npm run build` | production eleventy build |
| `npm run format` | auto-format all code (prettier) |
| `npm run format:check` | check formatting without writing changes |
| `npm run lint` | run eslint + stylelint |
| `npm run lint:js` | js lint only |
| `npm run lint:css` | css lint only |
| `npm run lhci` | run lighthouse ci locally |
| `npm run precommit` | formatting + linting gate (run automatically by husky) |

## why this exists

setting up a proper web dev environment means juggling:

- config files  
- linters  
- formatters  
- hooks  
- ci pipelines  
- eleventy folders  

this script makes all of that happen with one command, so you can focus on design, ux, and actual development instead of configuration.

## .°• license •°.

free to use for personal or commercial projects.

## ✨🐸 credits 🐸✨

created by bridget as part of a personal tooling initiative.  
feel free to extend it and make it your own.


```bash

sjolder:
