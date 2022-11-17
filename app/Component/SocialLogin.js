import {Icon} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS} from '../Constant/Colors';
import {FONTS} from '../Constant/Font';
import {moderateScale, verticalScale} from '../PixelRatio';

export default function SocialLogin() {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.but}>
        <Image
          style={styles.img}
          source={require('../assets/Icon/google.png')}
        />
        <View>
          <Text style={styles.subTitle}>Login With</Text>
          <Text style={styles.title}>Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.but, {backgroundColor: '#3d548e'}]}>
        <Icon name="facebook" type="FontAwesome" style={styles.icon} />
        <View>
          <Text style={[styles.subTitle, {color: COLORS.white}]}>
            Login With
          </Text>
          <Text style={[styles.title, {color: COLORS.white}]}>Facebook</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  but: {
    height: verticalScale(48),
    flexDirection: 'row',
    width: '48.5%',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: FONTS.Regular,
    lineHeight: 14,
    fontSize: moderateScale(11),
  },
  title: {fontFamily: FONTS.title, lineHeight: 16, fontSize: moderateScale(14)},
  icon: {color: COLORS.white, marginHorizontal: 8, fontSize: moderateScale(25)},
  img: {width: '20%', resizeMode: 'contain', marginHorizontal: 8},
});
