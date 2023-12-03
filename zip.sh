#!/bin/sh

IMG_FILES="assets/images/round.png assets/images/round_result16.png assets/images/round_result32.png assets/images/round_result48.png assets/images/round_result64.png assets/images/round_result128.png assets/images/round_result256.png"
HTML_FILES="index.html"
JS_FILES="assets/js/index.js assets/js/content.js"
CSS_FILES="assets/css/popup.css assets/css/content.css"
EXT_FILES="$JS_FILES $HTML_FILES $IMG_FILES $CSS_FILES"
CHROME_FILES="$EXT_FILES manifest.json"
FIREFOX_FILES="$EXT_FILES"

NAME="foxford-tools"

rm -f $NAME.zip $NAME.xpi

7z a -tzip -mx9 -spf $NAME.zip $CHROME_FILES
