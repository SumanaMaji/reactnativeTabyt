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
import Auth from '../../Service/Auth';
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
  const [cityName, setcityName] = useState('');
  const [stateName, setstateName] = useState('');
  const [followStatus, setfollowStatus] = useState('Follow');
  const [followButton, setfollowButton] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    console.log('getUserProfile=>>', uname, uId);
    const result = await Event.getUserProfile(uId);
    console.log('userProfile', JSON.stringify(result));
    if (result && result.status) {
      setuData(result?.data);
      setuserEvent(result?.data?.bookingEvents);
      getAllStates(result?.data?.state);
      getCity(result?.data?.state, result?.data?.city);
      getAge(result?.data);
      setisFetching(false);
      if (result?.data?.followers) {
        const checkFollowStatus = result?.data?.followers.filter(
          i => i.receiver == userData._id || i.sender == userData._id,
        );
        console.log('checkFollowStatus=>>', checkFollowStatus);
        if (checkFollowStatus.length > 0) {
          const followCheck = checkFollowStatus.filter(i => i.accpect == true);
          if (followCheck && followCheck.length > 0) {
            setfollowStatus('Following');
          } else {
            setfollowStatus('Following Requested');
            setfollowButton(true);
          }
        } else {
          setfollowButton(false);
        }
      } else {
        setfollowButton(false);
      }
    }
  };

  const getAllStates = async stateId => {
    let result = await Auth.getStates();
    // console.log('states', result);
    if (result && result.success) {
      // setallstates(result.data);
      const currentState = result.data.filter(i => i.id === stateId);
      if (currentState.length > 0) {
        setstateName(currentState[0].name);
      }
    }
  };

  const getCity = async (stateId, cityId) => {
    let result = await Auth.getCity(stateId);
    // console.log('city result', result);
    if (result && result.success) {
      // setallcity(result.data);
      const currentCity = result.data.filter(i => i.id === cityId);
      if (currentCity.length > 0) {
        setcityName(currentCity[0].name);
      }
    }
  };

  const getAge = dada => {
    // setTimeout(() => {
    let a = moment([moment().format('YYYY', 'MM')]);
    let b = moment([moment(dada.dob, 'MM/DD/YYYY').format('YYYY', 'MM')]);
    // console.log('getAge', b);
    const agee = a.diff(b, 'years');
    setage(agee);
    // }, 1000);
  };

  const followUser = async () => {
    const result = await Event.followUser({receiver: uData?._id});
    console.log('followUser=>>>', result);
    if (result && result.status) {
      SimpleToast.show('Follow requested successfully!');
      setfollowStatus('Following Requested');
      setfollowButton(true);
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
                      {uData?.followers.filter(i => i.accpect == true).length}
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
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
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Medium,
                opacity: 0.7,
              }}>
              {cityName} | {stateName} | {uData?.relationship} |{' '}
              {uData?.profession}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Medium,
                opacity: 0.7,
              }}>
              {uData?.bio}
            </Text>
            {/* follow view */}
            {uId == userData._id ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 7,
                  width: '100%',
                }}>
                <TouchableOpacity
                  disabled={followButton}
                  onPress={followUser}
                  style={{
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: COLORS.cream,
                    paddingVertical: 0,
                    borderRadius: 5,
                    // marginLeft: 10,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.cream,
                      fontFamily: FONTS.Medium,
                      fontSize: 13,
                    }}>
                    {followStatus}
                  </Text>
                </TouchableOpacity>
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
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    // marginLeft: 10,
                    width: '33%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.cream,
                      fontFamily: FONTS.Medium,
                      fontSize: 13,
                    }}>
                    SEND GIFT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
              {/* <Pressable
                onPress={() => setactive(1)}
                style={[
                  styles.titleView,
                  {borderColor: active == 1 ? COLORS.white : COLORS.theme},
                ]}>
                <Text numberOfLines={1} style={styles.title}>
                  PHOTOS
                </Text>
              </Pressable> */}
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
