import {Icon} from 'native-base';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import NormalButton from '../../Component/Button/NormalButton';
import GlobalStyles from '../../Component/GlobalStyle';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';

const ChangePassword = () => {
  const [pass, setpass] = useState('');
  const [cPass, setcPass] = useState('');
  const [nPass, setnPass] = useState('');
  const [hidepass1, sethidepass1] = useState(true);
  const [hidepass2, sethidepass2] = useState(true);
  const [hidepass3, sethidepass3] = useState(true);

  const updatePass = async () => {
    if (nPass.length <= 3) {
      SimpleToast.show('Password minimum length 4 !');
      return;
    }
    if (nPass.length <= 3) {
      SimpleToast.show('Password minimum length 4 !');
      return;
    }
    if (nPass != cPass) {
      SimpleToast.show("New password doesn't match!");
      return;
    }

    const result = await Auth.updatePassword({
      oldPassword: pass,
      password: nPass,
    });

    console.log('updaye Pas', result);

    if (result && result.status) {
      SimpleToast.show('Password changed successfully!');
      Navigation.back();
    } else {
      SimpleToast.show('Somethings wrong, try after sometimes');
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="Settings" icon={false} />
      <View style={{width: '85%', alignSelf: 'center', flex: 1, marginTop: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                ...GlobalStyles.textInput,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10,
              }}>
              <TextInput
                placeholder="Current Password"
                placeholderTextColor={COLORS.white}
                style={{
                  ...GlobalStyles.textInput,
                  backgroundColor: null,
                  width: '80%',
                  paddingLeft: 0,
                }}
                value={pass}
                onChangeText={val => setpass(val)}
                secureTextEntry={hidepass1}
              />
              <Icon
                onPress={() => sethidepass1(!hidepass1)}
                name={hidepass1 ? 'eye-off' : 'eye'}
                type="Ionicons"
                style={{color: COLORS.theme, fontSize: 25}}
              />
            </View>
            <View
              style={{
                ...GlobalStyles.textInput,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10,
              }}>
              <TextInput
                placeholder="New Password"
                placeholderTextColor={COLORS.white}
                style={{
                  ...GlobalStyles.textInput,
                  backgroundColor: null,
                  width: '80%',
                  paddingLeft: 0,
                }}
                value={nPass}
                onChangeText={val => setnPass(val)}
                secureTextEntry={hidepass2}
              />
              <Icon
                onPress={() => sethidepass2(!hidepass2)}
                name={hidepass2 ? 'eye-off' : 'eye'}
                type="Ionicons"
                style={{color: COLORS.theme, fontSize: 25}}
              />
            </View>

            <View
              style={{
                ...GlobalStyles.textInput,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 10,
              }}>
              <TextInput
                placeholder="Confirm New Password"
                placeholderTextColor={COLORS.white}
                style={{
                  ...GlobalStyles.textInput,
                  backgroundColor: null,
                  width: '80%',
                  paddingLeft: 0,
                }}
                value={cPass}
                onChangeText={setcPass}
                secureTextEntry={hidepass3}
              />
              <Icon
                onPress={() => sethidepass3(!hidepass3)}
                name={hidepass3 ? 'eye-off' : 'eye'}
                type="Ionicons"
                style={{color: COLORS.theme, fontSize: 25}}
              />
            </View>

            <NormalButton
              title="Update"
              onPress={updatePass}
              style={{marginTop: 10}}
            />
          </View>
        </ScrollView>
      </View>
    </CustomImageBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  shadowTxt: {
    color: COLORS.textInput,
    //   opacity:1,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
  boldTxt: {
    color: COLORS.white,
    opacity: 1,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
  list: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    marginBottom: 0,
    paddingBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13.5),
    marginLeft: 13,
  },
});
