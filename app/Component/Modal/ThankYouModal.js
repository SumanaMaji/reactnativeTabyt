import {Icon} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import GlobalStyles from '../GlobalStyle';

export default function ThankYouModal(props) {
  const {title, subtitle} = props;

  return (
    <View style={GlobalStyles.modalMainView}>
      <View style={GlobalStyles.modalContainer}>
        <View style={[GlobalStyles.modalHeader, {marginBottom: 10}]}>
          <Text style={GlobalStyles.modalTitle}>Thank You</Text>
          <TouchableOpacity onPress={() => props.close()}>
            <Icon name="cross" type="Entypo" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: COLORS.black,
            fontFamily: FONTS.Regular,
            fontSize: moderateScale(11.5),
            opacity: 0.7,
            marginBottom: 10,
          }}>
          Thank you for submitting you application to join our Community. Your
          application is being reviewed for completeness and accuracy. We will
          reach out to you using the email address provided if there is
          additional information needed to processyour application
        </Text>
      </View>
    </View>
  );
}
