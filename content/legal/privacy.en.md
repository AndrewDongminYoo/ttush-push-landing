# Privacy Policy

_Last updated: 1 October 2026_

Ttush Push asks for nothing about you and collects no name, account, contact detail or gameplay data. Starting with version 1.3.0, the app carries Google's Firebase Crashlytics crash reporting, which is on unless you turn it off. While it is on, the app contacts Crashlytics each time it starts and reports its failures to it; what that carries is diagnostic data and an identifier for the installation, as described below. Nothing else in the app sends anything. Versions before 1.3.0 make no network request at all.

## Crash reporting

This section describes what the reporting software sends, as read from its source code and from Google's own disclosure for the versions the app uses. The software is Google's and Google can change it; if that changes what is sent, this page changes with it.

Each time the app starts, whether or not it has ever failed, the reporting software registers the installation with Google, fetches its own settings, and records that a session started, so that Crashlytics can say what share of sessions ran without a crash. These requests hold:

- two identifiers that Crashlytics generates for the installation, used to count sessions and how many installations a crash affects. They single out the installation, not you: they are not tied to a name, an account, or the device's advertising identifier, and they change when the app is reinstalled;
- a random identifier for the session and the time it started;
- the app's version, the make and model of the device and the version of its operating system;
- the language and region the device is set to and its time zone, and on Android the kind of network connection and the mobile operator's code;
- counts the reporting software keeps about itself, such as how many records it is holding or has dropped.

Like any internet connection, these requests also show Google's servers the IP address they come from. Nothing the app sends contains it, and Google counts it among the technical details it processes to run its Firebase services.

When the app crashes, recovers from an internal failure, or on Android 11 and later is closed by the system because it stopped responding, the reporting software also makes a report so the problem can be fixed. A report is written to the device first and sent when the software next can: for a crash that stops the app, and for an app that stopped responding, that is the next time the app starts, so such a report is never sent if the app is not opened again. A report adds:

- the stack trace, the state of the app and its threads, and details of the device and operating system at the moment of the failure;
- for a failure the app recovered from, the error's text and a fixed label naming where in the app it happened.

Nothing sent ever holds the board, the moves, the opponent, your name, or anything you entered, because the app has nothing to enter.

All of it goes to Google's Firebase services, encrypted in transit, and Google processes it on the developer's behalf under the [Firebase privacy terms](https://firebase.google.com/support/privacy). Crashlytics keeps a report, and the identifiers stored with it, for 90 days and then removes them; Google states no separate period for the session records. The Firebase installation ID that identifies the installation is kept by Google until the app has gone unused for 270 days, which is Google's current threshold, and that holds after the app is removed, because nothing tells Google that it was. The app does not ask for an earlier deletion, and reinstalling the app creates a new ID. The app carries no analytics product such as Google Analytics; the session record is the only usage figure Google receives, and none of the data is used for advertising.

The "Send crash reports" switch on the New Match screen is on by default. Turning it off stops all of the above, discards the reports the device holds, and stays off until you turn it back on: the app no longer contacts Google when it starts, and a crash after that can still be written to the device by the reporting software, but the app discards it the next time it starts instead of sending it. Two limits apply. A new installation starts with the switch on, so its first start is registered and recorded before you can reach the switch. And a record or a report that the reporting software had already queued for sending when you turned the switch off may still be sent. Nothing that was already sent can be withdrawn from Google by the app.

## The app reaches the network only for crash reporting

Starting with version 1.3.0 the released Android app declares `android.permission.INTERNET` and `android.permission.ACCESS_NETWORK_STATE`, which Crashlytics needs to reach Google and to wait for a connection; before 1.3.0 it declared neither, and the operating system did not let it open a connection at all. iOS has no equivalent permission, so there the same claim rests on what the app is made of: the [source is public](https://github.com/AndrewDongminYoo/ttush_push), and the crash reporting SDK is the only dependency that opens a connection. There is no advertising SDK, no analytics product, and no server of the developer's own.

## What is stored on your device

Only these yes-or-no values, and none of them leaves the device:

- whether you have finished the first-play coach, so it does not reappear every time you open the game;
- whether sound is on, and whether haptics are on;
- whether play reminders are on, whether the app has already asked for permission to show them, and whether you have finished a match, which is when it first asks.

Crashlytics also keeps files of its own on the device: whether crash reports are on, the two installation identifiers, a copy of its settings, the current session's identifier, and whatever it has not sent yet, for example a report after a crash while offline. Turning crash reports off discards the unsent reports, at once and again at the next start.

Match results and scores are held in memory for the length of a session and are gone when the app closes. Removing the app removes the stored values and the Crashlytics files with it. On an iPhone the system keychain can keep the old Firebase installation ID after the app is removed; a reinstalled app does not read it and creates a new one.

## Play reminders

The app can remind you to play a day after you last opened it or finished a match. The operating system schedules and shows the reminder on the device, so nothing is sent anywhere; opening the app again moves it, and turning reminders off in the app cancels it.

## Children

The game has no accounts, no chat, no purchases and no advertising. The only thing it sends, the crash reporting data above, carries nothing about who is playing, so there is nothing to treat differently for younger players.

## Permissions

The one permission the app asks for is to show notifications, for the play reminder. It asks after your first finished match while reminders are on, or when you turn reminders on yourself, and the game plays the same if you refuse. On Android the system shows that question from Android 13; earlier versions allow notifications without asking.

On Android the app also declares permissions that need no grant: network access and network state for crash reporting, one to keep a pending reminder across a restart of the device, and vibration. Haptics use the standard platform haptics API on both platforms.

## Changes

If a future version collects anything more, this page will say so before that version ships, and the date above will change.

## Contact

Questions about this policy: [ydm2790@gmail.com](mailto:ydm2790@gmail.com)
