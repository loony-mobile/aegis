rustup target add aarch64-apple-ios x86_64-apple-ios
rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android i686-linux-android

# For iOS

cargo build --release --target=aarch64-apple-ios

# For Android

cargo build --release --target=aarch64-linux-android
