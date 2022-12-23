import {View, Text} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating';
import Navigation from '../../Service/Navigation';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';

const EventOrganizedBy = ({organizerName, oId, avgRating}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 3,
        marginBottom: 2,
      }}>
      <Text
        numberOfLines={1}
        style={{
          color: COLORS.white,
          opacity: 0.8,
          fontFamily: FONTS.Medium,
          fontSize: moderateScale(13),
          width: '75%',
        }}>
        Organized by:{' '}
        <Text
          onPress={() =>
            Navigation.navigate('ViewOrganizer', {
              oId: oId,
            })
          }
          style={{
            textDecorationLine: 'underline',
            color: COLORS.theme,
            fontFamily: FONTS.Medium,
            fontSize: moderateScale(13),
          }}>
          {organizerName}
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
          starSize={12}
          starStyle={{color: COLORS.orange}}
        />
        <Text
          style={{
            color: COLORS.white,
            marginLeft: 5,
            fontFamily: FONTS.Medium,
            fontSize: moderateScale(13),
          }}>
          {avgRating}
        </Text>
      </View>
    </View>
  );
};

export default EventOrganizedBy;
