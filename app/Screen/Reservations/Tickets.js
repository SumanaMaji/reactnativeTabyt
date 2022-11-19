import React, {useEffect, useState} from 'react';
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
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import ReadMore from '@fawazahmed/react-native-read-more';

const LIST = [
  {
    name: 'Lorem Ipsum',
    count: 1,
    price: 10,
    selected: false,
  },
  {
    name: 'Lorem Ipsum 2',
    count: 1,
    price: 15,
    selected: false,
  },
  {
    name: 'Another Ticket',
    count: 1,
    price: 20,
    selected: false,
  },
  {
    name: 'Ticket',
    count: 1,
    price: 50,
    selected: false,
  },
  {
    name: 'Ticket 2',
    count: 1,
    price: 35,
    selected: false,
  },
];

const Tickets = props => {
  const {currentSelection} = props;
  const [ticketsList, setticketsList] = useState(props.data);
  const [refresh, setrefresh] = useState(false);

  console.log('ticketsList=>>', ticketsList);

  useEffect(() => {
    setticketsList(
      props.data.map(item => {
        item.count = 1;
        item.t_price = item.totalprice;
        return item;
      }),
    );
  }, [props.data]);

  const selectedIndex = (item, index) => {
    if (currentSelection !== '' && currentSelection !== 'ticket') {
      SimpleToast.show('Already selected other options!');
      return;
    }
    let data = ticketsList;
    data[index].selected = !data[index].selected;
    setticketsList(state => data);
    setrefresh(!refresh);
    props.selectedCallback(ticketsList.filter(it => it.selected === true));
  };

  const IncreaseCount = (count, index) => {
    if (!ticketsList[index].selected) {
      return;
    }
    if (ticketsList[index].count >= ticketsList[index].avl) {
      return;
    }
    let data = ticketsList;
    console.log('=ticketsList', ticketsList);
    data[index].count = Number(data[index].count) + 1;
    data[index].t_price = data[index].count * data[index].totalprice;

    setticketsList(data);
    setrefresh(!refresh);
    props.selectedCallback(ticketsList.filter(it => it.selected === true));
  };

  const DecreaseCount = (count, index) => {
    if (!ticketsList[index].selected) {
      return;
    }
    if (count > 1) {
      let data = ticketsList;
      data[index].count = Number(data[index].count) - 1;
      data[index].t_price = data[index].count * data[index].totalprice;
      setticketsList(state => data);
      setrefresh(!refresh);
      props.selectedCallback(ticketsList.filter(it => it.selected === true));
    }
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
          No Tickets to purchase for this event
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
        {ticketsList.map((item, key) => {
          // var dateFrom = moment(item.startDate).format('L');
          // var dateTo = moment(item.endDate).format('L');
          // var dateCheck = moment(new Date()).format('L');

          var dateFrom =
            moment(item.startDate).format('L') +
            ' ' +
            moment(item.startTime).format('LTS');
          var dateTo =
            moment(item.endDate).format('L') +
            ' ' +
            moment(item.endTime).format('LTS');
          var dateCheck = moment().format('L') + ' ' + moment().format('LTS');

          if (!item.isAvailable) {
            item.msg = 'Sold out!';
          }
          if (
            dateCheck >= dateFrom &&
            dateCheck <= dateTo &&
            item.isAvailable
          ) {
            item.isAvailable = true;
          } else {
            item.isAvailable = false;
          }
          if (dateCheck > dateFrom && dateCheck < dateTo) {
            item.msg = 'Sale not started yet!';
          }
          if (dateCheck > dateTo && dateCheck > dateFrom) {
            item.msg = 'Expired';
          }
          return (
            <View
              key={key}
              style={{
                paddingVertical: moderateScale(15),
                borderBottomWidth: 0.7,
                borderColor: COLORS.textInput,
                opacity: item.isAvailable ? 1 : 0.5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => selectedIndex(item, key)}
                  disabled={!item.isAvailable}>
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
                      {item.ticketName}
                    </Text>
                    <Text
                      style={[
                        styles.price,
                        {color: item.selected ? COLORS.theme : COLORS.white},
                      ]}>
                      ${item.totalprice}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={[
                        styles.time,
                        {
                          color: item.selected ? COLORS.theme : COLORS.white,
                          fontSize: 14,
                          maxWidth: '80%',
                        },
                      ]}>
                      Sales End - {moment(item?.endDate).format('ll')},{' '}
                      {moment(item?.endTime).format('LT')}
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
                      + Tax
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 6}}>
                    <TouchableOpacity
                      onPress={() => DecreaseCount(item.count, key)}
                      style={[
                        styles.counterBox,
                        {borderTopLeftRadius: 5, borderBottomLeftRadius: 5},
                      ]}>
                      <Text style={styles.counterTxt}>-</Text>
                    </TouchableOpacity>
                    <View
                      style={[
                        styles.counterBox,
                        {
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          width: moderateScale(40),
                        },
                      ]}>
                      <Text style={[styles.counterTxt, {color: COLORS.white}]}>
                        {item.count}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => IncreaseCount(item.count, key)}
                      style={[
                        styles.counterBox,
                        {borderTopRightRadius: 5, borderBottomRightRadius: 5},
                      ]}>
                      <Text style={styles.counterTxt}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <Text>{item.details}</Text> */}
                  <ReadMore
                    numberOfLines={2}
                    style={{...styles.textStyle}}
                    seeMoreStyle={{
                      color: COLORS.theme,
                      fontFamily: FONTS.SemiBold,
                    }}
                    seeLessStyle={{
                      color: COLORS.theme,
                      fontFamily: FONTS.SemiBold,
                    }}>
                    {item.details}
                  </ReadMore>
                  {item?.isAvailable ? null : (
                    <Text style={{...styles.time, color: 'red', marginLeft: 0}}>
                      {item?.msg}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Tickets;

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
    fontSize: moderateScale(12.5),
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
  textStyle: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    marginTop: 10,
  },
});
