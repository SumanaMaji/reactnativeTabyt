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
import { result } from 'lodash';

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
       // const userData = await Event.getUserProfile(result._id);
       console.log("userFollow"+ JSON.stringify(result));
        const followNotify = await Event.followUser({receiver: result._id});
        console.log('followNotify=>>>', JSON.stringify(followNotify));
        if (followNotify && followNotify.status) {
          // SimpleToast.show('Follow requested successfully!');
          // setfollowStatus('Following Requested');
          // setfollowButton(true);
          requestUserPermission(result.firstname +' '+result.lastname, 'follow');
          notificationListener('follow');
        }
      
     // console.log('userProfile', JSON.stringify(userData));
       // if (userData && userData.status) {
      //   setuData(result?.data);
      //   setuserEvent(result?.data?.bookingEvents);
      //   getAllStates(result?.data?.state);
      //   getCity(result?.data?.state, result?.data?.city);
      //   getAge(result?.data);
      //   setisFetching(false);
      //   if (result?.data?.followers) {
      //     const checkFollowStatus = result?.data?.followers.filter(
      //       i => i.receiver == userData._id || i.sender == userData._id,
      //     );
      //     console.log('checkFollowStatus=>>', checkFollowStatus);
      //     if (checkFollowStatus.length > 0) {
      //       const followCheck = checkFollowStatus.filter(i => i.accpect == true);
      //       if (followCheck && followCheck.length > 0) {
      //         setfollowStatus('Following');
      //       } else {
      //         setfollowStatus('Following Requested');
      //         setfollowButton(true);
      //       }
      //     } else {
      //       setfollowButton(false);
      //     }
      //   } else {
      //     setfollowButton(false);
      //   }
      // }
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
            requestUserPermission(messageData.userData.firstname+' '+messageData.userData.lastname, 'message');
            notificationListener('message');
          }
      });    
      }
    }
    async function followUser() {
      // const result = await Event.getUserProfile(uId);
      // console.log('userProfile', JSON.stringify(result));
      // if (result && result.status) {
      //   setuData(result?.data);
      //   setuserEvent(result?.data?.bookingEvents);
      //   getAllStates(result?.data?.state);
      //   getCity(result?.data?.state, result?.data?.city);
      //   getAge(result?.data);
      //   setisFetching(false);
      //   if (result?.data?.followers) {
      //     const checkFollowStatus = result?.data?.followers.filter(
      //       i => i.receiver == userData._id || i.sender == userData._id,
      //     );
      //     console.log('checkFollowStatus=>>', checkFollowStatus);
      //     if (checkFollowStatus.length > 0) {
      //       const followCheck = checkFollowStatus.filter(i => i.accpect == true);
      //       if (followCheck && followCheck.length > 0) {
      //         setfollowStatus('Following');
      //       } else {
      //         setfollowStatus('Following Requested');
      //         setfollowButton(true);
      //       }
      //     } else {
      //       setfollowButton(false);
      //     }
      //   } else {
      //     setfollowButton(false);
      //   }
      // }


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
