#!/bin/sh

# Fix update url for Chrome manifest
sed -i 's/updates\.xml\/updates\/updates.xml/g' temp-chrome-manifest.json

# Fix update url for Firefox manifest
sed -i 's/updates\.json/src\/updates\/updates.json/g' temp-ff-manifest.json

IMG_FILES="../assets/images/round.png ../assets/images/round_result16.png ../assets/images/round_result32.png ../assets/images/round_result48.png ../assets/images/round_result64.png ../assets/images/round_result128.png ../assets/images/round_result256.png"
HTML_FILES="./index.html"
JS_FILES="../assets/js/index.js ../assets/js/content.js"
CSS_FILES="../assets/css/popup.css ../assets/css/content.css"
EXT_FILES="$JS_FILES $HTML_FILES $IMG_FILES $CSS_FILES"
CHROME_FILES="$EXT_FILES temp-chrome-manifest.json ../src/updates/updates.xml"
FIREFOX_FILES="$EXT_FILES temp-ff-manifest.json ../src/updates/updates.json ../src/icons/bypass-dark.png"

NAME="output/foxford-tools"

# Remove existing files
rm -f $NAME.crx $NAME.xpi

# Generate Chrome .crx
7z a -tzip -mx9 $NAME.crx $CHROME_FILES
7z rn $NAME.crx temp-chrome-manifest.json manifest.json

# Generate Firefox .xpi
7z a -tzip -mx9 $NAME.xpi $FIREFOX_FILES
7z rn $NAME.xpi temp-ff-manifest.json manifest.json

# Remove temp files
echo "\nDeleting temp files..."
rm -v temp-chrome-manifest.json temp-ff-manifest.json