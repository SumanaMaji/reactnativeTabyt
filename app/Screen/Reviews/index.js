import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';
import NormalButton from '../../Component/Button/NormalButton';
import GlobalStyles from '../../Component/GlobalStyle';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const Reviews = props => {
  const {eId, eventData} = props.route.params;
  console.log('eventData=>>', eventData);
  const {userData} = useSelector(state => state.User);
  const [allReview, setallReview] = useState([]);
  const [review, setreview] = useState('');
  const [rating, setrating] = useState('');
  const [avgRating, setavgRating] = useState('0');
  const [alreadyReviewed, setalreadyReviewed] = useState(false);
  const [reviewId, setreviewId] = useState('');

  useEffect(() => {
    getAllReview();
  }, [eId]);

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
      const ownReview = result.data.filter(
        i => i?.userData?._id == userData?._id,
      );
      console.log('ownReview', ownReview);
      if (ownReview.length > 0) {
        setalreadyReviewed(true);
        setreview(ownReview[0]?.reviews);
        setrating(ownReview[0]?.rating);
        setreviewId(ownReview[0]?._id);
      }
    }
  };

  const submitReview = async () => {
    if (!review) {
      SimpleToast.show('Enter review!');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      SimpleToast.show('Rating must be between 1 to 5!');
      return;
    }
    let result;
    if (alreadyReviewed) {
      result = await Event.updateReview(reviewId, {
        reviews: review,
        rating,
      });
    } else {
      result = await Event.addReview({
        eventId: eId,
        reviews: review,
        rating,
        organizerId: eventData?.organizerId,
      });
    }
    console.log('add reiew', result);
    if (result && result.status) {
      getAllReview();
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="Reviews" icon={false} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        <View
          style={{
            marginHorizontal: moderateScale(30),
            paddingTop: moderateScale(10),
            paddingBottom: moderateScale(100),
          }}>
          {allReview.length > 0 ? (
            <View style={{marginTop: 10}}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.SemiBold}}>
                {allReview.length} Reviews
              </Text>
              <View style={{flexDirection: 'row'}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={avgRating}
                  starSize={12}
                  starStyle={{color: COLORS.orange}}
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
                borderBottomWidth: 0.7,
                paddingBottom: 10,
                borderColor: COLORS.textInput,
              }}>
              <Image
                style={{
                  width: moderateScale(35),
                  height: moderateScale(35),
                  borderRadius: moderateScale(18),
                }}
                source={{uri: BASE_DOMAIN + it?.userData?.image}}
              />
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
          {eventData?.bookingStatus == 'complete' ? (
            <>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.SemiBold,
                  marginTop: 50,
                  marginBottom: 10,
                }}>
                Edit Your Review
              </Text>
              <TextInput
                placeholder="Enter Review"
                value={review}
                onChangeText={val => setreview(val)}
                multiline={true}
                numberOfLines={5}
                placeholderTextColor={COLORS.white}
                style={[GlobalStyles.textInput]}
              />

              <TextInput
                placeholder="Enter Rating"
                placeholderTextColor={COLORS.white}
                style={GlobalStyles.textInput}
                keyboardType="number-pad"
                value={rating}
                onChangeText={setrating}
              />

              <NormalButton title="Update" onPress={submitReview} />
            </>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </CustomImageBackground>
  );
};

export default Reviews;

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
