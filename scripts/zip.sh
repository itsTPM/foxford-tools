#!/bin/sh
SRC_DIR="./src"

# [Chrome] Delete previous zip file & create new one
rm -f chrome-src.zip
7z a -tzip -mx9 chrome-src.zip ${SRC_DIR}/* -x!${SRC_DIR}/manifest-ff.json

# [Firefox] Delete previous zip file & create new one with deleted manifest.json & renamed manifest-ff.json to manifest.json
rm -f firefox-src.zip
7z a -tzip -mx9 firefox-src.zip ${SRC_DIR}/* -x!${SRC_DIR}/manifest.json
7z rn firefox-src.zip ${SRC_DIR}/manifest-ff.json ${SRC_DIR}/manifest.json
