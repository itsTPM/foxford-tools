<img width="96" src="src/assets/logo.svg">

# Foxford Tools

_[README на русском](./README.md)_

[![Available in the Chrome Web Store](https://developer.chrome.com/static/docs/webstore/branding/image/UV4C4ybeBTsZt43U4xis.png)](https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm)

## About the Project

An unofficial browser extension that integrates into the Foxford online school website and expands functionality for students.

Adds useful features to the site, including:

- Displaying the success percentage for homework and webinar assignments
- Setting clear page titles on different tabs (e.g., "Homework," "Webinar," "Grades")
- Ability to bookmark theory articles under lessons
- A button to search Google for theory related to the lesson topic
- Changing the background color of input fields and dropdown lists in tasks to a neutral tone
- Displaying estimated reading time for theory

and more...

## Installation

Chromium-based browsers (Google Chrome, Microsoft Edge, Opera, and others) -- [Chrome Web Store](https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm)

<!--Firefox - [Mozilla Addons]()-->

## Local Development

Development requires:

- [Node.js 24](https://nodejs.org/en/download) with `corepack`
- bash

### Setup

- `pnpm install` - install dependencies, generate types and hooks
- `pnpm generate-icons` - generate .png icons from svg
- `pnpm subset-fonts` - subset fonts to basic Cyrillic and Latin characters

### Development

- `pnpm dev` - start dev server and open browser (Chrome)
- `pnpm dev:firefox` - start dev server and open browser (Firefox)
- `pnpm test` - run tests

### Build

- `pnpm build` - build to .output (Chrome)
- `pnpm build:firefox` - build to .output (Firefox)
- `pnpm zip` - archive build in .output (Chrome)
- `pnpm zip:firefox` - archive build and source code in .output (Firefox)
