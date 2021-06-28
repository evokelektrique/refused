#!/bin/bash
echo "Compiling..."

# Compile
npx mix --production

# Zip
echo "Zipping..."

cd ./build/
zip -r -FS ./refused_build.zip *