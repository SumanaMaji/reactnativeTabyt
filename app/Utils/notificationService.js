import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Alert } from "react-native";
import Navigation from '../../app/Service/Navigation';
export async function requestUserPermission(username, type) {
//console.log("user id -->"+userId);
// Initialize Firebase
var config = {
  apiKey: 'AAAAis54T00:APA91bGWPgwbZs0TzIHBlcUP9yLii2uYxUQ3W8NxkLm2H8KzjOsFZjolF18SuEc2TVtCHtJWQX2OZilMf5rOPa8gwmWB5cVAwpu1588iUlwpWPyVkq5T3wgUyuyEXPV3HshPPypczCoE',
  //authDomain: 'YOUR_AUTH_DOMAIN',
  //databaseURL: 'YOUR_DB_URL',
  projectId: 'tabyt-45d8b',
  //storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: '596169477965',
};
// firebase.initializeApp(config);
// const messaging = firebase.messaging();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(username, type);
  }
}
const getFcmToken = async (username, type) => {
  
  let fcmToken = null
  try{
    fcmToken = await messaging().getToken();
    console.log(`Try block execute`)
  }catch(error) {
    console.log(`Error in FCM: ${error}`)
  }
  console.log(`FCM Token Generate: ${fcmToken}`)
  if (fcmToken) {
   // console.log(fcmToken, "-->new version")
   if(type == 'message')
   {
     var dataToSend={
       to: fcmToken,
        notification: {
          body: username + " sent you a message",
          title: "Tabyt",
          subtitle: "Messages"
        }
     };
    }
     else
     {
      var dataToSend={
        to: fcmToken,
         notification: {
           body: username + " would like to follow you",
           title: "Tabyt",
           subtitle: "Follow"
         }
      };
    }
     console.log(dataToSend);
   console.log(`New FCM Token: ${fcmToken}`)
     let userToken = 'AAAAis54T00:APA91bGWPgwbZs0TzIHBlcUP9yLii2uYxUQ3W8NxkLm2H8KzjOsFZjolF18SuEc2TVtCHtJWQX2OZilMf5rOPa8gwmWB5cVAwpu1588iUlwpWPyVkq5T3wgUyuyEXPV3HshPPypczCoE';
   fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key= ${userToken}`,
      },
      body: JSON.stringify(dataToSend),
     })
       .then(response => response.json())
       .then(responseJson => {
         console.log('Success:', JSON.stringify(responseJson));
        //  if (responseJson.success) {
        //    console.log('Success2:');         
        //  } else {
        //    alert(responseJson.message);
        //  }
       })
       .catch(error => {
         console.error('Error:', error);
       });
   }
}

export const notificationListener = async (type) => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("recevied in background App", remoteMessage)
    if(type == 'message'){
      Navigation.navigate('ChatList');
    }
    else{
      Navigation.navigate('MyActivities')
    }
  });
  messaging().onMessage(async remoteMessage => {
   console.log("recevied in foreground", remoteMessage);
   if(type == 'message'){
    Navigation.navigate('ChatList');
  }
  else{
    Navigation.navigate('MyActivities')
  }
  });
  // Register background handler
//messaging().setBackgroundMessageHandler(async (remoteMessage,navigation) => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
 console.log("background ---"+JSON.stringify(remoteMessage));
    if(type == 'message'){
      Navigation.navigate('ChatList');
    }
    else{
      Navigation.navigate('MyActivities')
    }
});
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // let notificationData = JSON.parse(remoteMessage.notification.body);
        console.log('Notification caused app to open from quit state:',remoteMessage);
      }
      
  });
}
