# Privacy Policy

_Last updated: 6 October 2026_

Ttush Push asks for nothing about you and collects no name, account or contact detail. Versions before 1.3.0 make no network request at all. Starting with version 1.3.0, the app carries Google's Firebase Crashlytics crash reporting. Starting with version 1.4.0, it also carries Google Analytics for Firebase, which receives usage data about the game, and ads from Google AdMob, shown after Google's consent step. Each of them is described below, with what it sends and how far you can turn it off. Nothing else in the app sends anything.

## Crash reporting

This section describes what the reporting software sends, as read from its source code and from Google's own disclosure for the versions the app uses. The lists name the kinds of data involved, not every field of every request; Google's own account is in the Firebase privacy terms linked below. The software is Google's and Google can change it; if that changes what is sent, this page changes with it.

Each time the app starts, whether or not it has ever failed, the reporting software registers the installation with Google, fetches its own settings, and records that a session started, so that Crashlytics can say what share of sessions ran without a crash. These requests hold data of these kinds:

- two identifiers that Crashlytics generates for the installation, used to count sessions and how many installations a crash affects, and a token that Google issues to the installation so that its requests can be authenticated. They single out the installation, not you: they are not tied to a name, an account, or the device's advertising identifier, and they change when the app is reinstalled;
- a random identifier for the session and the time it started;
- the app's version, the make and model of the device and the version of its operating system;
- the language and region the device is set to and its time zone, and on Android the kind of network connection and the mobile operator's code;
- counts the reporting software keeps about itself, such as how many records it is holding or has dropped.

Like any internet connection, these requests also show Google's servers the IP address they come from. Nothing the app sends contains it, and Google counts it among the technical details it processes to run its Firebase services.

When the app crashes, recovers from an internal failure, or on Android 11 and later is closed by the system because it stopped responding, the reporting software also makes a report so the problem can be fixed. A report is written to the device first and sent when the software next can. On iPhone and iPad a report of a crash that stops the app is sent the next time the app starts, so it is never sent if the app is not opened again. On Android a report of such a crash is sent as soon as the device can send it, usually within seconds and without the app being opened again; a report for an app that stopped responding is made and sent the next time the app starts. A report adds:

- the stack trace, the state of the app and its threads, and details of the device and operating system at the moment of the failure;
- for a failure the app recovered from, the error's text and a fixed label naming where in the app it happened;
- from version 1.4.0, the most recent usage events described in the next section, if usage data is on.

Nothing sent ever holds the board, the moves, the opponent, your name, or anything you entered, because the app has nothing to enter.

