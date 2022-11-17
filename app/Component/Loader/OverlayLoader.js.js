import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../Constant/Colors';

const OverlayLoader = ({show}) => {
  if (!show) {
    return null;
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
      }}>
      <ActivityIndicator size="large" color={COLORS.theme} />
    </View>
  );
};

export default OverlayLoader;
