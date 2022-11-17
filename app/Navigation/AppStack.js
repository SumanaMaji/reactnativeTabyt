import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {COLORS} from '../Constant/Colors';
import BottomTab from './BottomTab';
import SingleEvent from '../Screen/Event/SingleEvent';
import MakeReservation from '../Screen/Reservations/MakeReservation';
import Attending from '../Screen/Attending/Attending';
import LocationView from '../Screen/MapView';
import Gift from '../Screen/Gift';
import Checkout from '../Screen/Checkout';
import CheckoutReservation from '../Screen/Checkout/CheckoutReservation';
import Checkout2 from '../Screen/Checkout/Checkout2';
import SplitBill from '../Screen/Checkout/SplitBill';
import PaymentType from '../Screen/Checkout/PaymentType';
import PaymentCard from '../Screen/Checkout/PaymentCard';
import MyAccount from '../Screen/Profile/MyAccount';
import EditProfile from '../Screen/Profile/EditProfile';
import Settings from '../Screen/Profile/Settings';
import Reviews from '../Screen/Reviews';
import MyEventList from '../Screen/Event/MyEventList';
import MyEventAbout from '../Screen/Event/MyEventAbout';
import MyEventDetails from '../Screen/Event/MyEventDetails';
import Perks from '../Screen/Perks';
import Followers from '../Screen/Profile/Followers';
import GuestLists from '../Screen/Event/GuestLists';
import Receipt from '../Screen/Receipt/Receipt';
import AdditionalOrder from '../Screen/Receipt/AdditionalOrder';
import OrginalOrder from '../Screen/Receipt/OrginalOrder';
import MyTicketAbout from '../Screen/Tickets/MyTicketAbout';
import TicketGuestLists from '../Screen/Tickets/TicketGuestLists';
import SplitBillInvite from '../Screen/Tickets/SplitBillInvite';
import ContactUs from '../Screen/Tickets/Contactus';
import Help from '../Screen/Tickets/Help';
import ChatList from '../Screen/Message/ChatList';
import SingleChat from '../Screen/Message/SingleChat';
import ViewProfile from '../Screen/Profile/ViewProfile';
import ViewTicket from '../Screen/Tickets/ViewTicket';
import PaymentInfo from '../Screen/Checkout/PaymentInfo';
import MyCheckoutTicket from '../Screen/Tickets/MyCheckoutTicket';
import SplitBillUser from '../Screen/Tickets/SplitBillUser';
import CheckoutSplitBill from '../Screen/Checkout/CheckoutSplitBill';
import ViewUserProfile from '../Screen/Profile/ViewUserProfile';
import ChangePassword from '../Screen/Profile/ChangePassword';
import MyEventTicketDetails from '../Screen/Event/MyEventTicketDetails';
import MenuBooking from '../Screen/Menu/MenuBooking';
import MenuCheckout from '../Screen/Menu/MenuCheckout';
import ViewOrganizer from '../Screen/Organizer/ViewOrganizer';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: COLORS.button},
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="BottomTab"
      headerMode="none">
      <Stack.Screen name="BottomTab" component={BottomTab} />
      {/* <Stack.Screen name="MyAccount" component={MyAccount} /> */}
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="MyEventList" component={MyEventList} />
      <Stack.Screen name="MyEventAbout" component={MyEventAbout} />
      <Stack.Screen name="MyEventDetails" component={MyEventDetails} />
      <Stack.Screen name="GuestLists" component={GuestLists} />
      <Stack.Screen name="Perks" component={Perks} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="SingleEvent" component={SingleEvent} />
      <Stack.Screen name="MakeReservation" component={MakeReservation} />
      <Stack.Screen name="Attending" component={Attending} />
      <Stack.Screen name="LocationView" component={LocationView} />
      <Stack.Screen name="Gift" component={Gift} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Checkout2" component={Checkout2} />
      <Stack.Screen name="CheckoutSplitBill" component={CheckoutSplitBill} />
      <Stack.Screen name="PaymentType" component={PaymentType} />
      <Stack.Screen name="PaymentCard" component={PaymentCard} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
      <Stack.Screen name="SplitBill" component={SplitBill} />
      <Stack.Screen name="SplitBillUser" component={SplitBillUser} />
      <Stack.Screen
        name="CheckoutReservation"
        component={CheckoutReservation}
      />
      <Stack.Screen name="Receipt" component={Receipt} />
      <Stack.Screen name="AdditionalOrder" component={AdditionalOrder} />
      <Stack.Screen name="OrginalOrder" component={OrginalOrder} />
      <Stack.Screen name="MyTicketAbout" component={MyTicketAbout} />
      <Stack.Screen name="MyCheckoutTicket" component={MyCheckoutTicket} />
      <Stack.Screen name="TicketGuestLists" component={TicketGuestLists} />
      <Stack.Screen name="SplitBillInvite" component={SplitBillInvite} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="ViewTicket" component={ViewTicket} />
      <Stack.Screen name="ViewUserProfile" component={ViewUserProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="MyEventTicketDetails"
        component={MyEventTicketDetails}
      />
      <Stack.Screen name="MenuBooking" component={MenuBooking} />
      <Stack.Screen name="MenuCheckout" component={MenuCheckout} />
      <Stack.Screen name="ViewOrganizer" component={ViewOrganizer} />
    </Stack.Navigator>
  );
}
