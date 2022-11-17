import {Icon} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import GlobalStyles from '../../Component/GlobalStyle';
import SocialLogin from '../../Component/SocialLogin';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import GradientButton from '../../Component/Button/GradientButton';
import ImageWithTitle from '../../Component/Header/ImageWithTitle';
import CheckBox from '@react-native-community/checkbox';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Toast from 'react-native-simple-toast';
import Auth from '../../Service/Auth';
import {setUser} from '../../Redux/reducer/user';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

export default function Password(props) {
  const {data} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log("data",data)

  const [check1, setcheck1] = React.useState(false);
  const [check2, setcheck2] = React.useState(false);
  const [cemail, setcemail] = React.useState('');
  const [pass, setpass] = React.useState('');
  const [cpass, setcpass] = React.useState('');
  const [mobile, setmobile] = React.useState('');

  const signUp = async () => {
    if (cemail == '' || pass == '' || cpass == '' || mobile == '') {
      Toast.show('Please fill out all fields!');
      return;
    }

    let pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    let emailresult = pattern.test(cemail);

    if (emailresult !== true) {
      Toast.show('Invalid Email Id!', Toast.SHORT);
      return false;
    }

    if (pass.length <= 3) {
      Toast.show('Password minimum length 4 !');
      return;
    }
    if (pass != cpass) {
      Toast.show("Password doesn't match!");
      return;
    }
    if (!check1) {
      Toast.show('Confirm your age above 21!');
      return;
    }
    if (!check2) {
      Toast.show('Accepts our terms of service!');
      return;
    }

    data.password = pass;
    data.email = cemail;
    data.phone = mobile;
    data.country = 'USA';

    console.log('ddd', data);

    let result = await Auth.register(data);

    console.log('result', result);
    if (result && result.status) {
      Toast.show('Signup Successfully!', Toast.SHORT);
      // await Auth.setAccount(result.data);
      await Auth.setToken(result.data.token);
      // dispatch(setUser(result.data));
      // Navigation.navigate('UploadPic');
      navigation.replace('UploadPic');
    } else {
      Toast.show(result?.message);
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
            <ImageWithTitle title="Create Account" />

            <TextInput
              placeholder="Email Address"
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
              style={GlobalStyles.textInput}
              value={cemail}
              onChangeText={val => setcemail(val.toLowerCase())}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={mobile}
              onChangeText={val => setmobile(val)}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={pass}
              onChangeText={val => setpass(val)}
            />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={cpass}
              onChangeText={val => setcpass(val)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: Platform.OS == 'ios' ? 10 : 0,
              }}>
              <CheckBox
                value={check1}
                onValueChange={val => setcheck1(val)}
                style={styles.checkbox}
                tintColors={true ? '#fff' : '#fff'}
              />
              <Text style={styles.dob}>Confirm age above 21</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={check2}
                onValueChange={val => setcheck2(val)}
                style={styles.checkbox}
                tintColors={true ? '#fff' : '#fff'}
              />
              <Text style={styles.dob}>Accepts terms of service</Text>
            </View>
          </View>

          <View>
            <GradientButton
              title="Sign Up"
              onPress={signUp}
              // onPress={() => Navigation.navigate('UploadPic')}
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
    marginRight: Platform.OS == 'ios' ? 10 : 0,
  },
  dob: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(11.5),
    color: COLORS.white,
  },
});
