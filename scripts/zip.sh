#!/bin/sh

NAME="foxford-tools"

cd ../src

rm -f ../$NAME.zip

7z a -tzip -mx9 -spf ../$NAME.zip *