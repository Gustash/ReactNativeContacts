# About this project

This project aims to preview some React Native functionality. It is using Material Design, Redux for state management and Firebase for the database.

# Configuration

In order for this app to work, you will need to create a file in the root of the project named firebaseConfig.js. In that file you will need to export two constants:
  - contactsEndpoint (the uri for the contacts endpoint in your firebase app, e.g. ```https://[YOUR-FIREBASE-PROJECT].firebaseio.com/contacts.json```);
  - contactsPath (pretty much the same thing, but without the .json extension and with a leading slash, e.g ```https://[YOUR-FIREBASE-PROJECT].firebaseio.com/contacts/```).
  
You will also need to configure your rules to allow unauthorized users to write and read the database. User authentication a bit out of scope for this project, but feel free to add authentication, should you desire to do so.


## :warning: Note!!

The react-native-material-ui has some issues with a few components on the NPM version. Please refer to:
  - [Issue 268](https://github.com/xotahal/react-native-material-ui/issues/268)
  - [Issue 270](https://github.com/xotahal/react-native-material-ui/issues/270)

# Running the project

To run the project just cd into the project directory, ```yarn install``` and ```yarn start```.

# Another warning (not so bad)

This project was tested on an Android emulator, so I can be quite confident of how it'll perform and look on an Android device. But it wasn't tested on an iOS device, so procede with caution. If you find any problems with the iOS version, feel free to do a pull request with the fixes (even though I see no point in doing so for a demo project).