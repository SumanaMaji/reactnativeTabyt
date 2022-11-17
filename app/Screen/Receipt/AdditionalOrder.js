import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import BackCross from '../../Component/Header/BackCross';
import {moderateScale} from '../../PixelRatio';
import {FONTS} from '../../Constant/Font';
import {COLORS} from '../../Constant/Colors';
import {Icon} from 'native-base';

const AdditionalOrder = () => {
  return (
    <CustomImageBackground>
      <BackCross title="View Additional Order" icon={false} />
      <ScrollView style={{marginTop: 10}}>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Table</Text>
            <Text style={styles.regularTxt}>$100</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Taxes</Text>
            <Text style={styles.regularTxt}>$15</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Tip</Text>
            <Text style={styles.regularTxt}>$30</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt2}>Sub Total</Text>
            <Text style={styles.regularTxt2}>$195</Text>
          </View>
        </View>

        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Split the Bill</Text>
            <Text style={styles.regularTxt}>2 Way Split</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt2}>Your Total</Text>
            <Text style={styles.regularTxt2}>$195</Text>
          </View>
        </View>

        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Your Deposit Paid</Text>
            <Text style={styles.regularTxt}>$100</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Total Paid at Check in</Text>
            <Text style={styles.regularTxt}>$50</Text>
          </View>
        </View>

        <View style={[styles.gaplist, {borderBottomWidth: 0}]}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Your Total</Text>
            <Text style={styles.extraboldTxt}>$325.00</Text>
          </View>
        </View>
      </ScrollView>
    </CustomImageBackground>
  );
};

export default AdditionalOrder;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(25),
    borderBottomWidth: 0.7,
    borderColor: COLORS.textInput,
  },
  gaplist: {
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(8),
    // borderBottomWidth: 0.7,
    borderColor: COLORS.textInput,
    alignSelf: 'center',
  },
  subList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 7,
  },
  boldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
  semiboldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
  extraboldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(17),
  },
  regularTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
  regularTxt2: {
    color: COLORS.cream,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
});
