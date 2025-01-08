#!/usr/bin/env sh

emulator @pixel_7_pro &
sleep 15  # Wait for the emulator to start

echo "Reverse tcp:8010 tcp:8010"
adb -s emulator-5554 reverse tcp:8010 tcp:8010

echo "Clean cache and run android"
npm cache clean --force
npm run android