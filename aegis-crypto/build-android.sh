#!/bin/bash

# NDK_TARGET="x86_64-linux-android"

NDK_TARGET="aarch64-linux-android"

# if [ "$TARGET" = "arm-linux-androideabi" ]; then
#     NDK_TARGET="armv7a-linux-androideabi"
# fi

API_VERSION="21"
NDK_VERSION="26.1.10909125"
NDK_HOST="linux-x86_64"

if [ -z "$NDK"]; then
    NDK="$ANDROID_HOME/ndk/$NDK_VERSION"
fi

TOOLS="$NDK/toolchains/llvm/prebuilt/$NDK_HOST"

AR=$TOOLS/bin/llvm-ar \
CXX=$TOOLS/bin/${NDK_TARGET}${API_VERSION}-clang++ \
RANDLIB=$TOOLS/bin/llvm-ranlib \
CXXFLAGS="--target=$NDK_TARGET" \
cargo build --target $NDK_TARGET --release $EXTRA_ARGS 

# ./build-android.sh x86_64-linux-android