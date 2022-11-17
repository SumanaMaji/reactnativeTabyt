import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../Constant/Colors';
import {FONTS} from '../Constant/Font';
import {moderateScale} from '../PixelRatio';

const styles = StyleSheet.create({
  inactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.textInput,
  },
  active: {
    borderWidth: 2,
    borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
});

const RadioWithTitle = ({title, selected, onPress, value}) => {
  let activeBox = {};

  if (value == title) {
    activeBox = styles.active;
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
        marginBottom: 10,
      }}>
      <View style={{...activeBox, marginRight: 15}}>
        <View
          style={{
            ...styles.inactive,
            backgroundColor: selected ? COLORS.theme : COLORS.textInput,
          }}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RadioWithTitle;
