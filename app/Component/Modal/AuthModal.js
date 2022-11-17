import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import Navigation from '../../Service/Navigation';
import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../../PixelRatio';
import NormalButton from '../Button/NormalButton';
import GlobalStyles from '../GlobalStyle';
import Auth from '../../Service/Auth';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function AuthModal(props) {
  const [disabled, setdisabled] = useState(false);
  const [pass, setpass] = useState('');
  const [hidePass, sethidePass] = useState(true);
  const [showPasswordInput, setshowPasswordInput] = useState(false);
  // console.log("props",props.userData)

  const verifyUser = async () => {
    if (!showPasswordInput) {
      return;
    }
    if (pass == '' && showPasswordInput) {
      Toast.show('Please enter password!');
      return;
    }
    setdisabled(true);
    let data = {
      email: props.userData.email,
      password: pass,
    };
    let result = await Auth.login(data);
    console.log('result', result);
    if (result && result.status) {
      props.verified();
    } else {
      Toast.show('Invalid credentials!', Toast.SHORT);
    }
    setdisabled(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <View style={GlobalStyles.modalMainView}>
        <View style={GlobalStyles.modalContainer}>
          <View style={GlobalStyles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>Authentication</Text>
            <TouchableOpacity onPress={() => props.close()}>
              <Icon name="cross" type="Entypo" />
            </TouchableOpacity>
          </View>

          {showPasswordInput ? (
            <>
              {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <View
                style={{
                  width: '43%',
                  height: 0.6,
                  backgroundColor: COLORS.textInput,
                }}
              />
              <Text
                style={{
                  color: COLORS.textInput,
                  textAlign: 'center',
                  fontFamily: FONTS.SemiBold,
                  fontSize: moderateScale(12),
                }}>
                OR
              </Text>
              <View
                style={{
                  width: '43%',
                  height: 0.6,
                  backgroundColor: COLORS.textInput,
                }}
              />
            </View> */}

              {/* <TextInput
              placeholder="Account Password"
              value={pass}
              secureTextEntry={true}
              onChangeText={val => setpass(val)}
              style={{
                borderWidth: 0.4,
                borderColor: COLORS.textInput,
                height: 40,
                borderRadius: 5,
                paddingLeft: 15,
                marginBottom: 10,
              }}
            /> */}

              <View
                style={{
                  ...GlobalStyles.textInput,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 10,
                  height: 45,
                  backgroundColor: 'transparent',
                  borderWidth: 0.4,
                  borderColor: COLORS.textInput,
                }}>
                <TextInput
                  placeholderTextColor={COLORS.liteBlack}
                  style={{
                    ...GlobalStyles.textInput,
                    backgroundColor: null,
                    width: '80%',
                    paddingLeft: 0,
                    height: 45,
                    color: COLORS.textInput,
                    marginBottom: 0,
                  }}
                  placeholder="Account Password"
                  value={pass}
                  onChangeText={val => setpass(val)}
                  secureTextEntry={hidePass}
                />
                <Icon
                  onPress={() => sethidePass(!hidePass)}
                  name={hidePass ? 'eye-off' : 'eye'}
                  type="Ionicons"
                  style={{color: COLORS.theme, fontSize: 25}}
                />
              </View>
            </>
          ) : (
            <TextInput
              placeholder="Phone Verification code"
              style={{
                borderWidth: 0.4,
                borderColor: COLORS.textInput,
                height: 45,
                borderRadius: 5,
                paddingLeft: 15,
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setshowPasswordInput(!showPasswordInput)}>
              <Text
                style={{
                  color: COLORS.theme,
                  textAlign: 'right',
                  fontFamily: FONTS.SemiBold,
                  fontSize: moderateScale(12),
                  marginVertical: 5,
                }}>
                {showPasswordInput ? 'Use Code' : 'Use Password'}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: COLORS.theme,
                textAlign: 'right',
                fontFamily: FONTS.SemiBold,
                fontSize: moderateScale(12),
                marginVertical: 5,
              }}>
              {showPasswordInput ? '' : 'Resend Code'}
            </Text>
          </View>
          <NormalButton
            title={props.buttonTitle}
            onPress={verifyUser}
            disabled={disabled}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
