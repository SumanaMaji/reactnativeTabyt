import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Icon} from 'native-base';
import GlobalStyle from '../Style/GlobalStyle';
import {COLORS} from '../../Constant/Colors';

const PaymentCard = ({cardData, newPaymentCallbBack}) => {
  return (
    <View style={GlobalStyle.list}>
      {cardData && Object.keys(cardData).length > 0 ? (
        <View style={GlobalStyle.subList}>
          <Text style={GlobalStyle.semiboldTxt}>Payment Method</Text>
          <Text
            style={{...GlobalStyle.regularTxt, marginLeft: 10}}
            adjustsFontSizeToFit>
            xxx {cardData?.cardNumber.substr(cardData?.cardNumber.length - 4)} |{' '}
            {cardData?.type}
          </Text>
        </View>
      ) : null}
      <Pressable
        style={GlobalStyle.subList}
        onPress={() => newPaymentCallbBack()}>
        <Text style={GlobalStyle.semiboldTxt}>Select New Payment Method</Text>
        <Icon
          name="keyboard-arrow-right"
          type="MaterialIcons"
          style={{color: COLORS.white}}
        />
      </Pressable>
    </View>
  );
};

export default PaymentCard;
