#!/usr/bin/env sh

echo "Building new apk"
cd ./android
./gradlew assembleRelease
echo "Build completed"

rm -rf $HOME/Documents/app-release.apk
mv ./app/build/outputs/apk/release/app-release.apk $HOME/Documents
echo "Apk replaced/moved to $HOME/Documents"