import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {moderateScale} from '../../PixelRatio';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {Icon} from 'native-base';
import BackCross from '../../Component/Header/BackCross';

const {width, height} = Dimensions.get('window');

const Perks = () => {
  return (
    <CustomImageBackground>
      <BackCross title="Perks" icon={false} />
      <View style={styles.box}>
        <View style={styles.borderView}>
          <View>
            <Text style={styles.boldTxt}>High Level</Text>
            <Text style={styles.shadowTxt}>Expire on: June 15, 2020</Text>
          </View>
          <View style={styles.lockView}>
            <Icon
              style={{color: COLORS.theme, fontSize: moderateScale(17)}}
              name="md-lock-closed-sharp"
              type="Ionicons"
            />
          </View>
        </View>

        <Text style={styles.title}>Benefits</Text>

        <Text style={styles.listTxt}>a. Free Menu Item</Text>
        <Text style={styles.listTxt}>b. Free Birthday Gifts</Text>
        <Text style={styles.listTxt}>b. Free Ticket(s)</Text>
      </View>
    </CustomImageBackground>
  );
};

export default Perks;

const styles = StyleSheet.create({
  shadowTxt: {
    color: COLORS.white,
    opacity: 0.5,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
  boldTxt: {
    color: COLORS.white,
    opacity: 1,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
  listTxt: {
    fontFamily: FONTS.Regular,
    color: COLORS.white,
    fontSize: moderateScale(12.5),
    marginTop: 5,
    opacity: 0.8,
    marginLeft: 15,
  },
  title: {
    fontFamily: FONTS.Regular,
    color: COLORS.white,
    fontSize: moderateScale(12.5),
    marginTop: 10,
    opacity: 0.8,
  },
  box: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#00000038',
    padding: moderateScale(25),
    borderRadius: 5,
    marginTop: 20,
  },
  borderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: COLORS.textInput,
    paddingBottom: 15,
  },
  lockView: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: COLORS.textInput,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
  },
});
