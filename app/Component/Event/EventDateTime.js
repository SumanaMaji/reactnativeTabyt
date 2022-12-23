import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from 'native-base';
import {moderateScale} from '../../PixelRatio';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import Helper from '../../Service/Helper';

const EventDateTime = ({startDate, endDate, startTime, endTime, timeZone}) => {
  return (
    <View style={{marginVertical: 4, marginBottom: 8}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.icon} name="calendar" type="Ionicons" />
          <Text style={styles.txt}>
            {Helper.renderDate(startDate, timeZone)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.icon} name="alarm" type="Ionicons" />
          <Text style={styles.txt}>
            {Helper.renderTime(startTime, timeZone)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.icon} name="calendar" type="Ionicons" />
          <Text style={styles.txt}>{Helper.renderDate(endDate, timeZone)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.icon} name="alarm" type="Ionicons" />
          <Text style={styles.txt}>{Helper.renderTime(endTime, timeZone)}</Text>
        </View>
      </View>
    </View>
  );
};

export default EventDateTime;

const styles = StyleSheet.create({
  txt: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(12.5),
    marginLeft: 7,
  },
  icon: {color: COLORS.white, fontSize: moderateScale(17)},
});
