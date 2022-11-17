import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import Navigation from '../../Service/Navigation';
import ImageWithTitle from '../../Component/Header/ImageWithTitle';
import GradientButton from '../../Component/Button/GradientButton';
import SimpleToast from 'react-native-simple-toast';
import Auth from '../../Service/Auth';
import TransparentButton from '../../Component/Button/TransparentButton';
import GlobalStyles from '../../Component/GlobalStyle';

const PaymentType = props => {
  const [payType, setpayType] = useState([
    {
      name: 'Paypal',
      status: false,
      id: '',
    },
    {
      name: 'Stripe',
      status: false,
      id: '',
    },
  ]);
  const [disable, setdisable] = React.useState(false);
  const [refresh, setrefresh] = React.useState(false);

  useEffect(() => {}, [payType]);

  const updateOwnerInfo = async () => {
    if (payType.filter(it => it.status == true).length == 0) {
      SimpleToast.show('Select one payment information!');
      return false;
    }

    setdisable(true);

    let result = await Auth.updateprofile({paymentType: payType});
    if (result && result.status) {
      SimpleToast.show('Payment Information updated successfully!');
      setdisable(false);
      Navigation.navigate('OwnerInfo');
    } else {
      setdisable(false);
      SimpleToast.show('Something wrong, try after sometimes!');
    }
  };

  const setPay = data => {
    payType[data].status = !payType[data].status;
    setpayType(payType);
    setrefresh(!refresh);
  };

  const onChnageInput = (val, index) => {
    payType[index].id = val;
    setpayType(payType);
    setrefresh(!refresh);
  };

  return (
    <CustomImageBackground>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => Navigation.back()}
          style={{marginTop: moderateScale(45), marginLeft: moderateScale(15)}}>
          <Icon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            style={{color: COLORS.white, fontSize: moderateScale(30)}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 30,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <ImageWithTitle title="Payment Information" />
          <View style={{width: '85%', alignSelf: 'center'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={[
                  styles.box,
                  {
                    borderWidth:
                      payType.filter(
                        it => it.name == 'Stripe' && it.status == true,
                      ).length > 0
                        ? 2
                        : 0.2,
                  },
                ]}
                onPress={() => setPay(1)}>
                <Icon name="cc-stripe" type="FontAwesome" style={styles.icon} />
                <Text style={styles.txt}>Stripe</Text>
              </Pressable>
              <Pressable
                onPress={() => setPay(0)}
                style={[
                  styles.box,
                  {
                    borderWidth:
                      payType.filter(
                        it => it.name == 'Paypal' && it.status == true,
                      ).length > 0
                        ? 2
                        : 0.2,
                  },
                ]}>
                <Icon name="paypal" type="FontAwesome" style={styles.icon} />
                <Text style={styles.txt}>Paypal</Text>
              </Pressable>
            </View>
            <View style={{marginTop: 20}}>
              {payType.filter(it => it.name == 'Stripe' && it.status == true)
                .length > 0 ? (
                <TextInput
                  placeholder="Stripe Id"
                  placeholderTextColor={COLORS.white}
                  style={GlobalStyles.textInput}
                  value={payType[0].id}
                  onChangeText={val => onChnageInput(val, 0)}
                />
              ) : null}
              {payType.filter(it => it.name == 'Paypal' && it.status == true)
                .length > 0 ? (
                <TextInput
                  placeholder="Paypal Id"
                  placeholderTextColor={COLORS.white}
                  style={GlobalStyles.textInput}
                  value={payType[1].id}
                  onChangeText={val => onChnageInput(val, 1)}
                />
              ) : null}
            </View>
          </View>
          <View>
            <GradientButton
              title="Continue"
              onPress={updateOwnerInfo}
              disabled={disable}
            />

            <TransparentButton
              title="Skip for now"
              onPress={() => Navigation.navigate('OwnerInfo')}
            />
          </View>
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default PaymentType;

const styles = StyleSheet.create({
  box: {
    width: '48%',
    height: verticalScale(100),
    borderWidth: 0.2,
    borderColor: COLORS.theme,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {color: COLORS.white, fontFamily: FONTS.Medium},
  icon: {
    fontSize: moderateScale(34),
    color: COLORS.theme,
    opacity: 0.8,
    marginBottom: 3,
  },
});
