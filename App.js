import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AuthStack from './app/Navigation/AuthStack';
import Navigation from './app/Service/Navigation';
import {COLORS} from './app/Constant/Colors';
import AppStack from './app/Navigation/AppStack';
import {useDispatch, useSelector} from 'react-redux';
import Auth from './app/Service/Auth';
import Chat from './app/Service/Chat';
import {setUser} from './app/Redux/reducer/user';
import Loading from './app/Screen/Auth/Loading';
import {requestUserPermission, notificationListener} from "./app/Utils/notificationService";

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const [check, setcheck] = React.useState(true);
  const {login, userData} = useSelector(state => state.User);

  React.useEffect(() => {
    async function fetchData() {
      let result = await Auth.getAccount();
      if (result != null) {
        dispatch(setUser(result));
        setTimeout(() => {
          setcheck(false);
        }, 100);
      } else {
        setcheck(false);
      }
    }
    async function getChatListData() {
      const result = await Chat.getChatList();
      console.log('chat list check =>>', JSON.stringify(result));
      if (result && result.status) {
        result.data.map((messageData) => {
          console.log("unread-----"+ JSON.stringify(messageData.isSeen));
          if(messageData.isSeen == false)
          {
            requestUserPermission(messageData.message);
            notificationListener();
          }
      });    
      }
    }
    fetchData();
    //requestUserPermission();
    getChatListData();
    return () => null;
  }, []);

  if (check) {
    return <Loading />;
  }
 
  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        headerMode="none"
        // detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          cardStyle: {backgroundColor: COLORS.button},
          gestureEnabled: true,
          backgroundColor: COLORS.button,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {login == false ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
