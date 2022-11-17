import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import GradientButton from '../../Component/Button/GradientButton';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

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

  const setPay = data => {
    let payData = payType;
    const index = payData.findIndex(it => it.status == true);
    if (index >= 0) {
      payData[index].status = false;
    }
    payData[data].status = !payData[data].status;
    setpayType(payData);
    setrefresh(!refresh);
  };

  return (
    <CustomImageBackground>
      <BackCross title="Payment Method" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{width: '85%', alignSelf: 'center'}}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.SemiBold,
              textAlign: 'left',
              marginVertical: 15,
            }}>
            Select New Payment Method
          </Text>

          <View
            style={{
              marginHorizontal: 30,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View style={{width: '100%', alignSelf: 'center'}}>
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
                  <Icon
                    name="cc-stripe"
                    type="FontAwesome"
                    style={styles.icon}
                  />
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
            </View>
          </View>
        </View>
        {payType.filter(it => it.status == true).length > 0 ? (
          <GradientButton
            title="Continue"
            onPress={() =>
              Navigation.navigate('PaymentCard', {
                type: payType.filter(it => it.status == true)[0].name,
              })
            }
            style={{width: '85%', alignSelf: 'center', marginBottom: 20}}
          />
        ) : null}
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
