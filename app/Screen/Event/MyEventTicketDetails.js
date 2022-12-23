import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import StarRating from 'react-native-star-rating';
import EventDateTime from '../../Component/Event/EventDateTime';
import EventName from '../../Component/Event/EventName';
import EventOrganizedBy from '../../Component/Event/EventOrganizedBy';
import Location from '../../Component/Event/Location';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const MIN_HEIGHT = moderateScale(120);
const MAX_HEIGHT = moderateScale(220);

const year = new Date().getFullYear();
const MyEventTicketDetails = props => {
  const route = useRoute();

  const eventData = route.params.eventData;
  const eId = route.params.eId;
  const bId = route.params.bId;

  console.log('eventData=>>', eventData);

  const [showModal, setShowmodal] = useState(false);
  const [ImgModal, setImgmodal] = useState(false);
  const [isFetching, setisFetching] = useState(true);
  const [eventDetails, seteventDetails] = useState(eventData);
  const [avgRating, setavgRating] = useState('0');

  const offset = useRef(new Animated.Value(0)).current;
  const ImageHeight = offset.interpolate({
    inputRange: [0, MAX_HEIGHT],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const renderEventDateTime = date => {
    if (year === new Date(date).getFullYear()) {
      return moment(date).format('MMMM Do');
    } else {
      return moment(date).format('LL');
    }
  };

  useEffect(() => {
    getSingleEventData();
    getAllReview();
  }, []);

  const getSingleEventData = async () => {
    const result = await Event.getSingleEvent(eId);
    console.log('getSingleEventData', result);
    if (result && result.status) {
      console.log('result.data', result.data);
      seteventDetails(result.data);
      setisFetching(false);
    }
  };
  const getAllReview = async () => {
    const result = await Event.getReview(eId);
    console.log('all review', JSON.stringify(result));
    if (result && result.status) {
      setavgRating(
        result?.data.reduce((accumulator, object) => {
          return accumulator + object.rating;
        }, 0),
      );
    }
  };

  const renderStatus = () => {
    var dateFrom = moment(eventDetails.startDate).format('L');
    var dateTo = moment(eventDetails.endDate).format('L');
    var dateCheck = moment(new Date()).format('L');
    if (dateCheck >= dateFrom && dateCheck <= dateTo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3,
          }}>
          <View
            style={{
              width: 13,
              height: 13,
              borderWidth: 3,
              backgroundColor: COLORS.green,
              borderColor: COLORS.textInput,
              borderRadius: 15,
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: COLORS.green,
              fontFamily: FONTS.Medium,
              fontSize: moderateScale(11),
            }}>
            Live
          </Text>
        </View>
      );
    }
  };

  const renderTitle = () => {
    console.log('eventData?.bookingType=>>', eventData?.bookingType);
    let title = 'Ticket Purchase';
    if (eventData?.bookingType == 'ticket') {
      title = 'Ticket Purchase';
    } else if (eventData?.bookingType == 'reservation') {
      title = 'Table Purchase';
    }
    return title;
  };

  const renderBookingTitle = () => {
    let title = 'Ticket Purchase';
    if (eventData?.bookingType == 'ticket') {
      title = eventData?.tickets[0]?.ticketName;
    } else if (eventData?.bookingType == 'reservation') {
      title = eventData?.tickets[0]?.TableType;
    }
    return title;
  };

  return (
    <CustomImageBackground>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {/* <View>
            <TouchableOpacity
              onPress={() => Navigation.back()}
              style={{position: 'absolute', top: 30, left: 10, zIndex: 99}}>
              <Icon
                name="keyboard-arrow-left"
                type="MaterialIcons"
                style={{color: COLORS.white}}
              />
            </TouchableOpacity>
          </View> */}
          <BackCross title={renderTitle()} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 0}}>
            <Text
              // numberOfLines={2}
              style={{
                color: COLORS.white,
                fontFamily: FONTS.Medium,
                fontSize: moderateScale(15.5),
                lineHeight: 20,
                marginTop: 10,
                textAlign: 'center',
              }}>
              {renderBookingTitle()}
            </Text>
            <View
              style={{
                marginTop: 20,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <QRCode
                value={bId}
                size={200}
                color={'white'}
                backgroundColor={'transparent'}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 2,
                borderWidth: 1,
                borderColor: COLORS.cream,
                alignSelf: 'center',
                borderRadius: 5,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: COLORS.cream,
                  fontFamily: FONTS.Medium,
                  fontSize: 12,
                }}>
                {renderTitle()}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: moderateScale(30),
                paddingTop: moderateScale(10),
                paddingBottom: moderateScale(100),
              }}>
              <EventName data={eventDetails} />
              <EventOrganizedBy
                organizerName={eventDetails?.organizerData?.name}
                oId={eventDetails?.organizerId}
                avgRating={avgRating}
              />
              <Location
                address={eventDetails?.address}
                cityData={eventDetails?.cityData}
                stateData={eventDetails?.stateData}
              />
              <EventDateTime
                startDate={eventDetails?.startDate}
                endDate={eventDetails?.endDate}
                startTime={eventDetails?.startTime}
                endTime={eventDetails?.endTime}
                timeZone={eventData?.timeZone}
              />
              {eventDetails?.specialGuestsName.length > 0 ? (
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(12),
                  }}>
                  Special Guests:{' '}
                  <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                    {eventDetails?.specialGuestsName.map((it, key) => {
                      return eventDetails?.specialGuestsName.length === key + 1
                        ? it
                        : it + ', ';
                    })}
                  </Text>
                </Text>
              ) : null}
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Regular,
                  fontSize: moderateScale(12),
                }}>
                Attending:{' '}
                <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                  {eventDetails?.attend}
                </Text>
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Regular,
                  fontSize: moderateScale(12),
                  marginTop: 5,
                }}>
                {eventDetails?.description}
              </Text>

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  borderTopWidth: 0.4,
                  borderBottomWidth: 0.4,
                  paddingVertical: 7,
                  borderColor: COLORS.textInput,
                }}>
                <Icon
                  name="music"
                  type="FontAwesome"
                  style={{color: COLORS.theme}}
                />
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{color: COLORS.theme, fontSize: moderateScale(12)}}>
                    Music Type
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: moderateScale(12),
                    }}>
                    {eventDetails?.musicType.map((it, key) => {
                      return it.name + ', ';
                    })}
                  </Text>
                </View>
              </View> */}
              <View
                style={{
                  borderTopWidth: 0.4,
                  borderBottomWidth: 0.4,
                  paddingVertical: 7,
                  borderColor: COLORS.textInput,
                  marginTop: 10,
                }}>
                {eventDetails?.djName.length > 0 ? (
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    Music By:{' '}
                    <Text
                      style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                      {eventDetails?.djName.map((it, key) => {
                        return eventDetails?.djName.length === key + 1
                          ? it
                          : it + ', ';
                      })}
                    </Text>
                  </Text>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: 10,
                    // borderTopWidth: 0.4,
                    // borderBottomWidth: 0.4,
                    paddingVertical: 7,
                    // borderColor: COLORS.textInput,
                  }}>
                  <Icon
                    name="music"
                    type="FontAwesome"
                    style={{color: COLORS.theme}}
                  />
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        color: COLORS.theme,
                        fontSize: moderateScale(12),
                      }}>
                      Music Type
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: moderateScale(12),
                      }}>
                      {eventDetails?.musicType.map((it, key) => {
                        return eventDetails?.musicType.length === key + 1
                          ? it.name
                          : it.name + ', ';
                      })}
                    </Text>
                  </View>
                </View>
              </View>
              {!eventDetails?.mensDessCode &&
              !eventDetails?.ladiesDessCode &&
              !eventDetails?.cantwear ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: 10,
                  }}>
                  <Icon
                    name="shirt"
                    type="Ionicons"
                    style={{color: COLORS.theme, fontSize: moderateScale(25)}}
                  />
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        color: COLORS.theme,
                        fontSize: moderateScale(12),
                      }}>
                      Dress Codes
                    </Text>
                    {eventDetails?.mensDessCode ? (
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: moderateScale(11.5),
                        }}>
                        Men: {eventDetails?.mensDessCode}
                      </Text>
                    ) : null}
                    {eventDetails?.ladiesDessCode ? (
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: moderateScale(11.5),
                        }}>
                        Women: {eventDetails?.ladiesDessCode}
                      </Text>
                    ) : null}
                    {eventDetails?.cantwear ? (
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: moderateScale(11.5),
                        }}>
                        Can't Wear: {eventDetails?.cantwear}
                      </Text>
                    ) : null}
                  </View>
                </View>
              )}
              {/* <View style={{marginTop: 15}}>
                <Text style={{color: COLORS.white, fontFamily: FONTS.SemiBold}}>
                  05 Reviews
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating="4.5"
                    starSize={12}
                    starStyle={{color: COLORS.orange}}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.SemiBold,
                      fontSize: moderateScale(11),
                      marginLeft: 5,
                    }}>
                    4.5
                  </Text>
                </View>
              </View> */}
              {/* {REVIEW.map((it, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: 15,
                    borderBottomWidth: 0.7,
                    paddingBottom: 10,
                    borderColor: COLORS.textInput,
                  }}>
                  <Pressable onPress={() => Navigation.navigate('ViewProfile')}>
                    <Image
                      style={{
                        width: moderateScale(35),
                        height: moderateScale(35),
                        borderRadius: moderateScale(18),
                      }}
                      source={{uri: it.image}}
                    />
                  </Pressable>
                  <View style={{marginLeft: 10, width: '80%'}}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Regular,
                        lineHeight: 20,
                      }}>
                      {it.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Regular,
                        opacity: 0.8,
                        fontSize: moderateScale(8),
                      }}>
                      2 days ago
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={it.rating}
                        starSize={10}
                        starStyle={{color: COLORS.orange}}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: FONTS.Medium,
                          fontSize: moderateScale(10),
                          marginLeft: 5,
                        }}>
                        {it.rating}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Regular,
                        fontSize: moderateScale(12),
                        marginTop: 5,
                        width: '100%',
                      }}>
                      {it.desc}
                    </Text>
                  </View>
                </View>
              ))} */}
              {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>View All Review</Text>
              </TouchableOpacity> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 15,
                  borderBottomWidth: 0.7,
                  borderColor: COLORS.textInput,
                  borderTopWidth: 0.7,
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Icon
                  name="headphones"
                  type="FontAwesome5"
                  style={{
                    color: COLORS.white,
                    fontSize: moderateScale(25),
                    opacity: 0.8,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.SemiBold,
                    marginLeft: 20,
                    fontSize: moderateScale(13),
                  }}>
                  GET SUPPORT
                </Text>
              </View> */}
            </View>
          </ScrollView>
          {/* <View
            style={{
              position: 'absolute',
              bottom: 20,
              alignSelf: 'center',
              width: '85%',
            }}>
            <GradientButton
              title="Make Reservation"
              onPress={() =>
                Navigation.navigate('MakeReservation', {
                  eventData: eventDetails,
                  eId,
                })
              }
            />
          </View> */}
        </>
      )}
      {/* <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowmodal(false)}>
        <PurchaseModal close={() => setShowmodal(false)} />
      </Modal>  */}
      <Modal
        visible={ImgModal}
        transparent={true}
        onRequestClose={() => setImgmodal(false)}>
        <View style={{flex: 1, backgroundColor: COLORS.theme}}>
          <Image
            style={{flex: 1, resizeMode: 'contain'}}
            source={{uri: BASE_DOMAIN + eventDetails.image}}
          />
          <TouchableOpacity
            onPress={() => setImgmodal(false)}
            style={{position: 'absolute', top: 20, left: 15, zIndex: 99}}>
            <Icon
              name="keyboard-arrow-left"
              type="MaterialIcons"
              style={{color: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </CustomImageBackground>
  );
};

export default MyEventTicketDetails;

const styles = StyleSheet.create({
  button: {
    height: verticalScale(38),
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.theme,
    marginTop: verticalScale(15),
  },
  buttonText: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.Medium,
    textAlign: 'center',
    // margin: 10,
    color: COLORS.theme,
  },
});
