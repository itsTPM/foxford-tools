<img width="60" align="right" src="https://fox.itstpm.tech/logo.svg">

# Foxford Tools

_[README на русском](./README.md)_

### About this project

An unofficial extension that integrates into the Foxford online school website and extends functionality for students

Adds useful features to the site, including:

- success rate for homework and webinar tasks
- displaying the approximate reading time of an article in the "theory" tab
- the ability to add articles from the "theory" tab to bookmarks, which are displayed in the extension itself, with the title of the article, subject and a beautiful icon
- changing the page title from static "Foxford Online School" to more detailed ones to avoid confusion in the tabs (for example: "Calendar", "Home", "Plan for Today")
- a button to search for theory on the topic of the lesson in Google
- replacing yellow blocks in tasks with light gray ones

  and not only...

### Install

Installation can be done at [extension's website](https://fox.itstpm.tech/). The extension is available for both Chromium-based browsers (Chrome, Edge, Yandex and the like) and for Firefox

After installing the extension from the site, it will (well, at least should) update automatically

### Bugs and your ideas

you can post them in [Issues](https://github.com/itsTPM/foxford-tools/issues)

### Build extension manual

Steps to build the extension yourself (without using the installation from the website):

1. Make sure you have installed:
   1. [NodeJS](https://nodejs.org/en/download/prebuilt-installer) latest LTS or Current version
   2. [pnpm](https://pnpm.io) 9 or higher
2. Run `git clone https://github.com/itsTPM/foxford-tools.git` in the terminal to clone the repository
3. Make sure you are in the correct branch (most likely it will be the **main** branch)
4. Run `pnpm install` to install or update the project dependencies
5. Run `pnpm dev` to start the local HMR development server
6. Run `pnpm build:chrome` or `pnpm build:firefox` to build the extension for the corresponding browser. The **dist** folder will contain a build of the extension, which can be loaded into the browser using developer mode, or built into .crx using [extension-install-backend](https://github.com/itsTPM/extension-install-backend) + [extension-install-frontend](https://github.com/itsTPM/extension-install-frontend).
