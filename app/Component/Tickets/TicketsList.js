import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import Navigation from '../../Service/Navigation';
import moment from 'moment';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const {width, height} = Dimensions.get('window');

const TicketsList = props => {
  const {live, ticket, data, cancel} = props;

  console.log('TicketsList data', data);

  const checkLiveStatus = item => {
    var dateFrom = moment(item?.eventsData?.startDate).format('L');
    var dateTo = moment(item?.eventsData?.endDate).format('L');
    var dateCheck = moment(new Date()).format('L');
    if (dateCheck >= dateFrom && dateCheck <= dateTo) {
      return (
        <View
          style={{
            backgroundColor: COLORS.green,
            paddingHorizontal: 7,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: moderateScale(10),
              fontFamily: FONTS.Medium,
              lineHeight: 17,
            }}>
            Live
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: 'transparent', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data

          .sort((a, b) =>
            new Date(a.eventsData?.startDate) >
            new Date(b.eventsData?.startDate)
              ? 1
              : new Date(b.eventsData?.startDate) >
                new Date(a.eventsData?.startDate)
              ? -1
              : 0,
          )
          .map((it, key) => {
            // console.log('=>>>it' + key + '>>>', it);
            if (ticket && new Date(it.eventsData?.endDate) < new Date()) {
              return;
            }
            if (ticket && it.bookingStatus === 'cancel') {
              return null;
            }
            return (
              <TouchableWithoutFeedback
                onPress={() =>
                  props.click
                    ? Navigation.navigate('MyEventAbout', {
                        data: it,
                        ticket,
                        eId: it._id,
                      })
                    : // : ticket
                      // ? Navigation.navigate('MyTicketAbout', {
                      //     showLive,
                      //     pending,
                      //     order: false,
                      //   })
                      null
                }
                key={key}>
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    padding: moderateScale(30),
                    flexDirection: 'row',
                    borderColor: COLORS.textInput,
                    width: width,
                  }}>
                  <Image
                    source={{uri: BASE_DOMAIN + it?.eventsData?.image}}
                    style={{
                      width: moderateScale(75),
                      height: moderateScale(75),
                      borderRadius: 5,
                      backgroundColor: COLORS.liteBlack,
                    }}
                  />
                  <View style={{flex: 1, marginLeft: 15}}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONTS.Medium,
                          opacity: 0.7,
                        }}>
                        {moment(it?.eventsData?.startDate).format('ll')}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.theme,
                          fontFamily: FONTS.extraBold,
                          fontSize: moderateScale(18),
                        }}>
                        ${Number(it?.total).toFixed(2)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          width: '90%',
                          lineHeight: 20,
                          color: COLORS.white,
                          fontFamily: FONTS.title,
                          fontSize: moderateScale(16),
                        }}>
                        {it?.eventsData?.name}
                      </Text>
                      <Icon
                        name="keyboard-arrow-right"
                        type="MaterialIcons"
                        style={{color: COLORS.white}}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONTS.Medium,
                          opacity: 0.7,
                          fontSize: moderateScale(12.5),
                        }}>
                        {it?.organizerData?.name}
                      </Text>
                      {it.bookingStatus == 'pending' ? (
                        <View
                          style={{
                            backgroundColor:
                              it.live && live ? COLORS.green : COLORS.orange,
                            paddingHorizontal: 7,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: moderateScale(10),
                              fontFamily: FONTS.Medium,
                              lineHeight: 17,
                            }}>
                            PENDING
                          </Text>
                        </View>
                      ) : (
                        checkLiveStatus(it)
                      )}
                      {it.bookingStatus == 'cancel' && cancel ? (
                        <View
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 7,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: moderateScale(10),
                              fontFamily: FONTS.Medium,
                              lineHeight: 17,
                            }}>
                            CANCELED
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default TicketsList;

const styles = StyleSheet.create({
  dot: {
    width: 13,
    height: 13,
    borderWidth: 3,
    backgroundColor: COLORS.green,
    borderColor: COLORS.textInput,
    borderRadius: 15,
    marginRight: 5,
  },
  txt: {
    color: COLORS.green,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(11),
  },
});
