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
import Helper from '../../Service/Helper';

const Tickets = props => {
  const {currentSelection, eventData} = props;
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
    if (
      ticketsList[index].count >=
      ticketsList[index].avl - ticketsList[index].purchased
    ) {
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
          let checkStatus = Helper.ticketDateTimeStatus(
            item.startDate,
            item.startTime,
            item.endDate,
            item.endTime,
            eventData?.timeZone,
          );
          console.log('checkStatus=>>', checkStatus);
          if (!item.isAvailable) {
            item.msg = 'Sold out!';
          }
          if (checkStatus == 'live' && item.isAvailable) {
            item.isAvailable = true;
          }
          if (checkStatus == 'not_started' && item.isAvailable) {
            item.msg = 'Sale not started yet!';
            item.isAvailable = false;
          }
          if (checkStatus == 'expired') {
            item.msg = 'Expired';
            item.isAvailable = false;
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
                      Sales End -{' '}
                      {Helper.renderDate(item?.endDate, eventData?.timeZone)},{' '}
                      {Helper.renderTime(item?.endTime, eventData?.timeZone)}
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
