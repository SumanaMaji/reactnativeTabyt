import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import GlobalStyles from '../../Component/GlobalStyle';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';

const USERLIST = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
    name: 'Robert',
    edit: true,
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
    name: 'Robert Clay',
    edit: false,
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
    name: 'John Alan',
    edit: false,
  },
];

const CheckoutReservation = props => {
  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Make Reservation"
        icon={false}
        back={() => Navigation.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 25}}>
        {USERLIST.map((item, key) => (
          <View
            key={key}
            style={{
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(30),
              paddingVertical: moderateScale(15),
              borderBottomWidth: 0.7,
              borderColor: COLORS.textInput,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: moderateScale(30),
                    height: moderateScale(30),
                    borderRadius: moderateScale(20),
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(12),
                  }}>
                  {item.name}
                </Text>
              </View>
              {!item.edit ? (
                <Text style={[styles.title, {color: COLORS.theme}]}>$10</Text>
              ) : null}
            </View>
            <View style={styles.listView}>
              <Text style={[styles.title, {color: COLORS.theme}]}>
                {item.edit ? 'Booked Table' : 'Activity'}
              </Text>
            </View>

            <View style={styles.listView}>
              <Text style={styles.title}>
                Age {item.edit ? '40' : null} | Gender{' '}
                {item.edit ? 'Male' : null}
              </Text>
            </View>

            <View style={styles.listView}>
              <Text style={[styles.title, {fontFamily: FONTS.Medium}]}>
                Favorite Drink{item.edit ? ': Cold Drinks ' : null}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </CustomImageBackground>
  );
};

export default CheckoutReservation;

const styles = StyleSheet.create({
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
    width: '72%',
  },
  title: {
    fontFamily: FONTS.Regular,
    color: COLORS.white,
    fontSize: moderateScale(12),
    opacity: 0.9,
  },
});
