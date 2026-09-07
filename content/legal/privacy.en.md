# Privacy Policy

_Last updated: 7 September 2026_

Ttush Push does not collect, transmit, or store any personal information.

## The app cannot reach the network

This is not a promise about restraint; it is a property of the build. The released Android app declares no `android.permission.INTERNET`, so the operating system does not permit it to open a network connection at all. The permission appears only in the debug and profile builds, which the Flutter tooling uses for hot reload during development and which are never published.

iOS has no equivalent permission to withhold, so on iPhone the same claim rests on what the app is made of rather than on what the system refuses. The app bundles no networking library, and no part of it opens a connection. That is checkable rather than a promise: the [source is public](https://github.com/AndrewDongminYoo/ttush_push), and the dependency list, the rules engine's own manifest, and the absence of any HTTP or socket call in the app code all carry it.

There is therefore no analytics, no crash reporting, no advertising, and no third-party SDK receiving anything about you, on either platform.

## What is stored on your device

One value, and it never leaves the device:

- whether you have finished the first-play coach, so it does not reappear every time you open the game.

Match results, scores and settings are held in memory for the length of a session and are gone when the app closes. Removing the app removes the stored value with it.

## Children

The game has no accounts, no chat, no purchases and no advertising, and it collects nothing, so there is nothing to treat differently for younger players.

## Permissions

The released app requests no runtime permissions. It uses vibration through the standard platform haptics API, which needs no permission grant on Android or iOS.

## Changes

If a future version collects anything, this page will say so before that version ships, and the date above will change.

## Contact

Questions about this policy: [ydm2790@gmail.com](mailto:ydm2790@gmail.com)
