import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Switch,
  StyleSheet,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import GlobalStyles from '../../Component/GlobalStyle';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import GradientButton from '../../Component/Button/GradientButton';
import AuthModal from '../../Component/Modal/AuthModal';
import Navigation from '../../Service/Navigation';

const Checkout = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Checkout"
        icon={false}
        back={() => Navigation.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Payment Method</Text>
            <Text style={styles.regularTxt}>xxx 7879 | Visa</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Select New Payment Method</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{color: COLORS.white}}
            />
          </View>
        </View>
        <View style={[styles.list, {paddingVertical: moderateScale(20)}]}>
          <View style={styles.subList}>
            <Text style={styles.extraboldTxt}>Join List ( 1 )</Text>
          </View>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Dulcie Dasher's Guest List</Text>
            <Text style={styles.regularTxt}>$100.00</Text>
          </View>
          <View style={styles.subList}>
            <Text
              style={[
                styles.regularTxt,
                {fontSize: moderateScale(11), opacity: 0.7},
              ]}>
              Admission: 4 members
            </Text>
          </View>
        </View>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.regularTxt}>Subtotal</Text>
            <Text style={styles.regularTxt}>$115.00</Text>
          </View>
        </View>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.boldTxt}>Promo Code</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? COLORS.theme : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.subList}>
            <Text
              style={[
                styles.regularTxt,
                {fontSize: moderateScale(11), opacity: 0.7},
              ]}>
              Promotion Discount ( 0% )
            </Text>
            <Text
              style={[
                styles.regularTxt,
                {fontSize: moderateScale(11), opacity: 0.7},
              ]}>
              $0
            </Text>
          </View>
        </View>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Your Total</Text>
            <Text style={styles.extraboldTxt}>$115.00</Text>
          </View>
        </View>
        <View style={styles.gaplist}>
          <View style={styles.subList}>
            <Text style={styles.semiboldTxt}>Due Now</Text>
            <Text style={styles.semiboldTxt}>$11.5</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '85%',
        }}>
        <GradientButton
          title="Purchase"
          onPress={() => Navigation.navigate('Checkout2')}
          // onPress={() => setModal(true)}
        />
      </View>
      <Modal
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
      </Modal>
    </CustomImageBackground>
  );
};

export default Checkout;

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
});
