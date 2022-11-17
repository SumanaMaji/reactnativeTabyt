import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../Constant/Colors';

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.theme} />
    </View>
  );
};

export default Loader;
