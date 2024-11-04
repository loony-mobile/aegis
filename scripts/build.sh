#!/usr/bin/env sh

cd ./android
./gradlew assembleRelease
mv ./app/build/outputs/apk/release/app-release.apk $HOME/Documents