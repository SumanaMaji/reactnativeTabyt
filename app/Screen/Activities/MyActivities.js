import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import HomeHeader from '../../Component/Header/HomeHeader';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Event from '../../Service/Event';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const MyActivities = () => {
  const [isFetching, setisFetching] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [allActivity, setallActivity] = React.useState([]);

  useEffect(() => {
    getAllActivity();
  }, []);

  const getAllActivity = async () => {
    const result = await Auth.getActivity();
    console.log('activity result', JSON.stringify(result));
    if (result && result.data) {
      setallActivity(result.data);
      setRefreshing(false);
    }
    setisFetching(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllActivity();
  }, []);

  const handleSplitBill = async (type, data) => {
    let payload = {};
    if (type === 'accept') {
      payload = {
        approved: true,
        activitie: data._id,
      };
    } else {
      payload = {
        reject: true,
        activitie: data._id,
      };
    }
    console.log('payload', payload, data?.external?.splitBookingId);
    const result = await Event.approveSplitBill(
      data?.external?.splitBookingId,
      payload,
    );
    console.log('split bill resutl', result);
    getAllActivity();
  };

  return (
    <CustomImageBackground>
      <HomeHeader title="Activites" />
      {isFetching ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {allActivity.map((it, key) => (
            <View
              key={key}
              style={{
                borderBottomWidth: 0.3,
                paddingHorizontal: moderateScale(25),
                paddingVertical: moderateScale(20),
                flexDirection: 'row',
                borderColor: COLORS.textInput,
              }}>
              <Image
                source={{uri: BASE_DOMAIN + it.userData.image}}
                style={{
                  width: moderateScale(30),
                  height: moderateScale(30),
                  borderRadius: moderateScale(15),
                  backgroundColor: COLORS.cream,
                }}
              />
              <View style={{flex: 1, marginLeft: 15}}>
                <View style={{}}>
                  <Text
                    style={{
                      color: COLORS.lightgray,
                      fontFamily: FONTS.Medium,
                      opacity: 0.7,
                      fontSize: moderateScale(11),
                    }}>
                    {moment(it.createOn).format('MMM DD, YYYY')}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    {it.massage}
                  </Text>
                </View>
                {it?.external?.type === 'SplitBill' &&
                it?.external?.request == 0 ? (
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <TouchableOpacity
                      onPress={() => handleSplitBill('accept', it)}
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 5,
                        borderColor: COLORS.theme,
                      }}>
                      <Text
                        style={{
                          color: COLORS.theme,
                          fontFamily: FONTS.Medium,
                          fontSize: 12,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSplitBill('reject', it)}
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 5,
                        borderColor: COLORS.cream,
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          color: COLORS.cream,
                          fontFamily: FONTS.Medium,
                          fontSize: 12,
                        }}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </CustomImageBackground>
  );
};

export default MyActivities;
