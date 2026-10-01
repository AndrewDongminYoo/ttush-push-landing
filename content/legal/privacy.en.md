# Privacy Policy

_Last updated: 1 October 2026_

Ttush Push asks for nothing about you and collects no name, account, contact detail or gameplay data. Starting with version 1.3.0, the app sends crash reports to Firebase Crashlytics unless you turn that off; a report carries diagnostic data and an identifier for the installation, as described below, and nothing else leaves the device. Versions before 1.3.0 make no network request at all.

## Crash reports

When the app crashes, or recovers from an internal failure, it sends a report so the problem can be fixed. A report holds:

- the stack trace, the state of the app and details of the device and operating system at the moment of the failure;
- for a failure the app recovered from, the error's text and a fixed label naming where in the app it happened;
- two identifiers that Crashlytics generates for the installation, used to count how many installations a crash affects. They single out the installation, not you: they are not tied to a name, an account, or the device's advertising identifier, and they change when the app is reinstalled.

A report never holds the board, the moves, the opponent, your name, or anything you entered, because the app has nothing to enter.

The reports go to Google's Firebase Crashlytics service, encrypted in transit, and Google processes them on the developer's behalf under the [Firebase privacy terms](https://firebase.google.com/support/privacy). Crashlytics keeps a report, and the identifiers stored with it, for 90 days and then removes them. The Firebase installation ID that identifies the installation is kept by Google for as long as the app stays installed: the app does not ask for its deletion, reinstalling the app creates a new one, and Google removes a deleted one within 180 days. No analytics service runs in the app, and the reports are not used for advertising.

The "Send crash reports" switch on the New Match screen is on by default. Turning it off stops the collection at once, discards any report the device still holds, and stays off until you turn it back on. A report that was already sent cannot be withdrawn from Google by the app.

## The app reaches the network only for crash reports

Starting with version 1.3.0 the released Android app declares `android.permission.INTERNET` and `android.permission.ACCESS_NETWORK_STATE`, which Crashlytics needs to send a report and to wait for a connection; before 1.3.0 it declared neither, and the operating system did not let it open a connection at all. iOS has no equivalent permission, so there the same claim rests on what the app is made of: the [source is public](https://github.com/AndrewDongminYoo/ttush_push), and the crash reporting SDK is the only dependency that opens a connection. There is no advertising SDK, no analytics SDK, and no server of the developer's own.

## What is stored on your device

Only these yes-or-no values, and none of them leaves the device:

- whether you have finished the first-play coach, so it does not reappear every time you open the game;
- whether sound is on, and whether haptics are on;
- whether play reminders are on, whether the app has already asked for permission to show them, and whether you have finished a match, which is when it first asks;
- whether crash reports are on, which the Crashlytics SDK stores for itself.

Crashlytics also keeps files of its own on the device: the two installation identifiers, and a report it has not sent yet, for example after a crash while offline. Turning crash reports off discards the unsent reports.

Match results and scores are held in memory for the length of a session and are gone when the app closes. Removing the app removes the stored values and the Crashlytics files with it.

## Play reminders

The app can remind you to play a day after you last opened it or finished a match. The operating system schedules and shows the reminder on the device, so nothing is sent anywhere; opening the app again moves it, and turning reminders off in the app cancels it.

## Children

The game has no accounts, no chat, no purchases and no advertising. The only thing it sends, a crash report, carries nothing about who is playing, so there is nothing to treat differently for younger players.

## Permissions

The one permission the app asks for is to show notifications, for the play reminder. It asks after your first finished match while reminders are on, or when you turn reminders on yourself, and the game plays the same if you refuse. On Android the system shows that question from Android 13; earlier versions allow notifications without asking.

On Android the app also declares permissions that need no grant: network access and network state for the crash reports, one to keep a pending reminder across a restart of the device, and vibration. Haptics use the standard platform haptics API on both platforms.

## Changes

If a future version collects anything more, this page will say so before that version ships, and the date above will change.

## Contact

Questions about this policy: [ydm2790@gmail.com](mailto:ydm2790@gmail.com)
