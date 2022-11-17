import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import GlobalStyles from '../../Component/GlobalStyle';
import {Picker} from '@react-native-picker/picker';
import GradientButton from '../../Component/Button/GradientButton';
import Navigation from '../../Service/Navigation';
import SimpleToast from 'react-native-simple-toast';
import Event from '../../Service/Event';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

const PaymentCard = props => {
  const type = props.route.params.type;

  // const [cardNumber, setcardNumber] = React.useState('');
  const [cardHolderName, setcardHolderName] = React.useState('');
  // const [year, setyear] = React.useState('');
  // const [month, setmonth] = React.useState('');
  // const [cvc, setcvc] = React.useState('');
  const [creditCardData, setcreditCardData] = React.useState({});
  const [disabled, setdisabled] = React.useState(false);

  const addPayMethod = async () => {
    // if (!cardNumber || !cardHolderName || !year || !month || !cvc) {
    //   SimpleToast.show('Please fill out all fields!');
    //   return;
    // }
    // if (cardNumber.length != 16) {
    //   SimpleToast.show('Invalid card number!');
    //   return;
    // }
    // if (cvc.length != 3) {
    //   SimpleToast.show('Invalid CVC number!');
    //   return;
    // }
    if (!creditCardData?.valid) {
      SimpleToast.show('Invalid Card Details!');
      return false;
    }
    if (!cardHolderName) {
      SimpleToast.show('Enter Card Holder Name!');
      return;
    }
    setdisabled(true);
    const cardNumber = creditCardData?.values?.number.replace(/\s/g, '');
    const month = creditCardData?.values?.expiry.split('/')[0];
    const year = creditCardData?.values?.expiry.split('/')[1];
    const cvc = creditCardData?.values?.cvc;
    let data = {
      cardNumber: cardNumber,
      CardHolderName: cardHolderName,
      ExpiryMonth: month,
      ExpireYear: year,
      cvc: cvc,
      type,
    };
    console.log('data=>', data);
    const result = await Event.adPaymentMethod(data);
    console.log('payment =>>>>', result);
    if (result && result.status) {
      SimpleToast.show('Payment method added successfully!');
      Navigation.navigate('PaymentInfo');
    } else {
      SimpleToast.show('Something wrong, try after sometimes');
    }
    setdisabled(false);
  };

  const _onChange = data => {
    console.log('data=>>', data);
    setcreditCardData(data);
  };

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Payment Method"
        icon={false}
        back={() => Navigation.back()}
      />

      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.SemiBold,
            textAlign: 'center',
            marginVertical: 15,
          }}>
          Secure Credit Card Payment
        </Text>

        <CreditCardInput
          onChange={_onChange}
          inputStyle={{color: COLORS.white}}
          inputContainerStyle={{
            borderBottomColor: '#ffffff',
            borderBottomWidth: 1,
          }}
          labelStyle={{color: COLORS.white, fontFamily: FONTS.Medium}}
        />

        {/* <TextInput
          placeholder="Card Number"
          placeholderTextColor={COLORS.white}
          style={GlobalStyles.textInput}
          value={cardNumber}
          onChangeText={setcardNumber}
          maxLength={16}
          keyboardType="number-pad"
        /> */}
        <TextInput
          placeholder="Card Holder Name"
          placeholderTextColor={COLORS.white}
          style={{
            ...GlobalStyles.textInput,
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
          value={cardHolderName}
          onChangeText={setcardHolderName}
        />
        {/* <View style={GlobalStyles.textInputView}>
          <Picker
            style={styles.picker}
            dropdownIconColor={COLORS.white}
            selectedValue={month}
            onValueChange={(itemValue, itemIndex) => setmonth(itemValue)}>
            <Picker.Item
              style={styles.pickerItem}
              label="Expiry Month"
              value=""
            />
            <Picker.Item style={styles.pickerItem} label="01" value="01" />
            <Picker.Item style={styles.pickerItem} label="02" value="02" />
            <Picker.Item style={styles.pickerItem} label="03" value="03" />
            <Picker.Item style={styles.pickerItem} label="04" value="04" />
            <Picker.Item style={styles.pickerItem} label="05" value="05" />
            <Picker.Item style={styles.pickerItem} label="06" value="06" />
            <Picker.Item style={styles.pickerItem} label="07" value="07" />
            <Picker.Item style={styles.pickerItem} label="08" value="08" />
            <Picker.Item style={styles.pickerItem} label="09" value="09" />
            <Picker.Item style={styles.pickerItem} label="10" value="10" />
            <Picker.Item style={styles.pickerItem} label="11" value="11" />
            <Picker.Item style={styles.pickerItem} label="12" value="12" />
          </Picker>
        </View> */}

        {/* <View style={GlobalStyles.textInputView}>
          <Picker
            style={styles.picker}
            dropdownIconColor={COLORS.white}
            selectedValue={year}
            onValueChange={(itemValue, itemIndex) => setyear(itemValue)}>
            <Picker.Item
              style={styles.pickerItem}
              label="Expiry Year"
              value=""
            />
            <Picker.Item style={styles.pickerItem} label="22" value="22" />
            <Picker.Item style={styles.pickerItem} label="23" value="23" />
            <Picker.Item style={styles.pickerItem} label="24" value="24" />
            <Picker.Item style={styles.pickerItem} label="25" value="25" />
            <Picker.Item style={styles.pickerItem} label="26" value="26" />
            <Picker.Item style={styles.pickerItem} label="27" value="27" />
            <Picker.Item style={styles.pickerItem} label="28" value="28" />
            <Picker.Item style={styles.pickerItem} label="29" value="29" />
            <Picker.Item style={styles.pickerItem} label="30" value="30" />
            <Picker.Item style={styles.pickerItem} label="31" value="31" />
            <Picker.Item style={styles.pickerItem} label="32" value="32" />
            <Picker.Item style={styles.pickerItem} label="33" value="33" />
            <Picker.Item style={styles.pickerItem} label="34" value="34" />
            <Picker.Item style={styles.pickerItem} label="35" value="35" />
          </Picker>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <TextInput
            placeholder="CVC"
            placeholderTextColor={COLORS.white}
            style={[GlobalStyles.textInput, {width: '85%'}]}
            value={cvc}
            onChangeText={setcvc}
            maxLength={3}
            keyboardType="number-pad"
          />
          <Icon
            name="info-outline"
            type="MaterialIcons"
            style={{color: COLORS.white, opacity: 0.7}}
          />
        </View> */}

        <GradientButton
          style={{marginTop: 10, width: '90%', alignSelf: 'center'}}
          title="Add Payment Method"
          onPress={addPayMethod}
          disabled={disabled}
          // onPress={() => Navigation.navigate('Checkout2')}
        />
      </View>
    </CustomImageBackground>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  picker: {
    color: COLORS.white,
    width: '100%',
  },
  pickerItem: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(13),
  },
});
