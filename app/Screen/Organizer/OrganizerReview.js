import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../Constant/Colors';
import {moderateScale} from '../../PixelRatio';
import {FONTS} from '../../Constant/Font';
import Navigation from '../../Service/Navigation';
import StarRating from 'react-native-star-rating';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import moment from 'moment';

const OrganizerReview = props => {
  const {allReview, avgReview} = props;
  return (
    <View style={{flex: 1, marginHorizontal: 30}}>
      {allReview.length > 0 ? (
        <View style={{marginTop: 15}}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.SemiBold,
              fontSize: 18,
            }}>
            {allReview.length} Reviews
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={avgReview}
              starSize={15}
              starStyle={{color: COLORS.orange}}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.SemiBold,
                fontSize: moderateScale(13),
                marginLeft: 5,
              }}>
              {avgReview}
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
                backgroundColor: COLORS.cream,
              }}
              source={{
                uri: BASE_DOMAIN + it?.userData?.image,
              }}
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
                rating={4.5}
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
                {it.rating} Rating
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
    </View>
  );
};

export default OrganizerReview;
