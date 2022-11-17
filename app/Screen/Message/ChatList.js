import React from 'react';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Chat from '../../Service/Chat';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import {useIsFocused} from '@react-navigation/native';

const ChatList = props => {
  const isFocused = useIsFocused();
  const {showPlus, showBottom, disableLive, event} = props;

  const [modal, setModal] = useState(false);
  const [allChatList, setallChatList] = useState([]);

  useEffect(() => {
    getChatListData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getChatListData();
    }, 5000);
    return () => clearInterval(interval);
  }, [isFocused]);

  const getChatListData = async () => {
    const result = await Chat.getChatList();
    console.log('chat list=>>', JSON.stringify(result));
    if (result && result.status) {
      setallChatList(result.data);
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="Messages" icon={false} />
      <View style={{width: '100%', paddingBottom: 50}}>
        <ScrollView>
          <View style={{paddingBottom: 100}}>
            {allChatList.map((it, key) => (
              <Pressable
                key={key}
                style={styles.mainView}
                onPress={() =>
                  Navigation.navigate('SingleChat', {
                    name: '',
                    img: '',
                    uId: it?.userData?._id,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', maxWidth: '90%'}}>
                    <Pressable
                    // onPress={() => Navigation.navigate('ViewProfile')}
                    >
                      <Image
                        style={styles.image}
                        source={{uri: BASE_DOMAIN + it?.userData?.image}}
                      />
                    </Pressable>
                    <View>
                      <Text style={styles.name}>
                        {it?.userData?.firstname} {it?.userData?.lastname}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.shadow,
                          {
                            fontFamily: it?.isSeen
                              ? FONTS.Regular
                              : FONTS.Medium,
                            opacity: it?.isSeen ? 0.6 : 1,
                          },
                        ]}>
                        {it.message}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.event}>
                  <Text
                    style={[
                      styles.name,
                      {fontSize: moderateScale(10), opacity: 0.8},
                    ]}>
                    {/* {moment(it?.createOn).startOf('hour').fromNow()} */}
                    {moment(it?.createOn).fromNow('LT')}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </CustomImageBackground>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    paddingVertical: verticalScale(17),
    borderBottomWidth: 0.2,
    borderColor: COLORS.textInput,
    paddingHorizontal: moderateScale(35),
    // flexDirection:'row',
    // justifyContent:'space-between',
    // alignItems:'center'
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: 10,
  },
  live: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(7),
    backgroundColor: COLORS.green,
    borderColor: COLORS.white,
    borderWidth: 2,
    position: 'absolute',
    bottom: 0,
    left: moderateScale(25),
  },
  name: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(12),
  },
  shadow: {
    color: COLORS.lightgray,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(11.5),
    // opacity:.7
  },
  plusButton: {
    width: moderateScale(30),
    height: moderateScale(25),
    borderWidth: 1,
    borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  plusIcon: {
    color: COLORS.theme,
    fontSize: moderateScale(17),
  },
  acceptButton: {
    borderWidth: 1,
    borderColor: COLORS.theme,
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 10,
  },
  butTxt: {
    color: COLORS.theme,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(12),
  },
  event: {
    // backgroundColor: COLORS.textInput,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 1,
    // borderRadius: 5,
    top: 10,
    right: 30,
  },
});
