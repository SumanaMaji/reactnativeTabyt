import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import BackCross from '../../Component/Header/BackCross';
import GlobalStyles from '../../Component/GlobalStyle';
import NormalButton from '../../Component/Button/NormalButton';
import Event from '../../Service/Event';
import SimpleToast from 'react-native-simple-toast';
import Navigation from '../../Service/Navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ContactUs = () => {
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [msg, setmsg] = useState('');

  const submit = async () => {
    if (!phone || !email || !msg) {
      SimpleToast.show('Please fill out all fields!');
    }
    let pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    let emailresult = pattern.test(email);

    if (emailresult !== true) {
      SimpleToast.show('Invalid Email Id!');
      return false;
    }
    let data = {
      phone: phone,
      email: email,
      comment: msg,
    };
    const result = await Event.submitContactUs(data);
    console.log('result=>>>', result);
    if (result && result?.status) {
      SimpleToast.show('Request submitted!');
      Navigation.back();
    } else {
      SimpleToast.show('Somethings wrong, try after sometimes!');
    }
  };
  return (
    <CustomImageBackground>
      <BackCross title="Contact Us" icon={false} />
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-evenly',
            width: '85%',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={COLORS.white}
            style={GlobalStyles.textInput}
            value={phone}
            onChangeText={val => setphone(val)}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={COLORS.white}
            style={GlobalStyles.textInput}
            value={email}
            onChangeText={val => setemail(val)}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor={COLORS.white}
            multiline={true}
            numberOfLines={5}
            value={msg}
            onChangeText={setmsg}
            style={[
              GlobalStyles.textInput,
              {borderRadius: 5, marginBottom: 10},
            ]}
          />
          <NormalButton title="Send" onPress={submit} style={{marginTop: 15}} />
        </View>
      </KeyboardAwareScrollView>
    </CustomImageBackground>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    marginTop: 10,
    paddingVertical: verticalScale(15),
    // borderBottomWidth: 0.2,
    // borderColor: COLORS.textInput,
    paddingHorizontal: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: 10,
  },
  name: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(12),
  },
  shadow: {
    color: COLORS.lightgray,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(11.5),
    // opacity:.7
  },
  plusButton: {
    width: moderateScale(30),
    height: moderateScale(25),
    borderWidth: 1,
    // borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  plusIcon: {
    color: COLORS.theme,
    fontSize: moderateScale(17),
  },
});
