#!/bin/bash

# Clean Up
echo "Removing ./build folder"
rm -rf ./build

# Compile
echo "Compiling..."
npx mix --production

# Zip
echo "Zipping..."
cd ./build/
zip -r -FS ./refused_build.zip *