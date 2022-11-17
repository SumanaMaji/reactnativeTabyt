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

const OrganizerEvents = props => {
  const {live, ticket, showLive, pending, data, cancel} = props;

  const checkLiveStatus = item => {
    // if (item.bookingStatus == "complete") {
    //   return null
    // }
    // console.log('item=>>', item);
    var dateFrom = moment(item?.startDate).format('L');
    var dateTo = moment(item?.endDate).format('L');
    var dateCheck = moment(new Date()).format('L');

    var d1 = dateFrom.split('/');
    var d2 = dateTo.split('/');
    var c = dateCheck.split('/');

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    console.log(check > from && check < to);
    if (dateCheck > dateFrom && dateCheck < dateTo) {
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
            new Date(a.startDate) > new Date(b?.startDate)
              ? 1
              : new Date(b?.startDate) > new Date(a.startDate)
              ? -1
              : 0,
          )
          .map((it, key) => {
            return (
              <TouchableWithoutFeedback
                // onPress={() =>
                //   Navigation.navigate('SingleEvent', {
                //     eventData: it,
                //     eId: it._id,
                //   })
                // }
                key={key}>
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    padding: moderateScale(30),
                    paddingBottom: moderateScale(10),
                    flexDirection: 'row',
                    borderColor: COLORS.textInput,
                    width: width,
                  }}>
                  <Image
                    source={{uri: BASE_DOMAIN + it?.image}}
                    style={{
                      width: moderateScale(65),
                      height: moderateScale(65),
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
                        {moment(it?.startDate).format('ll')}
                      </Text>
                      {/* <Text
                        style={{
                          color: COLORS.theme,
                          fontFamily: FONTS.extraBold,
                          fontSize: moderateScale(18),
                        }}>
                        ${Number(it?.total).toFixed(2)}
                      </Text> */}
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
                          fontSize: moderateScale(13.5),
                        }}>
                        {it?.name}
                      </Text>
                      <Icon
                        name="keyboard-arrow-right"
                        type="MaterialIcons"
                        style={{color: COLORS.white}}
                      />
                    </View>
                    <View
                      style={
                        {
                          // alignItems: 'center',
                        }
                      }>
                      <Text
                        numberOfLines={2}
                        style={{
                          lineHeight: 20,
                          color: COLORS.white,
                          fontFamily: FONTS.Regular,
                          fontSize: moderateScale(12),
                          opacity: 0.8,
                        }}>
                        Venue: Royal DSM
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          lineHeight: 20,
                          color: COLORS.white,
                          fontFamily: FONTS.Regular,
                          fontSize: moderateScale(12),
                          opacity: 0.5,
                        }}>
                        Venue Type: Loream Ipsum
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 2,
                          opacity: 0.8,
                        }}>
                        <Icon
                          name="md-location-sharp"
                          type="Ionicons"
                          style={{
                            color: COLORS.button,
                            fontSize: moderateScale(18),
                          }}
                        />
                        <Text
                          style={{
                            color: COLORS.button,
                            fontFamily: FONTS.Medium,
                            fontSize: moderateScale(13),
                            width: '100%',
                          }}
                          numberOfLines={1}>
                          {it.address}
                          {/* ,
                           {it?.cityData?.name},{' '}
                          {it?.stateData?.name} */}
                        </Text>
                      </View>
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

export default OrganizerEvents;

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
