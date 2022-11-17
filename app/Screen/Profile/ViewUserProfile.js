import moment from 'moment';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import TicketsList from '../../Component/Tickets/TicketsList';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const ViewUserProfile = props => {
  const {uname, uId} = props.route.params;
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const [isFetching, setisFetching] = useState(true);
  const [uData, setuData] = useState({});
  const [userEvent, setuserEvent] = useState([]);
  const [active, setactive] = useState(0);
  const [age, setage] = useState(0);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    console.log('getUserProfile=>>', uname, uId);
    const result = await Event.getUserProfile(uId);
    console.log('userProfile', result);
    if (result && result.status) {
      setuData(result?.data);
      setuserEvent(result?.data?.bookingEvents);
      setisFetching(false);
      getAge(result?.data);
    }
  };

  const getAge = dada => {
    // setTimeout(() => {
    let a = moment([moment().format('YYYY', 'MM')]);
    let b = moment([moment(dada.dob, 'MM/DD/YYYY').format('YYYY', 'MM')]);
    console.log('getAge', b);
    const agee = a.diff(b, 'years');
    setage(agee);
    // }, 1000);
  };

  const followUser = async () => {
    const result = await Event.followUser({receiver: uData?._id});
    console.log('followUser=>>>', result);
    if (result && result.status) {
      SimpleToast.show('Follow requested successfully!');
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title={uname} icon={false} />
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                // borderBottomWidth: 0.2,
                // borderColor: COLORS.textInput,
                paddingVertical: 25,
                paddingBottom: 10,
              }}>
              <Image
                source={{
                  uri: BASE_DOMAIN + uData?.image,
                }}
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  borderRadius: moderateScale(35),
                  borderWidth: 3,
                  borderColor: COLORS.theme,
                  backgroundColor: COLORS.lightgray,
                }}
              />
              <View style={{marginLeft: 20, width: '75%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: COLORS.white, fontFamily: FONTS.Bold}}>
                      {userEvent.length}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Medium,
                        opacity: 0.7,
                      }}>
                      Events
                    </Text>
                  </View>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: COLORS.white, fontFamily: FONTS.Bold}}>
                      {uData?.followers?.length}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Medium,
                        opacity: 0.7,
                      }}>
                      Followers
                    </Text>
                  </View>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: COLORS.white, fontFamily: FONTS.Bold}}>
                      {uData?.review?.length}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Medium,
                        opacity: 0.7,
                      }}>
                      Reviews
                    </Text>
                  </View>
                </View>
                {/* <Text style={styles.shadowTxt}>
                  Drink:{' '}
                  <Text style={styles.boldTxt}>
                    {uData?.favoriteDrink.map((iii, index) => {
                      console.log('iii', iii);
                      return iii.name + '' + uData?.favoriteDrink.length ==
                        index + 1
                        ? ''
                        : ', ';
                    })}
                  </Text>
                </Text> */}
              </View>
              {/* <View style={{marginLeft: 15, width: '65%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.SemiBold,
                      fontSize: moderateScale(15),
                    }}>
                    {uData?.firstname} {uData?.lastname}
                  </Text>
                  <TouchableOpacity
                    onPress={followUser}
                    style={{
                      backgroundColor: COLORS.theme,
                      paddingHorizontal: 10,
                      paddingVertical: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 20,
                    }}>
                    <Icon
                      name="plus"
                      type="FontAwesome5"
                      style={{color: COLORS.white, fontSize: 12}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.shadowTxt}>
                    Age: <Text style={styles.boldTxt}>{getAge()}</Text>
                  </Text>
                  <Text style={styles.shadowTxt}>
                    Gender: <Text style={styles.boldTxt}>{uData?.gender}</Text>
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
                    {'  '} Drink: <Text style={styles.boldTxt}></Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      Navigation.navigate('SingleChat', {
                        name: uData?.firstname + ' ' + uData?.lastname,
                        img: uData?.image,
                        uId: uData?._id,
                      })
                    }
                    style={{
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: COLORS.cream,
                      paddingVertical: 0,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: COLORS.cream,
                        fontFamily: FONTS.Medium,
                        fontSize: 13,
                      }}>
                      MESSAGE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: COLORS.cream,
                      paddingVertical: 0,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: COLORS.cream,
                        fontFamily: FONTS.Medium,
                        fontSize: 13,
                      }}>
                      GIFT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.SemiBold,
                  fontSize: moderateScale(15),
                }}>
                {uData?.firstname} {uData?.lastname}
              </Text>
              <TouchableOpacity
                // onPress={followUser}
                style={{
                  backgroundColor: COLORS.theme,
                  paddingHorizontal: 20,
                  paddingVertical: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                }}>
                <Text style={{color: COLORS.white, fontFamily: FONTS.Bold}}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Medium,
                opacity: 0.7,
              }}>
              {uData?.gender} | {age} |{' '}
              {uData?.favoriteDrink.map((iii, index) => {
                // console.log('iii', iii);
                return uData?.favoriteDrink.length == index + 1
                  ? iii.name + ''
                  : iii.name + ', ';
              })}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate('SingleChat', {
                    name: uData?.firstname + ' ' + uData?.lastname,
                    img: uData?.image,
                    uId: uData?._id,
                  })
                }
                style={{
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.cream,
                  paddingVertical: 0,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.cream,
                    fontFamily: FONTS.Medium,
                    fontSize: 13,
                  }}>
                  MESSAGE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.cream,
                  paddingVertical: 0,
                  borderRadius: 5,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.cream,
                    fontFamily: FONTS.Medium,
                    fontSize: 13,
                  }}>
                  GIFT
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '85%',
                alignSelf: 'center',
              }}>
              <Pressable
                onPress={() => setactive(0)}
                style={[
                  styles.titleView,
                  {borderColor: active == 0 ? COLORS.white : COLORS.theme},
                ]}>
                <Text numberOfLines={1} style={styles.title}>
                  EVENTS
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setactive(1)}
                style={[
                  styles.titleView,
                  {borderColor: active == 1 ? COLORS.white : COLORS.theme},
                ]}>
                <Text numberOfLines={1} style={styles.title}>
                  PHOTOS
                </Text>
              </Pressable>
            </View>

            {active == 0 ? (
              <TicketsList click={true} live={true} data={userEvent} />
            ) : null}
            {/* {active == 1 ? (
          <UserList
            data={eventMyGuest}
            showPlus={false}
            showBottom={false}
            disableLive={true}
            event={true}
          />
        ) : null}  */}
          </View>
        </>
      )}
    </CustomImageBackground>
  );
};

export default ViewUserProfile;

const styles = StyleSheet.create({
  shadowTxt: {
    color: COLORS.white,
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
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '50%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
});
