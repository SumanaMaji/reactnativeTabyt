import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import AnimatedRow from '../../Component/AnimatedRow/AnimatedRow';
import ReservationHeader from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';

const {width} = Dimensions.get('window');

const PaymentInfo = props => {
  const isFoccused = useIsFocused();
  const [allPaymethod, setallPaymethod] = useState([]);

  useEffect(() => {
    if (isFoccused) {
      getPayMethod();
    }
  }, [isFoccused]);

  const getPayMethod = async () => {
    const result = await Event.getPaymentMethod();
    console.log('getPaymentMethod result', result.data);
    if (result && result.status) {
      setallPaymethod(result.data);
    }
  };

  const deleteCard = async data => {
    const result = await Event.deletePaymentMethod(data?._id);
    console.log('defaut payment result', result);
    if (result && result.success) {
      SimpleToast.show('Payment method deleted successfully!');
      getPayMethod();
    } else {
      SimpleToast.show('Something wrong, try after sometimes');
      getPayMethod();
    }
  };

  const setDefault = async data => {
    const result = await Event.setDefaultPayment(data?._id);
    console.log('defaut payment result', result);
    if (result && result.status) {
      SimpleToast.show('Payment method default added successfully!');
      getPayMethod();
    } else {
      SimpleToast.show('Something wrong, try after sometimes');
    }
  };

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Payment Method"
        icon={false}
        back={() => Navigation.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.list}>
          <View
            style={[
              styles.subList,
              {flexDirection: 'column', alignItems: 'flex-start'},
            ]}>
            <Text style={styles.semiboldTxt}>Payment Method</Text>
            <Text style={[styles.regularTxt, {marginTop: 10, marginBottom: 5}]}>
              Credit Card
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.regularTxt}>xxx 7879 | Visa</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.theme,
                  paddingHorizontal: 7,
                  paddingVertical: 1,
                  borderRadius: 5,
                  marginLeft: 15,
                }}>
                <Text
                  style={{
                    color: COLORS.theme,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(9),
                  }}>
                  Default
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}

        {allPaymethod.map((it, key) => (
          // <AnimatedRow key={key} edit={() => alert()} style={{height: 80}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 0.7,
              borderColor: COLORS.textInput,
            }}>
            <View
              key={key}
              style={[styles.list, {paddingVertical: moderateScale(0)}]}>
              <Text
                style={[
                  styles.semiboldTxt,
                  {color: COLORS.cream, fontSize: 12, marginBottom: 5},
                ]}>
                {it.type} {'   '}
                {it.default ? (
                  <Text
                    style={{
                      color: COLORS.theme,
                      fontFamily: FONTS.extraBold,
                    }}>
                    Default
                  </Text>
                ) : null}
              </Text>
              <Text style={styles.regularTxt}>
                xxx {it.cardNumber.substr(it.cardNumber.length - 4)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  setDefault(it);
                }}>
                <Icon
                  name="credit-card-check"
                  type="MaterialCommunityIcons"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#216666'}]}
                onPress={() => {
                  deleteCard(it);
                }}>
                <Icon name="close" type="Ionicons" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          // </AnimatedRow>
        ))}

        <Pressable
          onPress={() => Navigation.navigate('PaymentType')}
          style={[
            styles.list,
            {
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              borderBottomWidth: 0,
              marginTop: 20,
            },
          ]}>
          <Text style={styles.semiboldTxt}>Select New Payment Method</Text>
          <Icon
            name="keyboard-arrow-right"
            type="MaterialIcons"
            style={{color: COLORS.white}}
          />
        </Pressable>
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '85%',
        }}>
        <GradientButton
          title="Save"
          onPress={() => Navigation.navigate('Checkout2')}
          // onPress={() => setModal(true)}
        />
      </View> */}
      {/* <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}>
        <AuthModal
          close={val => {
            setModal(false);
            val == true ? Navigation.navigate('CheckoutReservation') : null;
          }}
          buttonTitle="Confirm"
        />
      </Modal> */}
    </CustomImageBackground>
  );
};

export default PaymentInfo;

const styles = StyleSheet.create({
  list: {
    // alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    paddingHorizontal: moderateScale(30),
    // paddingVertical: moderateScale(25),
    // borderBottomWidth: 0.7,
    // borderColor: COLORS.textInput,
    height: 80,
  },
  gaplist: {
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(15),
    borderBottomWidth: 0.7,
    borderColor: COLORS.textInput,
    alignSelf: 'center',
  },
  subList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  boldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
  semiboldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(13),
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
  button: {
    //   ...StyleSheet.absoluteFillObject,
    width: 46,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#268281',
    marginRight: 3,
  },
});
