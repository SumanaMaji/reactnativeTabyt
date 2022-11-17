import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import GlobalStyles from '../../Component/GlobalStyle';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import CheckBox from '@react-native-community/checkbox';

const {width, height} = Dimensions.get('window');

const USERLIST = [
  {
    name: 'Dulcie Docher',
    table: 'Lartum',
    count: 7,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  },
  {
    name: 'Garth Hardin',
    table: 'Lartum',
    count: 7,
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  },
  {
    name: 'John Hardy',
    table: 'Lartum',
    count: 9,
    img: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
  },
];

const JoinList = () => {
  const [check, setcheck] = useState(false);

  return (
    <View style={{flex: 1, paddingVertical: moderateScale(20)}}>
      <View
        style={[
          GlobalStyles.textInputView,
          {
            borderRadius: 20,
            height: verticalScale(45),
            backgroundColor: '#406265',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 17,
            width: '85%',
            alignSelf: 'center',
          },
        ]}>
        <Icon
          name="search"
          type="Ionicons"
          style={{color: COLORS.white, fontSize: moderateScale(17)}}
        />
        <TextInput
          style={[
            GlobalStyles.textInput,
            {
              width: '85%',
              height: verticalScale(40),
              borderRadius: 20,
              paddingBottom: 0,
              paddingLeft: 10,
              backgroundColor: 'transparent',
            },
          ]}
          placeholder="Search"
          placeholderTextColor={COLORS.white}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '85%',
          marginLeft: moderateScale(30),
          marginTop: Platform.OS == 'ios' ? 10 : 0,
        }}>
        <CheckBox
          value={check}
          onValueChange={val => setcheck(val)}
          //   style={styles.checkbox}
          tintColors={true ? '#fff' : '#fff'}
          style={{marginRight: 10}}
        />
        <Text
          style={{
            color: COLORS.white,
            opacity: 0.8,
            fontFamily: FONTS.Regular,
            fontSize: moderateScale(12.5),
          }}>
          Hide Anonymous
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {USERLIST.map((item, key) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width,
              paddingHorizontal: moderateScale(30),
              paddingVertical: moderateScale(15),
              borderBottomWidth: 0.7,
              borderColor: COLORS.textInput,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: item.img}}
                style={{
                  width: moderateScale(40),
                  height: moderateScale(40),
                  borderRadius: moderateScale(20),
                  marginRight: 10,
                }}
              />
              <View>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(12),
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(12),
                    opacity: 0.7,
                  }}>
                  Table: {item.table}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Regular,
                  fontSize: moderateScale(12),
                }}>
                {item.count}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Regular,
                  fontSize: moderateScale(11),
                  opacity: 0.9,
                }}>
                Users currently
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JoinList;
