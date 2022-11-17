import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {moderateScale} from '../../PixelRatio';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {Icon, Left, ListItem, Right} from 'native-base';
import Navigation from '../../Service/Navigation';
import BackCross from '../../Component/Header/BackCross';

const {width, height} = Dimensions.get('window');

const LIST = [
  {
    name: 'View Ticket',
    icon: 'person',
    type: 'Ionicons',
    path: 'ViewTicket',
    live: true,
    pending: false,
    order: true,
  },
  {
    name: 'Event Details',
    icon: 'person',
    type: 'Ionicons',
    path: 'MyEventAbout',
    live: true,
    pending: true,
    order: true,
  },
  {
    name: 'Guest Lists',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'TicketGuestLists',
    live: true,
    pending: false,
    order: true,
  },
  {
    name: 'Menu',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    // path : 'GuestLists',
    live: true,
    pending: false,
    order: true,
  },

  {
    name: 'Receipts',
    icon: 'heart-outline',
    type: 'Ionicons',
    path: 'Receipt',
    live: true,
    pending: false,
    order: true,
  },
  {
    name: 'Cancel Reservation',
    icon: 'heart-outline',
    type: 'Ionicons',
    // path : 'Receipt',
    live: true,
    pending: true,
    order: true,
  },
  {
    name: 'Help',
    icon: 'wallet',
    type: 'Ionicons',
    path: 'Help',
    live: true,
    pending: false,
    order: true,
  },
];

const EVENTDATA = {
  title: 'Mark quick reservations',
  date: '30-June-2021',
  time: '3.00 - 4.00 pm',
  organized: 'Rajib Sk',
  attn: '15',
  address:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  image:
    'https://assets.website-files.com/5ff4e43997c4ec6aa5d646d1/603d547ed5c5fd6365dabbef_industry%20expert%20roundup%20-%20why%20are%20events%20important.png',
};

const MyCheckoutTicket = props => {
  const goTo = it => {
    if (it.path == 'MyEventDetails') {
      Navigation.navigate(it.path, {eventData: EVENTDATA});
    }
    if (it.path) {
      Navigation.navigate(it.path);
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="My Ticket" icon={false} />
      <View style={{alignSelf: 'center', flex: 1}}>
        <ScrollView>
          <Image
            style={{width: width, height: height / 3, marginTop: 20}}
            source={{
              uri: 'https://www.sweetwater.com/insync/media/2017/02/vocal-effects.jpg',
            }}
          />
          <View
            style={{
              paddingTop: 20,
              marginHorizontal: moderateScale(30),
              paddingBottom: 50,
            }}>
            {LIST.map((it, key) => (
              <ListItem key={key} onPress={() => goTo(it)} style={styles.list}>
                <Left style={{width: '50%', alignItems: 'center'}}>
                  <Text style={styles.title}>{it.name}</Text>
                </Left>
                <Right>
                  {it.logout ? null : (
                    <Icon
                      name="keyboard-arrow-right"
                      type="MaterialIcons"
                      style={{color: COLORS.white}}
                    />
                  )}
                </Right>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </CustomImageBackground>
  );
};

export default MyCheckoutTicket;

const styles = StyleSheet.create({
  shadowTxt: {
    color: COLORS.textInput,
    //   opacity:1,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
  boldTxt: {
    color: COLORS.white,
    opacity: 1,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
  list: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    marginBottom: 0,
    paddingBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13.5),
    marginLeft: 13,
  },
});
