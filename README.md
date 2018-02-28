# csdpeek-cordova
A simple save game file viewer for https://www.clubsoccerdirector.co.uk android game. Based on Apache Cordova.

---
## Background
This is just my first playground project to learn something about git, whhile attempting to create a simple Android app without specific (Android) development skills at all. The project at hand, based on Apache Cordova is an attempt to create simple save file viewer for a mobile game called [Club Soccer Director](https://www.clubsoccerdirector.co.uk).

## Sample Usage
<img src="https://user-images.githubusercontent.com/30338162/36775689-bc38ef2c-1c6b-11e8-94a6-36f1540fc61c.jpg" data-canonical-src="https://user-images.githubusercontent.com/30338162/36775689-bc38ef2c-1c6b-11e8-94a6-36f1540fc61c.jpg" width="50%" height="50%" />

1. Load the latest **Players.txt** save file, e.g. found under *\<sdcard\>/Android/data/com.GoGames.ClubSoccerDirector/files/1/* and a prompt will confirm the successful load.
2. Search for the attributes of a single specific player by name - case insensitive but based on entire name string as displayed in the game.
3. Search for all players in the (save) game at or above a specified potential threshold.
4. Results will appear in the space underneath.

---
# N.B.
*This is not a real project and is unlikely to be developed further. There is no intention for publishing the resulting app, so as a result there is no **signed release apk** but there is a compiled [debug version](../master/platforms/android/app/build/outputs/apk/debug/).*

