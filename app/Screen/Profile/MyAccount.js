import moment from 'moment';
import {Icon, Left, ListItem, Right} from 'native-base';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeHeader from '../../Component/Header/HomeHeader';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import {removeUser, setGuestLogin, setLogin} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const LIST = [
  {
    name: 'Edit Profile',
    icon: 'person',
    type: 'Ionicons',
    path: 'EditProfile',
  },
  {
    name: 'My Events',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'MyEventList',
  },
  {
    name: 'Followers',
    icon: 'md-person-add',
    type: 'Ionicons',
    path: 'Followers',
  },
  {
    name: 'Organizers',
    icon: 'heart-outline',
    type: 'Ionicons',
  },
  {
    name: 'Payment Method',
    icon: 'wallet',
    type: 'Ionicons',
    path: 'PaymentInfo',
  },
  {
    name: 'Settings',
    icon: 'settings',
    type: 'Ionicons',
    path: 'Settings',
  },
  {
    name: 'Policies',
    icon: 'shield-checkmark-outline',
    type: 'Ionicons',
  },
  {
    name: 'Logout',
    icon: 'sign-out',
    type: 'FontAwesome',
    logout: true,
  },
];

const LIST2 = [
  {
    name: 'Policies',
    icon: 'shield-checkmark-outline',
    type: 'Ionicons',
  },
  {
    name: 'Login',
    icon: 'sign-out',
    type: 'FontAwesome',
  },
];

const MyAccount = ({navigation}) => {
  // useEffect(() => {
  //   navigation.setOptions({tabBarVisible: true});
  //   return () => null
  // }, [])

  const dispatch = useDispatch();
  const {userData, guestLogin} = useSelector(state => state.User);
  const [listItem, setlistItem] = useState(guestLogin ? LIST2 : LIST);

  const goTo = async it => {
    if (it.name == 'Login') {
      dispatch(setLogin(false));
      dispatch(setGuestLogin(false));
      return;
    }
    if (it.logout) {
      await Auth.setAccount(null);
      await Auth.setToken(null);
      dispatch(removeUser());
      return;
    }
    if (it.path) {
      Navigation.navigate(it.path);
    }
  };

  const a = moment([moment(new Date()).format('YYYY', 'MM')]);
  const b = moment([moment(userData.dob).format('YYYY', 'MM')]);

  return (
    <CustomImageBackground>
      <HomeHeader title="My Account" icon={false} />
      <View style={{width: '80%', alignSelf: 'center'}}>
        {guestLogin ? null : (
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.2,
              borderColor: COLORS.textInput,
              paddingVertical: 25,
            }}>
            <Image
              source={{
                uri: BASE_DOMAIN + userData.image,
              }}
              style={{
                width: moderateScale(70),
                height: moderateScale(70),
                borderRadius: moderateScale(35),
                borderWidth: 3,
                borderColor: COLORS.theme,
                backgroundColor: COLORS.lightgray,
              }}
            />
            <View style={{marginLeft: 15, width: '65%'}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.SemiBold,
                  fontSize: moderateScale(15),
                }}>
                {userData.firstname} {userData.lastname}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.shadowTxt}>
                  Age: <Text style={styles.boldTxt}>{a.diff(b, 'years')}</Text>
                </Text>
                <Text style={styles.shadowTxt}>
                  Gender: <Text style={styles.boldTxt}>{userData.gender}</Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.shadowTxt]}>
                  Followers: <Text style={styles.boldTxt}>0</Text>
                </Text>
                <Text numberOfLines={1} style={[styles.shadowTxt]}>
                  {'  '} Drink:{' '}
                  <Text style={styles.boldTxt}>
                    {Object.keys(userData).length > 0
                      ? userData?.favoriteDrink[0]?.name
                      : null}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}>
          <View style={{paddingTop: 10, paddingBottom: 300}}>
            {listItem.map((it, key) => (
              <ListItem key={key} onPress={() => goTo(it)} style={styles.list}>
                <Left style={{width: '50%', alignItems: 'center'}}>
                  <Icon
                    name={it.icon}
                    type={it.type}
                    style={{color: COLORS.white}}
                  />
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

export default MyAccount;

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
