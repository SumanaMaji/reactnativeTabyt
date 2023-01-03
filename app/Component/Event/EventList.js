import React from 'react';
import {Icon} from 'native-base';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import Helper from '../../Service/Helper';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

export default function EventList(props) {
  const {item} = props;
  //console.log('item=>>', item.name);
  const renderStatus = () => {
    // console.log('render time', new Date('2022-12-16T02:00:24.834Z').get);
    // console.log(
    //   'moment rc',
    //   momentTimezone
    //     .tz('2022-12-16T02:00:24.834Z', item?.timeZone)
    //     .format('LT'),
    // );
    const timeCheckStatus = Helper.checkDateTimeStatus(
      item.startDate,
      item.startTime,
      item.endDate,
      item.endTime,
      item?.timeZone,
    );
    if (timeCheckStatus) {
      return (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
          <View style={styles.dot} />
          <Text style={styles.txt}>Live</Text>
        </View>
      );
    }
  };

  return (
    <Pressable
      onPress={() =>
        Navigation.navigate('SingleEvent', {eventData: item, eId: item._id})
      }
      style={{
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: COLORS.textInput,
        paddingBottom: 15,
      }}>
      <FastImage
        source={{
          uri: BASE_DOMAIN + item.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: '100%',
          height: verticalScale(175),
          borderRadius: 7,
          marginBottom: 7,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
          <Icon
            name="md-location-sharp"
            type="Ionicons"
            style={{color: COLORS.button, fontSize: moderateScale(18)}}
          />
          <Text
            style={{
              color: COLORS.button,
              fontFamily: FONTS.Medium,
              fontSize: moderateScale(13),
              width: '100%',
            }}
            numberOfLines={1}>
            {item.address}, {item?.cityData?.name}, {item?.stateData?.name}
          </Text>
        </View>
        {renderStatus()}
      </View>

      <Text
        numberOfLines={2}
        style={{
          color: COLORS.white,
          fontFamily: FONTS.Medium,
          fontSize: moderateScale(15.5),
          lineHeight: 20,
          marginTop: 5,
        }}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 3,
          marginBottom: 2,
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.Regular,
            fontSize: moderateScale(11),
            opacity: 0.8,
          }}>
          Organized by:{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            {item?.organizerData?.name}
          </Text>
        </Text>

        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.Regular,
            fontSize: moderateScale(11),
            opacity: 0.8,
          }}>
          Attending: {item.attend}
        </Text>
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
            fontFamily: FONTS.Medium,
            fontSize: moderateScale(12.5),
            opacity: 0.8,
          }}>
          <Icon
            style={{color: COLORS.white, fontSize: moderateScale(17)}}
            name="calendar"
            type="Ionicons"
          />{' '}
          {Helper.renderDate(item?.startDate, item?.timeZone)}
        </Text>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.Medium,
            fontSize: moderateScale(12.5),
            opacity: 0.8,
          }}>
          <Icon
            style={{color: COLORS.white, fontSize: moderateScale(17)}}
            name="alarm"
            type="Ionicons"
          />
          {'  '}
          {Helper.renderTime(item?.startTime, item?.timeZone)}
          {' - '}
          {Helper.renderTime(item?.endTime, item?.timeZone)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 13,
    height: 13,
    borderWidth: 3,
    backgroundColor: COLORS.green,
    borderColor: COLORS.textInput,
    borderRadius: 15,
    marginRight: 5,
  },
  txt: {
    color: COLORS.green,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(11),
  },
});
