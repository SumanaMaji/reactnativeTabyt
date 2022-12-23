import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Helper from '../../Service/Helper';

const EventName = ({data}) => {
  const renderLiveStatus = () => {
    const timeCheckStatus = Helper.checkDateTimeStatus(
      data.startDate,
      data.startTime,
      data.endDate,
      data.endTime,
      data?.timeZone,
    );
    if (timeCheckStatus) {
      return (
        <View style={styles.liveContainer}>
          <View style={styles.greenDot} />
          <Text style={styles.liveTxt}>Live</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.addressContainer}>
      <Text
        style={{
          color: COLORS.white,
          fontFamily: FONTS.Medium,
          fontSize: moderateScale(15.5),
          lineHeight: 20,
          marginTop: 10,
        }}>
        {data.name}
      </Text>
      {renderLiveStatus()}
    </View>
  );
};

export default EventName;

const styles = StyleSheet.create({
  liveTxt: {
    color: COLORS.green,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(11),
  },
  greenDot: {
    width: 13,
    height: 13,
    borderWidth: 3,
    backgroundColor: COLORS.green,
    borderColor: COLORS.textInput,
    borderRadius: 15,
    marginRight: 5,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  addressTxt: {
    color: COLORS.button,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
    width: '100%',
  },
  locationIcon: {
    color: COLORS.button,
    fontSize: moderateScale(18),
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
