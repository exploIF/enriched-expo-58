# expo-58

A minimal example of [`react-native-enriched-html`](https://docs.swmansion.com/react-native-enriched-html/) running on Expo SDK 58 (React Native 0.88). It renders a rich-text editor (`EnrichedTextInput`) with a formatting toolbar, mentions, links and sample documents, plus a read-only preview (`EnrichedText`).

## Prerequisites

- Node.js (LTS) and npm
- For iOS: macOS with Xcode and CocoaPods
- For Android: Android Studio with an SDK and an emulator or a connected device

`react-native-enriched-html` contains native code, so the app **does not run in Expo Go**. You need a development build (`expo-dev-client` is already installed).

## Getting started

```bash
npm install
```

### Generate the native projects (prebuild)

The `ios/` and `android/` folders are not committed — they are generated from `app.json` and the installed packages (Continuous Native Generation):

```bash
npx expo prebuild                      # both platforms
npx expo prebuild --platform ios       # or just one
npx expo prebuild --clean              # wipe and regenerate from scratch
```

Re-run prebuild (preferably with `--clean`) whenever you change `app.json` or add/update a package with native code. Don't edit `ios/` or `android/` by hand — changes are lost on the next prebuild.

### Run on iOS

```bash
npm run ios        # npx expo run:ios
```

### Run on Android

```bash
npm run android    # npx expo run:android
```

These commands compile the native app and install it on the simulator/emulator (they also run prebuild automatically if the native folder is missing).

After the development build is installed, you only need the dev server for JavaScript changes:

```bash
npm start          # npx expo start
```
