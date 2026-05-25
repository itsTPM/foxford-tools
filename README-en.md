<img width="96" src="src/assets/logo.svg">

# Foxford Tools

_[README на русском](./README.md)_

<a href="https://chromewebstore.google.com/detail/foxford-tools/mmhgkmkmoepfpcakdkajpendcnjichhm">  
  <img src=".github/assets/google.png" alt="Available in the Chrome Web Store" height="58">
</a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/foxford-tools/">
  <img src=".github/assets/mozilla.png" alt="Available in the Firefox Add-ons" height="58">
</a>

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

Mozilla Firefox - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/foxford-tools/)

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
