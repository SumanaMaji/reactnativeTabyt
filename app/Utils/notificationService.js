import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Alert, Platform } from "react-native";
import Navigation from '../../app/Service/Navigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import Auth from '../Service/Auth';

export async function requestUserPermission(username, type, id) {
//console.log("user id -->"+userId);
// Initialize Firebase
// var config = {
//   apiKey: 'AAAAis54T00:APA91bGWPgwbZs0TzIHBlcUP9yLii2uYxUQ3W8NxkLm2H8KzjOsFZjolF18SuEc2TVtCHtJWQX2OZilMf5rOPa8gwmWB5cVAwpu1588iUlwpWPyVkq5T3wgUyuyEXPV3HshPPypczCoE',
//   //authDomain: 'YOUR_AUTH_DOMAIN',
//   //databaseURL: 'YOUR_DB_URL',
//   projectId: 'tabyt-45d8b',
//   //storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: '596169477965',
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(username, type, id);
  }
}
//PushNotification.setApplicationIconBadgeNumber(3)
//PushNotificationIOS.setApplicationIconBadgeNumber(2);
Platform.OS == 'ios' ?
(PushNotificationIOS.getApplicationIconBadgeNumber((num)=>{ // get current number
  if(num >= 1){
      PushNotificationIOS.setApplicationIconBadgeNumber(0) //set number to 0
  }
  else
  {
    PushNotificationIOS.setApplicationIconBadgeNumber(num) //set number to dynamic
  }
})) :
(PushNotification.setApplicationIconBadgeNumber((num)=>{ // get current number
  if(num >= 1){
    PushNotification.setApplicationIconBadgeNumber(0) //set number to 0
  }
  else{
    PushNotification.setApplicationIconBadgeNumber(num) //set number dynamic
  }
}));

const getFcmToken = async (username, type, id) => {
  
  let fcmToken = null
  try{
    fcmToken = await messaging().getToken();
    console.log(`Try block execute`)
  }catch(error) {
    console.log(`Error in FCM: ${error}`)
  }
  console.log(`FCM Token Generate: ${fcmToken}`)

  // let data = {
  //   fcmToken: fcmToken,
  //   _id: id
  // };
  // let result = await Auth.updateprofile(data);
  // console.log('update', result);
  // if (result && result.status) {
  //   console.log('fcmToken insert-->'+result)
  //  // Toast.show('Update Successfully!', Toast.SHORT);
  //   await Auth.setAccount(result.data);
  //   dispatch(setUser(result.data));
  // }

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
        },
        aps : {
          alert : {
            body: username + " sent you a message",
            title: "Tabyt",
            subtitle: "Messages"
          },
          badge: 1,
        },
    data : {
      body: username + " sent you a message",
      title: "Tabyt",
      subtitle: "Messages"
    },
       // Required for background/quit data-only messages on iOS
    contentAvailable: true,
        priority: "high",
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
         },
         aps : {
          alert : {
            body: username + " would like to follow you",
           title: "Tabyt",
           subtitle: "Follow"
          },
          badge: 1,
        },
    data : {
      body: username + " would like to follow you",
      title: "Tabyt",
      subtitle: "Follow"
    },
        // Required for background/quit data-only messages on iOS
    contentAvailable: true,
      priority: "high",
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
// firebase.notifications().onNotification((notificationListener) => {  
//   messaging()
//   .setBackgroundMessageHandler(async remoteMessage => {
//  console.log("background ---"+JSON.stringify(remoteMessage));
//     if(type == 'message'){
//       Navigation.navigate('ChatList');
//     }
//     else{
//       Navigation.navigate('MyActivities')
//     }
// });
// })

export const notificationListener = async (type) => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging()
  .onNotificationOpenedApp(remoteMessage => {
    console.log("recevied in background App", remoteMessage)
    if(type == 'message'){
      Navigation.navigate('ChatList');
    }
    else{
      Navigation.navigate('MyActivities')
    }
  });
  messaging()
  .onMessage(async remoteMessage => {
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
  messaging()
  .setBackgroundMessageHandler(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
