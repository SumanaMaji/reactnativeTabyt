import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../Screen/Home';
import {COLORS} from '../Constant/Colors';
import MyTickets from '../Screen/Tickets/MyTickets';
import MyActivities from '../Screen/Activities/MyActivities';
import CommingSoon from '../Screen/CommingSoon';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MyAccount from '../Screen/Profile/MyAccount';
import ChatList from '../Screen/Message/ChatList';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: COLORS.button},
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        // ...TransitionPresets.FadeFromBottomAndroid,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="Home"
      headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
    </Stack.Navigator>
  );
}

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: COLORS.button,
        style: {
          backgroundColor: COLORS.bottomTab,
          // height: 50,
          borderTopColor: COLORS.textInput,
          elevation: 50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyActivities"
        component={MyActivities}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-document-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="diamond"
        component={CommingSoon}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="diamond-stone"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={MyTickets}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="ticket" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
