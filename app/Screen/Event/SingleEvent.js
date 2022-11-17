import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import StarRating from 'react-native-star-rating';
import GradientButton from '../../Component/Button/GradientButton';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import PurchaseModal from '../../Component/Modal/PurchaseModal';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const MIN_HEIGHT = moderateScale(120);
const MAX_HEIGHT = moderateScale(220);

const year = new Date().getFullYear();

const SingleEvent = props => {
  const route = useRoute();

  const eventData = route.params.eventData;
  const eId = route.params.eId;

  console.log('eventData=>>', eventData);
  const [showModal, setShowmodal] = useState(false);
  const [ImgModal, setImgmodal] = useState(false);
  const [isFetching, setisFetching] = useState(true);
  const [eventDetails, seteventDetails] = useState(eventData);
  const [allReview, setallReview] = useState([]);
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
    if (result && result.status) {
      console.log('result.data', JSON.stringify(result.data));
      seteventDetails(result.data);
      setisFetching(false);
    }
  };
  const getAllReview = async () => {
    const result = await Event.getReview(eId);
    console.log('all review', JSON.stringify(result));
    if (result && result.status) {
      setallReview(result?.data);
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

    var d1 = dateFrom.split('/');
    var d2 = dateTo.split('/');
    var c = dateCheck.split('/');

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    console.log(check > from && check < to);
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

  return (
    <CustomImageBackground>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <View>
            <TouchableWithoutFeedback onPress={() => setImgmodal(true)}>
              <Animated.Image
                source={{uri: BASE_DOMAIN + eventDetails.image}}
                style={{
                  width: '100%',
                  height: ImageHeight,
                  // backgroundColor: COLORS.textInput,
                  resizeMode: 'contain',
                }}
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity
              onPress={() => Navigation.back()}
              style={{position: 'absolute', top: 30, left: 10, zIndex: 99}}>
              <Icon
                name="keyboard-arrow-left"
                type="MaterialIcons"
                style={{color: COLORS.white}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            style={{marginTop: 15}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}>
            <View
              style={{
                marginHorizontal: moderateScale(30),
                paddingTop: moderateScale(10),
                paddingBottom: moderateScale(100),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable
                  onPress={() => Navigation.navigate('LocationView')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '75%',
                  }}>
                  <Icon
                    name="md-location-sharp"
                    type="Ionicons"
                    style={{color: COLORS.button, fontSize: moderateScale(18)}}
                  />
                  <Text
                    style={{
                      color: COLORS.button,
                      fontFamily: FONTS.Medium,
                      fontSize: moderateScale(13),
                      width: '100%',
                    }}
                    numberOfLines={1}>
                    {eventDetails.address}, {eventDetails?.cityData?.name},{' '}
                    {eventDetails?.stateData?.name}
                  </Text>
                </Pressable>

                {renderStatus()}
              </View>
              <Text
                // numberOfLines={2}
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Medium,
                  fontSize: moderateScale(15.5),
                  lineHeight: 20,
                  marginTop: 10,
                }}>
                {eventDetails.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 3,
                  marginBottom: 2,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(11),
                    opacity: 0.8,
                  }}>
                  Organized by:{' '}
                  <Text
                    onPress={() =>
                      Navigation.navigate('ViewOrganizer', {
                        oId: eventData?.organizerId,
                      })
                    }
                    style={{
                      textDecorationLine: 'underline',
                      color: COLORS.theme,
                    }}>
                    {eventData?.organizerData?.name}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={avgRating}
                    starSize={10}
                    starStyle={{color: COLORS.orange}}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(10),
                      marginLeft: 5,
                    }}>
                    {avgRating}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={{color: COLORS.white, fontSize: moderateScale(17)}}
                  name="calendar"
                  type="Ionicons"
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Medium,
                    fontSize: moderateScale(12.5),
                    marginLeft: 7,
                  }}>
                  {renderEventDateTime(eventDetails?.startDate)} to{' '}
                  {renderEventDateTime(eventDetails?.endDate)}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={{color: COLORS.white, fontSize: moderateScale(17)}}
                  name="alarm"
                  type="Ionicons"
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Medium,
                    fontSize: moderateScale(12.5),
                    marginLeft: 7,
                  }}>
                  {moment(eventDetails?.startTime).format('LT')} -{' '}
                  {moment(eventDetails?.endTime).format('LT')}
                </Text>
              </View>
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
              {allReview.length > 0 ? (
                <View style={{marginTop: 15}}>
                  <Text
                    style={{color: COLORS.white, fontFamily: FONTS.SemiBold}}>
                    {allReview.length} Reviews
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={avgRating}
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
                      {avgRating}
                    </Text>
                  </View>
                </View>
              ) : null}
              {allReview.map((it, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: 15,
                    borderBottomWidth: allReview.length > 5 ? 0.7 : 0,
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
                      source={{uri: BASE_DOMAIN + it?.userData?.image}}
                    />
                  </Pressable>
                  <View style={{marginLeft: 10, width: '80%'}}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Regular,
                        lineHeight: 20,
                      }}>
                      {it?.userData?.firstname} {it?.userData?.lastname}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.Regular,
                        opacity: 0.8,
                        fontSize: moderateScale(8),
                      }}>
                      {moment(it?.createOn).startOf('day').fromNow()}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <StarRating
                        disabled={true}
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
                      {it.reviews}
                    </Text>
                  </View>
                </View>
              ))}
              {allReview.length > 5 ? (
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>View All Review</Text>
                </TouchableOpacity>
              ) : null}

              <View
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
              </View>
            </View>
          </ScrollView>
          <View
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
          </View>
        </>
      )}
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowmodal(false)}>
        <PurchaseModal close={() => setShowmodal(false)} />
      </Modal>
      <Modal
        visible={ImgModal}
        transparent={true}
        onRequestClose={() => setImgmodal(false)}>
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          <FastImage
            style={{flex: 1, backgroundColor: 'gray'}}
            source={{
              uri: BASE_DOMAIN + eventData.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TouchableOpacity
            onPress={() => setImgmodal(false)}
            style={{position: 'absolute', top: 20, left: 15, zIndex: 99}}>
            <Icon
              name="keyboard-arrow-left"
              type="MaterialIcons"
              style={{color: COLORS.theme}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </CustomImageBackground>
  );
};

export default SingleEvent;

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
