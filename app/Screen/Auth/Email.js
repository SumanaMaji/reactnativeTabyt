import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';
import GradientButton from '../../Component/Button/GradientButton';
import GlobalStyles from '../../Component/GlobalStyle';
import ImageWithTitle from '../../Component/Header/ImageWithTitle';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import SocialLogin from '../../Component/SocialLogin';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';

export default function Email() {
  const [email, setemail] = useState('');

  const checkEmail = async () => {
    const result = await Auth.forgotPasswordEmailCheck({email: email});
    console.log('email checck', result);
    if (result && result.status) {
      SimpleToast.show('Otp - ' + result?.data?.otp, SimpleToast.LONG);
      Navigation.navigate('ForgotPassword', {otp: result?.data?.otp, email});
    } else {
      SimpleToast.show('Please enter a register email id!');
    }
  };
  return (
    <CustomImageBackground>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <TouchableOpacity
          onPress={() => Navigation.back()}
          style={{marginTop: moderateScale(45), marginLeft: moderateScale(15)}}>
          <Icon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            style={{color: COLORS.white, fontSize: moderateScale(30)}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 30,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <ImageWithTitle title="Forgot Password" />

            <TextInput
              placeholder="Your Email Address"
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
              style={GlobalStyles.textInput}
              value={email}
              onChangeText={setemail}
            />
          </View>

          <View>
            <GradientButton
              title="Submit"
              onPress={checkEmail}
              // onPress={() => Navigation.navigate('ForgotPassword')}
            />

            {/* <SocialLogin /> */}

            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Regular,
                fontSize: 13,
                marginVertical: moderateScale(15),
                textAlign: 'center',
              }}>
              Already have an account?{' '}
              <Text
                onPress={() => Navigation.navigate('Login')}
                style={{
                  fontFamily: FONTS.title,
                  textDecorationLine: 'underline',
                }}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    // backgroundColor:COLORS.textInput
    // borderColor:'#fff'
  },
  dob: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(11.5),
    color: COLORS.white,
    textAlign: 'right',
    marginTop: 5,
  },
});
