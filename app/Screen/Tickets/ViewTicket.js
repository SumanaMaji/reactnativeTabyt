import {useRoute} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import StarRating from 'react-native-star-rating';
import Swiper from 'react-native-swiper';
import BackCross from '../../Component/Header/BackCross';

const {width, height} = Dimensions.get('window');

const MIN_HEIGHT = moderateScale(120);
const MAX_HEIGHT = moderateScale(220);

const IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
];

const ViewTicket = props => {
  const route = useRoute();

  const eventData = {
    title: 'What is Lorem Ipsum?',
    date: '31-June-2021',
    time: '5.00 - 6.00 pm',
    organized: 'Arindam Samanta',
    attn: '25',
    address: 'Lorem Ipsum is simply dummy text of the printing',
    image:
      'https://www.livemorezone.com/wp-content/uploads/secret-events-delhi-livemorezone-dbs.jpg',
  };

  const [showModal, setShowmodal] = useState(false);
  const [ImgModal, setImgmodal] = useState(false);

  const offset = useRef(new Animated.Value(0)).current;

  const ImageHeight = offset.interpolate({
    inputRange: [0, MAX_HEIGHT],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <CustomImageBackground>
      <BackCross title="My Tickets" icon={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{marginTop: 0}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {useNativeDriver: false},
        )}>
        <Swiper
          style={{height: 220}}
          showsButtons={false}
          paginationStyle={{bottom: 0}}
          activeDotColor={COLORS.theme}
          dotColor={COLORS.textInput}>
          {IMAGES.map((it, key) => (
            <View style={{height: 220}}>
              <Image
                style={{flex: 1, resizeMode: 'contain'}}
                source={{uri: it}}
              />
            </View>
          ))}
        </Swiper>

        <View
          style={{
            alignSelf: 'center',
            borderWidth: 0.4,
            borderColor: COLORS.cream,
            paddingHorizontal: 10,
            paddingVertical: 1,
            borderRadius: 2,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: COLORS.cream,
              fontFamily: FONTS.Regular,
              fontSize: 10,
            }}>
            Table reservation
          </Text>
        </View>
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
                width: '72%',
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
                }}
                numberOfLines={1}>
                {eventData.address}
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 3,
              }}></View>
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
            {eventData.title}
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
              <Text style={{textDecorationLine: 'underline'}}>
                {eventData.organized}
              </Text>
            </Text>
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
              12-June-2021 to 21-June-2021
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
              3.00 - 4.00 pm
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Regular,
              fontSize: moderateScale(12),
            }}>
            Special Guests:{' '}
            <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
              James Robert, Michael John
            </Text>
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Regular,
              fontSize: moderateScale(12),
            }}>
            Attending:{' '}
            <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
              14
            </Text>
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Regular,
              fontSize: moderateScale(12),
              marginTop: 5,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <View
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
              <Text style={{color: COLORS.theme, fontSize: moderateScale(12)}}>
                Music Type
              </Text>
              <Text style={{color: COLORS.white, fontSize: moderateScale(12)}}>
                Rock, Pop, Classic
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 10,
              borderBottomWidth: 0.4,
              paddingBottom: 15,
              borderColor: COLORS.textInput,
              marginBottom: 5,
            }}>
            <Icon
              name="shirt"
              type="Ionicons"
              style={{color: COLORS.theme, fontSize: moderateScale(25)}}
            />
            <View style={{marginLeft: 15}}>
              <Text style={{color: COLORS.theme, fontSize: moderateScale(12)}}>
                Dress Codes
              </Text>
              <Text
                style={{color: COLORS.white, fontSize: moderateScale(11.5)}}>
                Men: Suite with Shoes
              </Text>
              <Text
                style={{color: COLORS.white, fontSize: moderateScale(11.5)}}>
                Women: Skirt top with Shoes
              </Text>
              <Text
                style={{color: COLORS.white, fontSize: moderateScale(11.5)}}>
                Can't Wear: Floppers Shoes
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Regular,
              fontSize: moderateScale(12),
              opacity: 0.8,
            }}>
            Additional Order: $120
          </Text>
        </View>
      </ScrollView>
    </CustomImageBackground>
  );
};

export default ViewTicket;

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
