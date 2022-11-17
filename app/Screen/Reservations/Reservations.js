import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Navigation from '../../Service/Navigation';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import SimpleToast from 'react-native-simple-toast';

const LIST = [
  {
    name: 'Vip Table',
    count: 1,
    price: 250,
    selected: false,
  },
  {
    name: 'Selection New',
    count: 1,
    price: 350,
    selected: false,
  },
];

const Reservations = props => {
  const {currentSelection} = props;
  const ticketsData = props.data;
  console.log('ticketsData?.tableList', ticketsData);
  const [ticketsList, setticketsList] = useState(ticketsData?.tableList);
  const [refresh, setrefresh] = useState(false);

  const selectedIndex = (item, index) => {
    if (currentSelection !== '' && currentSelection !== 'reservation') {
      SimpleToast.show('Already selected other options!');
      return;
    }
    let data = ticketsList;
    const selectIndex = data.findIndex(i => i.selected === true);
    if (selectIndex >= 0) {
      data[selectIndex].selected = false;
    }

    if (index != selectIndex) {
      data[index].selected = !data[index].selected;
    }
    setticketsList(state => data);
    setrefresh(!refresh);
    props.selectedCallback(ticketsList.filter(it => it.selected === true));
  };

  if (props.data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30,
        }}>
        <Text style={{...styles.name, textAlign: 'center'}}>
          No Tables or Packages to reserve for this event
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: moderateScale(30),
        paddingVertical: moderateScale(20),
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ticketsList.map((item, key) => (
          <View
            key={key}
            style={{
              paddingVertical: moderateScale(15),
              borderBottomWidth: 0.7,
              borderColor: COLORS.textInput,
              opacity: !item?.isAvailable ? 0.5 : 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => selectedIndex(item, key)}
                disabled={!item?.isAvailable}>
                <Icon
                  name={item.selected ? 'checkmark-circle' : 'circle'}
                  type={item.selected ? 'Ionicons' : 'Entypo'}
                  style={{
                    color: item.selected ? COLORS.theme : COLORS.white,
                    fontSize: moderateScale(25),
                  }}
                />
              </TouchableOpacity>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.name,
                      {color: item.selected ? COLORS.theme : COLORS.white},
                    ]}>
                    {item.TableType}
                  </Text>

                  <Text
                    style={[
                      styles.price,
                      {color: item.selected ? COLORS.theme : COLORS.white},
                    ]}>
                    ${item.price}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.time,
                      {color: item.selected ? COLORS.theme : COLORS.white},
                    ]}>
                    Admission For: {item?.capacity}
                  </Text>
                  <Text
                    style={[
                      styles.time,
                      {
                        opacity: 1,
                        color: item.selected ? COLORS.theme : COLORS.white,
                        fontFamily: FONTS.LightItalic,
                      },
                    ]}>
                    + Tax and gratuity
                  </Text>
                </View>
                {item?.isAvailable ? null : (
                  <Text style={{...styles.time, color: 'red'}}>Sold out!</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '30%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    marginLeft: 10,
    fontSize: moderateScale(16),
  },
  price: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(18),
  },
  time: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    marginLeft: 10,
    fontSize: moderateScale(11),
    opacity: 0.7,
  },
  counterBox: {
    width: moderateScale(37),
    height: verticalScale(30),
    borderWidth: 1,
    borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTxt: {color: COLORS.theme, fontFamily: FONTS.SemiBold},
});