All of it goes to Google's Firebase services, encrypted in transit, and Google processes it on the developer's behalf under the [Firebase privacy terms](https://firebase.google.com/support/privacy). Crashlytics keeps a report, and the identifiers stored with it, for 90 days and then removes them; Google states no separate period for the session records. The Firebase installation ID that identifies the installation is kept by Google until the app has gone unused for 270 days, which is Google's current threshold, and that holds after the app is removed, because nothing tells Google that it was. The app does not ask for an earlier deletion, and reinstalling the app creates a new ID. None of the crash reporting data is used for advertising.

The "Send crash reports" switch on the New Match screen is on by default. Turning it off stops all of the above, discards the reports the device holds, and stays off until you turn it back on: the app no longer contacts Google for crash reporting when it starts, and a crash after that can still be written to the device by the reporting software, but the app discards it the next time it starts instead of sending it. Two limits apply. A new installation starts with the switch on, so its first start is registered and recorded before you can reach the switch. And a record or a report that the reporting software had already queued for sending when you turned the switch off may still be sent. Nothing that was already sent can be withdrawn from Google by the app.

## Usage data

Starting with version 1.4.0, the app sends usage data to Google Analytics for Firebase, so the developer can see how the game is played and where players stop. While it is on, Analytics receives:

- an app instance ID that Analytics generates for the installation, which changes when the app is reinstalled;
- the events Analytics records by itself, such as the first time the app is opened and the start of each session, and the app's events: that a match started, ended or was left, with the mode, the difficulty, the board, who won and why, how many rounds and moves it took and how long; that the first-play coach was finished, dismissed or reopened; and whether an ad showed or failed to load;
- the ad SDK's own events about the ads it requests and shows;
- details of the device and the app with each event, and a coarse location, such as the country or city, that Google derives from the IP address the requests come from.

Every value the app itself adds is one of a fixed set of words or a small count, so nothing about the board, the moves or the opponent goes beyond that. The app sets no user ID and no user properties, and Analytics does not collect the device's advertising identifier: the iOS app is built without Analytics' advertising identifier support, and the Android app turns that collection off.

The data goes to Google, encrypted in transit, and Google processes it for the developer under the [Firebase privacy terms](https://firebase.google.com/support/privacy). The Analytics property keeps event-level data for 2 months and user-level data for 14 months, and its settings for sharing data with Google for other purposes are off.

The "Send usage data" switch on the New Match screen is on by default, and is independent of the crash reporting switch. Turning it off stops Analytics from sending anything from then on, and crash reports then carry no usage events. A new installation starts with it on, so its first open and first session are sent before you can reach the switch. Nothing that was already sent can be withdrawn from Google by the app.

## Ads

Starting with version 1.4.0, the app shows ads from Google AdMob: a banner below the start button, and a full-screen ad before a new match. Ads are limited to content rated for general audiences. The ads are served by the Google Mobile Ads SDK, which Google makes and which sends data to Google itself; the app passes it nothing about you or about the game. According to Google's own disclosure, the SDK collects and shares with Google:

- the IP address, which may be used to estimate the general location of the device;
- device identifiers, including the device's advertising identifier where it is available: on Android the advertising ID, and on iPhone and iPad the advertising identifier (IDFA) only if you allow tracking, as described below;
- the ads you have seen and how you interacted with them, such as taps and video views, and other interactions with the app such as its launch;
- diagnostic and performance information, such as crash logs and the app's launch time.

Google uses this data to show ads, including ads chosen for you where that is allowed, to measure them, and to prevent fraud, for the app and for its own purposes, as described in [Google's privacy policy](https://policies.google.com/privacy) and in [how Google uses information from sites or apps that use its services](https://policies.google.com/technologies/partner-sites). The data is encrypted in transit. Google does not state a retention period for this data on its pages for the SDK.

### Consent and tracking

Before the app requests any ad, it runs Google's User Messaging Platform:

- Where privacy law requires a choice, Google's consent message appears when the app starts. If you are in such a region, the New Match screen also shows "Ad privacy choices", which opens that message again so that you can change your answer.
- On iPhone and iPad, Google's message explains why the app asks to track, and Apple's prompt follows. If you allow tracking, the SDK can read your device's advertising identifier; if you ask the app not to track, it cannot. You can change this later in Settings, under Privacy & Security, Tracking.
- On Android, you can reset or delete the advertising ID in the device's settings, usually under Privacy, Ads.

Ads are shown whatever you answer; your answers decide what Google may use to choose them. Neither switch on the New Match screen stops the ads or what the ad SDK sends to Google. If the consent step fails, the app requests no ads at all.

## What opens a connection

Starting with version 1.3.0 the released Android app declares `android.permission.INTERNET` and `android.permission.ACCESS_NETWORK_STATE`; before 1.3.0 it declared neither, and the operating system did not let it open a connection at all. A permission says that the app may use the network, not what uses it, and iOS has no equivalent permission, so on both platforms the claim rests on what the app is made of: the [source is public](https://github.com/AndrewDongminYoo/ttush_push), and the only parts of the released app that open a connection are the three Google SDKs above, crash reporting from 1.3.0 and usage data and ads from 1.4.0. There is no server of the developer's own.

## What is stored on your device

The app itself stores only these yes-or-no values, and none of them leaves the device:

- whether you have finished the first-play coach, so it does not reappear every time you open the game;
- whether sound is on, and whether haptics are on;
- whether play reminders are on, whether the app has already asked for permission to show them, and whether you have finished a match, which is when it first asks;
- from version 1.4.0, whether usage data is on.

Crashlytics also keeps data of its own on the device, of these kinds: whether crash reports are on, the two installation identifiers and the installation's token, a copy of its settings, the current session's identifier, and whatever it has not sent yet, for example a report after a crash while offline. Turning crash reports off discards the unsent reports, at once and again at the next start. From version 1.4.0, Analytics keeps its app instance ID and the events it has not sent yet, Google's consent tool keeps your consent answers, and the ad SDK keeps data of its own for serving and measuring ads.

Match results and scores are held in memory for the length of a session and are gone when the app closes. Removing the app removes the stored values and the SDKs' files with it. On an iPhone the system keychain can keep the old Firebase installation ID after the app is removed; a reinstalled app does not read it and creates a new one.

## Play reminders

The app can remind you to play a day after you last opened it or finished a match. The operating system schedules and shows the reminder on the device, so nothing is sent anywhere; opening the app again moves it, and turning reminders off in the app cancels it.

## Children

The game has no accounts, no chat and no purchases. Starting with version 1.4.0 it shows ads, limited to content rated for general audiences; on Google Play it is offered to players aged 13 and over. Nothing the app sends describes who is playing.

## Permissions

The app asks for permission to show notifications, for the play reminder. It asks after your first finished match while reminders are on, or when you turn reminders on yourself, and the game plays the same if you refuse. On Android the system shows that question from Android 13; earlier versions allow notifications without asking. Starting with version 1.4.0, on iPhone and iPad the app also shows Apple's tracking prompt, after Google's message, as described under Ads; the game plays the same whatever you answer.

On Android the app also declares permissions that need no grant: network access and network state, from 1.3.0 for crash reporting and from 1.4.0 for usage data and ads; one to keep a pending reminder across a restart of the device; and vibration. Starting with version 1.4.0 it also declares the advertising ID permission and Android's ad services permissions, which the ad SDK and Analytics bring, and permissions those SDKs use to keep the device awake while they send, to run their background work, and to read the Google Play install referrer. Haptics use the standard platform haptics API on both platforms.

## Changes

If a future version collects anything more, this page will say so before that version ships, and the date above will change.

## Contact

Questions about this policy: [ydm2790@gmail.com](mailto:ydm2790@gmail.com)
