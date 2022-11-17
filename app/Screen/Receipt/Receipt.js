import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import BackCross from '../../Component/Header/BackCross';
import {moderateScale} from '../../PixelRatio';
import {FONTS} from '../../Constant/Font';
import {COLORS} from '../../Constant/Colors';
import {Icon} from 'native-base';
import Navigation from '../../Service/Navigation';

const Receipt = props => {
  const {eventData} = props.route.params;
  console.log('eventData=>>', eventData);
  return (
    <CustomImageBackground>
      <BackCross title="Receipt" icon={false} />
      <ScrollView style={{marginTop: 10}}>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Event Name</Text>
            <Text style={styles.regularTxt}>{eventData?.eventsData?.name}</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Reservation Type</Text>
            <Text style={styles.regularTxt}>
              {eventData?.bookingType == 'ticket' ? 'Ticket' : 'Table'}{' '}
              Reservation
            </Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Original Order</Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.semiboldTxt}>
                ${Number(eventData?.total).toFixed(2)}
              </Text>
              <Text style={styles.opacityTxt}>
                Including Tax, Tips and Promotion
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.gaplist}
          onPress={() => Navigation.navigate('OrginalOrder', {eventData})}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>View Original Order</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{color: COLORS.white}}
            />
          </View>
        </Pressable>

        {/* <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Additional Order</Text>
            <Text style={styles.regularTxt}>$25.00</Text>
          </View>
        </View> */}

        {/* <Pressable
          style={styles.gaplist}
          onPress={() => Navigation.navigate('AdditionalOrder')}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>View Additional Order</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{color: COLORS.white}}
            />
          </View>
        </Pressable> */}

        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Sub Total</Text>
            <Text style={styles.semiboldTxt}>
              ${Number(eventData?.subtotal).toFixed(2)}
            </Text>
          </View>
          {eventData?.split ? (
            <View style={styles.subList}>
              <Text style={styles.semiboldTxt}>Split the Bill</Text>
              <Text style={styles.semiboldTxt}>
                {eventData?.splitbookingusers.length} Way Split
              </Text>
            </View>
          ) : null}
        </View>
        {eventData?.split ? (
          <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.regularTxt}>View Split List</Text>
              <Icon
                name="keyboard-arrow-right"
                type="MaterialIcons"
                style={{color: COLORS.white}}
              />
            </View>
          </View>
        ) : null}

        <View style={[styles.gaplist, {borderBottomWidth: 0}]}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Your Total</Text>
            <Text style={styles.extraboldTxt}>
              ${Number(eventData?.total).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </CustomImageBackground>
  );
};

export default Receipt;

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
    paddingVertical: moderateScale(13.5),
    borderBottomWidth: 0.7,
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
  opacityTxt: {
    color: COLORS.white,
    opacity: 0.7,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(9),
  },
});
