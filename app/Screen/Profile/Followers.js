import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import FollowRequest from '../../Component/MyAccount/FollowRequest';
import FollowUserList from '../../Component/MyAccount/FollowUserList';
import FullSearch from '../../Component/Search/FullSearch';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';

const Followers = () => {
  const {userData} = useSelector(state => state.User);
  const [active, setactive] = useState(0);
  const [refresh, setrefresh] = useState(true);
  const [followRequestData, setfollowRequestData] = useState([]);
  const [allFollowerData, setallFollowerData] = useState([]);
  const [allFollowingData, setallFollowingData] = useState([]);

  useEffect(() => {
    getFollower();
    getFollowing();
    getFollowRequest();
  }, [refresh]);

  const getFollower = async () => {
    const result = await Event.getFollower();
    console.log('all folower', JSON.stringify(result));
    if (result && result.status) {
      setallFollowerData(result.data);
    }
  };
  const getFollowing = async () => {
    const result = await Event.getFollowing();
    console.log('getFollowing', result);
    if (result && result.status) {
      setallFollowingData(result.data);
    }
  };
  const getFollowRequest = async () => {
    const result = await Event.getFollowRequest();
    console.log('folow request', userData?._id);
    if (result && result.status) {
      setfollowRequestData(result.data);
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="Followers" icon={false} />
      <View style={{marginHorizontal: moderateScale(30)}}>
        <FullSearch />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Pressable
            onPress={() => setactive(0)}
            style={[
              styles.titleView,
              {borderColor: active == 0 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              FOLLOWERS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(1)}
            style={[
              styles.titleView,
              {borderColor: active == 1 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              FOLLOWING
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(2)}
            style={[
              styles.titleView,
              {borderColor: active == 2 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              REQUESTS
            </Text>
          </Pressable>
        </View>

        {active == 0 ? (
          <FollowUserList showPlus={true} data={allFollowerData} />
        ) : null}
        {active == 1 ? (
          <FollowUserList showPlus={false} data={allFollowingData} />
        ) : null}
        {active == 2 ? (
          <FollowRequest
            showPlus={false}
            showBottom={true}
            data={followRequestData}
            userId={userData?._id}
            reload={() => setrefresh(!refresh)}
          />
        ) : null}
      </View>

      {/* <TicketsList /> */}
    </CustomImageBackground>
  );
};

export default Followers;

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '33.3%',
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
