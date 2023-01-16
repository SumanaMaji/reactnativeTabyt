/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './app/Redux/Store';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return provider();
}


  const provider = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };


AppRegistry.registerComponent(appName, () => HeadlessCheck);
//AppRegistry.registerComponent(appName, () => provider);
//AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => firebaseBackgroundMessage);

