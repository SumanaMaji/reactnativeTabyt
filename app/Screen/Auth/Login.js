import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import GradientButton from '../../Component/Button/GradientButton';
import GlobalStyles from '../../Component/GlobalStyle';
import ImageWithTitle from '../../Component/Header/ImageWithTitle';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import SocialLogin from '../../Component/SocialLogin';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import {setUser} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';

const {width, height} = Dimensions.get('window');

export default function Login() {
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [hidepass, sethidepass] = useState(true);
  const [disabled, setdisabled] = useState(false);

  const loginUser = async () => {
    if (email == '' || pass == '') {
      Toast.show('Please enter email and password!');
      return;
    }

    setdisabled(true);
    let data = {
      email: email,
      password: pass,
    };
    let result = await Auth.login(data);
    console.log('result', result);
    if (result && result.status) {
      Toast.show('Login Successfully!', Toast.SHORT);
      await Auth.setAccount(result.data);
      await Auth.setToken(result.data.token);
      dispatch(setUser(result.data));
    } else if (result && !result.status && !result.accountVerified) {
      Toast.show(result?.message);
    } else {
      Toast.show('Invalid credentials!', Toast.SHORT);
    }
    setdisabled(false);
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
            <ImageWithTitle title="Login" />

            <TextInput
              placeholder="Email Address"
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
              style={GlobalStyles.textInput}
              value={email}
              onChangeText={val => setemail(val.toLowerCase())}
            />
            <View
              style={{
                ...GlobalStyles.textInput,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10,
              }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.white}
                style={{
                  ...GlobalStyles.textInput,
                  backgroundColor: null,
                  width: '80%',
                  paddingLeft: 0,
                }}
                value={pass}
                onChangeText={val => setpass(val)}
                secureTextEntry={hidepass}
              />
              <Icon
                onPress={() => sethidepass(!hidepass)}
                name={hidepass ? 'eye-off' : 'eye'}
                type="Ionicons"
                style={{color: COLORS.theme, fontSize: 25}}
              />
            </View>
            <TouchableOpacity onPress={() => Navigation.navigate('Email')}>
              <Text style={styles.dob}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View>
            <GradientButton
              title="Login"
              onPress={loginUser}
              disabled={disabled}
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
              Don't have an account?{' '}
              <Text
                onPress={() => Navigation.navigate('Register')}
                style={{
                  fontFamily: FONTS.title,
                  textDecorationLine: 'underline',
                }}>
                Sign Up
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
