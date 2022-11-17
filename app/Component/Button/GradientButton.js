import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';

export default function GradientButton({style, onPress, title, disabled}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}}
        end={{x: 0.7, y: 1.0}}
        locations={[0, 0.6, 1]}
        colors={COLORS.gradient}
        style={styles.linearGradient}>
        {disabled ? (
          <ActivityIndicator color={COLORS.white} size="small" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: verticalScale(50),
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: verticalScale(50),
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.title,
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
  },
});
