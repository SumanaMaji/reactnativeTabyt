import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AuthStack from './app/Navigation/AuthStack';
import Navigation from './app/Service/Navigation';
import {COLORS} from './app/Constant/Colors';
import AppStack from './app/Navigation/AppStack';
import {useDispatch, useSelector} from 'react-redux';
import Auth from './app/Service/Auth';
import Event from './app/Service/Event';
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
      console.log('user check =>>', JSON.stringify(result));
      if (result != null) 
      {
        dispatch(setUser(result));
        let userId = result._id;
        console.log('userID-----'+userId)
       // const userData = await Event.getUserProfile(result._id);
       console.log("userFollow"+ JSON.stringify(result));
        const followNotify = await Event.followUser({receiver: result._id});
        console.log('followNotify=>>>', JSON.stringify(followNotify));
        if (followNotify && followNotify.status) {
          requestUserPermission(result.firstname +' '+result.lastname, 'follow', userId);
          notificationListener('follow');
        }
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
          console.log("unread-----"+ JSON.stringify(messageData.userdata));
          if(messageData.isSeen == false)
          {
            requestUserPermission(messageData.userData.firstname+' '+messageData.userData.lastname, 'message', userId);
            notificationListener('message');
          }
      });    
      }
    }
    async function followUser() {
      const result = await Event.followUser({receiver: uData?._id});
      console.log('followUserData=>>>', result);
      if (result && result.status) {
        // SimpleToast.show('Follow requested successfully!');
        // setfollowStatus('Following Requested');
        // setfollowButton(true);
        requestUserPermission(result.data.receiver, 'follow');
        notificationListener();
      }
    };
    fetchData();
    //requestUserPermission();
    getChatListData();
    //followUser();
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
