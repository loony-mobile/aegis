# Android

```sh
rustup target add i686-linux-android
rustup target add arm-linux-androideabi
rustup target add armv7-linux-androideabi
rustup target add aarch64-linux-android
rustup target add x86_64-linux-android
# i686-linux-android arm-linux-androideabi armv7-linux-androideabi aarch64-linux-android x86_64-linux-android
```

The configurations listed are for different target architectures for Android builds, each corresponding to specific types of Android devices. Here's what each target represents:

1. **`aarch64-linux-android`**:

   - For 64-bit ARM architectures (commonly used in modern Android phones).
   - This is the appropriate choice for most contemporary Android devices with ARM64 processors.

2. **`arm-linux-androideabi`**:

   - For 32-bit ARM architectures.
   - Suitable for older Android devices or those still using 32-bit processors.

3. **`i686-linux-android`**:

   - For 32-bit Intel x86 architectures.
   - Some Android devices with Intel processors might use this target.

4. **`x86_64-linux-android`**:

   - For 64-bit Intel x86 architectures.
   - Rarely used in consumer Android devices but can be relevant for emulators or certain specialized devices.

5. **`armv7-linux-androideabi`**:
   - Synonym for `arm-linux-androideabi` (32-bit ARM). It’s common for cross-compilation to represent the same 32-bit ARM target in this way.

### Which one is meant for Android phones?

- **Most modern Android phones**: Use `aarch64-linux-android` (64-bit ARM).
- **Older or budget Android phones**: Use `arm-linux-androideabi` or `armv7-linux-androideabi` (32-bit ARM).
- **Special cases (Intel-based devices or emulators)**: Use `i686-linux-android` or `x86_64-linux-android`.

If you're targeting a broad range of Android devices, building for both `aarch64-linux-android` and `arm-linux-androideabi` will cover the majority of devices.
