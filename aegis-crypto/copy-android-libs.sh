#!/bin/bash


mkdir -p ../android/app/src/main/jniLibs

rm -rf ../android/app/src/main/jniLibs/*
echo "Removed packages"

mkdir -p ../android/app/src/main/jniLibs/x86
mkdir -p ../android/app/src/main/jniLibs/arm64-v8a
mkdir -p ../android/app/src/main/jniLibs/armeabi-v7a
mkdir -p ../android/app/src/main/jniLibs/x86_64

cp ./target/x86_64-linux-android/release/libaegis_crypto.so ../android/app/src/main/jniLibs/x86_64/libaegis_crypto.so