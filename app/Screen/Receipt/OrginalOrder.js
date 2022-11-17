import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import BackCross from '../../Component/Header/BackCross';
import {moderateScale} from '../../PixelRatio';
import {FONTS} from '../../Constant/Font';
import {COLORS} from '../../Constant/Colors';
import {Icon} from 'native-base';

const OrginalOrder = props => {
  const {eventData} = props.route.params;

  return (
    <CustomImageBackground>
      <BackCross title="View Orginal Order" icon={false} />
      <ScrollView style={{marginTop: 10}}>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>
              {eventData?.bookingType == 'ticket' ? 'Ticket' : 'Table'}
            </Text>
            <Text style={styles.regularTxt}>
              ${Number(eventData?.subtotal).toFixed(2)}
            </Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Promotions</Text>
            <Text style={styles.regularTxt}>$0</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Taxes</Text>
            <Text style={styles.regularTxt}>
              ${Number(eventData?.tax).toFixed(2)}
            </Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Tip</Text>
            <Text style={styles.regularTxt}>
              {' '}
              ${Number(eventData?.tips).toFixed(2)}
            </Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt2}>Sub Total</Text>
            <Text style={styles.regularTxt2}>
              {' '}
              ${Number(eventData?.subtotal).toFixed(2)}
            </Text>
          </View>
        </View>
        {eventData?.split ? (
          <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.regularTxt}>Split the Bill</Text>
              <Text style={styles.regularTxt}>
                {' '}
                {eventData?.splitbookingusers.length} Way Split
              </Text>
            </View>
            {/* <View style={styles.subList}>
              <Text style={styles.regularTxt2}>Your Total</Text>
              <Text style={styles.regularTxt2}>$195</Text>
            </View> */}
          </View>
        ) : null}

        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Your Deposit Paid</Text>
            <Text style={styles.regularTxt}>
              ${Number(eventData?.total - eventData?.due).toFixed(2)}
            </Text>
          </View>
          {/* <View style={styles.subList}>
            <Text style={styles.regularTxt}>Total Paid at Check in</Text>
            <Text style={styles.regularTxt}>$50</Text>
          </View> */}
        </View>

        <View style={[styles.gaplist, {borderBottomWidth: 0}]}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Your Total</Text>
            <Text style={styles.extraboldTxt}>
              {' '}
              ${Number(eventData?.total).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </CustomImageBackground>
  );
};

export default OrginalOrder;

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
