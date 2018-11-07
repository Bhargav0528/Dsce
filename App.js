import React,{ Component } from 'react';
import { View, Text, Platform,YellowBox,PermissionsAndroid } from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import LoginForm from './components/Login_SignUp/LoginForm';
import MainScreen from './components/Screens/MainScreen';
import SignUpForm from './components/Login_SignUp/SignUpForm';
import FacultyLogin from './components/Login_SignUp/FacultyLogin';
import ScreenThree from './components/Screens/ScreenThree';
import { Header, Spinner } from './components/common'
import firebase from 'firebase';
import  Firebase from 'react-native-firebase';

import OneSignal from 'react-native-onesignal';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {

  state = { loggedIn: null, infoSetup:false };

  componentWillMount(){
        OneSignal.init("d3672cc3-dd21-481a-bc1a-0f7a9bcaea3e");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);

        this.requestLocationPermission();
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyBZYTCnfIfMOB8NE3Kqpnc91VV4US1c-Ug',
        authDomain: 'dsceapp-5ed7f.firebaseapp.com',
        databaseURL: 'https://dsceapp-5ed7f.firebaseio.com',
        projectId: 'dsceapp-5ed7f',
        storageBucket: 'dsceapp-5ed7f.appspot.com',
        messagingSenderId: '359041235154',
      };
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref().child('users').child(user.uid).on('value', (snap)=>{
          console.log("snap", snap)
          this.setState({ loggedIn: true, infoSetup:snap.val().infoSetup });
        })
        
      } else {
        this.setState({ loggedIn: false });
      }
    });

  }

  componentDidMount() {

    const channel = new Firebase.notifications.Android.Channel('test-channel', 'Test Channel', Firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

    // Create the channel
    Firebase.notifications().android.createChannel(channel);

    this.notificationDisplayedListener = Firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      // Process your notification as required
      console.log("Recieved",notification.notificationId)
      
       });


  this.notificationListener = Firebase.notifications().onNotification((notification: Notification) => {

      console.log("Bugs")
      notification.android.setChannelId('test-channel');
      

      const localNotification = new Firebase.notifications.Notification()
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body);



    if (Platform.OS === 'android') {
      localNotification._android._channelId = notification.android.channelId;
    }

    Firebase.notifications().displayNotification(localNotification);

      });
}

componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
}


async requestLocationPermission() {
  const chckStoragePermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  if (chckStoragePermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Granted");
  } else {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                  'title': 'DSCE App requires Storage permission',
                  'message': 'We require Storage Permission to store Notes'
              }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("ACess granted")
          } else {
            console.log("ACess not granted")
          }
      } catch (err) {
          alert(err)
      }
  }
  const chckCameraPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  if (chckCameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("Granted");
} else {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'DSCE App requires Camera permission',
                'message': 'We require Camera Permission to take pictures of documents'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("ACess granted")
        } else {
          console.log("ACess not granted")
        }
    } catch (err) {
        alert(err)
    }
}
const chckReadPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  if (chckReadPermission === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("Granted");
} else {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'DSCE App requires Storage permission',
                'message': 'We require Camera Permission to read documents'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("ACess granted")
        } else {
          console.log("ACess not granted")
        }
    } catch (err) {
        alert(err)
    }
}
};
  
  renderScreens() {
    switch (this.state.loggedIn) {
      case null:
        return <Spinner />;
      case true:
        if(this.state.infoSetup)
        { 
          console.log("goinggg")
          return <MainScreen />;
        }
        else
        return <UserNavigation />;
      case false:
        return <Stack />;
    }
  }

  render() {
    console.log("InfoSetup",this.state.infoSetup)
    return (
      <View style={{ flex: 1 }}>
        {this.renderScreens()}
      </View>
    );
  }
}
const Stack = createStackNavigator({
  LoginForm: { screen: LoginForm },
  SignUpForm : {screen : SignUpForm},
  MainScreen: { screen: MainScreen },
  ScreenThree: { screen: ScreenThree },
  FacultyLogin: {screen: FacultyLogin}
});

const UserNavigation = createStackNavigator({
  SignUpForm : {screen : SignUpForm},
  MainScreen: { screen: MainScreen }},
  {
    navigationOptions:{
      header:null
    }
})