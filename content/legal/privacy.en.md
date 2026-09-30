# Privacy Policy

_Last updated: 30 September 2026_

Ttush Push does not collect, transmit, or store any personal information.

## The app cannot reach the network

This is not a promise about restraint; it is a property of the build. The released Android app declares no `android.permission.INTERNET`, so the operating system does not permit it to open a network connection at all. The permission appears only in the debug and profile builds, which the Flutter tooling uses for hot reload during development and which are never published.

iOS has no equivalent permission to withhold, so on iPhone the same claim rests on what the app is made of rather than on what the system refuses. The app bundles no networking library, and no part of it opens a connection. That is checkable rather than a promise: the [source is public](https://github.com/AndrewDongminYoo/ttush_push), and the dependency list, the rules engine's own manifest, and the absence of any HTTP or socket call in the app code all carry it.

There is therefore no analytics, no crash reporting, no advertising, and no third-party SDK receiving anything about you, on either platform.

## What is stored on your device

Only these yes-or-no values, and none of them leaves the device:

- whether you have finished the first-play coach, so it does not reappear every time you open the game;
- whether sound is on, and whether haptics are on;
- whether play reminders are on, whether the app has already asked for permission to show them, and whether you have finished a match, which is when it first asks.

Match results and scores are held in memory for the length of a session and are gone when the app closes. Removing the app removes the stored values with it.

## Play reminders

The app can remind you to play a day after you last opened it or finished a match. The operating system schedules and shows the reminder on the device, so nothing is sent anywhere; opening the app again moves it, and turning reminders off in the app cancels it.

## Children

The game has no accounts, no chat, no purchases and no advertising, and it collects nothing, so there is nothing to treat differently for younger players.

## Permissions

The one permission the app asks for is to show notifications, for the play reminder. It asks after your first finished match while reminders are on, or when you turn reminders on yourself, and the game plays the same if you refuse. On Android the system shows that question from Android 13; earlier versions allow notifications without asking.

On Android the app also declares permissions that need no grant: one to keep a pending reminder across a restart of the device, and vibration. Haptics use the standard platform haptics API on both platforms.

## Changes

If a future version collects anything, this page will say so before that version ships, and the date above will change.

## Contact

Questions about this policy: [ydm2790@gmail.com](mailto:ydm2790@gmail.com)
