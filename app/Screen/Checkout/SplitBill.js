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
  TouchableOpacity,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import GlobalStyles from '../../Component/GlobalStyle';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import GradientButton from '../../Component/Button/GradientButton';
import Navigation from '../../Service/Navigation';

const SplitBill = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Split the Bill"
        icon={false}
        back={() => Navigation.back()}
      />

      <Text
        style={{
          color: COLORS.white,
          fontFamily: FONTS.SemiBold,
          textAlign: 'center',
        }}>
        Invite upto 4 guests
      </Text>

      <TextInput
        placeholder="Enter guest email address"
        placeholderTextColor={COLORS.white}
        // keyboardType="email-address"
        style={[
          GlobalStyles.textInput,
          {width: '85%', alignSelf: 'center', marginVertical: 10},
        ]}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '85%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderColor: COLORS.theme,
            paddingHorizontal: 13,
            paddingVertical: 3,
            borderRadius: 5,
            marginRight: 7,
          }}>
          <Text
            style={{
              color: COLORS.theme,
              fontFamily: FONTS.Medium,
              fontSize: moderateScale(12),
            }}>
            Add More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderColor: COLORS.textInput,
            paddingHorizontal: 13,
            paddingVertical: 3,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: COLORS.textInput,
              fontFamily: FONTS.Medium,
              fontSize: moderateScale(12),
            }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '85%',
        }}>
        <GradientButton
          title="Confirm"
          onPress={() => Navigation.navigate('Checkout2')}
          // onPress={() => setModal(true)}
        />
      </View>
    </CustomImageBackground>
  );
};

export default SplitBill;

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
