import moment from 'moment';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import GlobalStyles from '../../Component/GlobalStyle';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Chat from '../../Service/Chat';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const SingleChat = props => {
  const {name, img, uId} = props.route.params;
  const {userData} = useSelector(state => state.User);
  const [modal, setModal] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [msg, setmsg] = useState('');
  const [allMsg, setallMsg] = useState([]);

  useEffect(() => {
    getOldMsg();
  }, [uId]);

  useEffect(() => {
    const interval = setInterval(() => {
      getOldMsg();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getOldMsg = async () => {
    const result = await Chat.getSingleChat(uId);
    console.log('getSingleChat=>>>', JSON.stringify(result));
    if (result && result.status) {
      setallMsg(result.data);
    }
  };

  const sendMsg = async () => {
    if (!msg) {
      SimpleToast.show('Please enter a message!');
      return;
    }
    setdisabled(true);
    const result = await Chat.sendMessage({
      // sender: userData._id,
      sender: uId,
      message: msg,
      type: 'text',
    });
    if (result && result.status) {
      setallMsg(state => [result.data, ...state]);
    }
    setdisabled(false);
    setmsg('');
    console.log('sendMsg=>>>', result);
  };
  return (
    <CustomImageBackground>
      <BackCross title="Messages" icon={false} />
      <View style={{width: '100%', paddingBottom: 0, flex: 1}}>
        <FlatList
          data={allMsg}
          inverted
          keyExtractor={item => item._id.toString()}
          style={{flex: 1, marginBottom: 15}}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={({item}) => {
            if (item?.userId == userData?._id) {
              item.userData = userData;
            }
            if (userData._id == item?.sender) {
              item.sendByme = true;
            }
            return (
              <View
                style={{
                  ...styles.mainView,
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: item?.sendByme ? 'row' : 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: item?.sendByme ? 'row' : 'row-reverse',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        ...styles.image,
                        marginRight: item?.sendByme ? 10 : 0,
                        marginLeft: item?.sendByme ? 0 : 10,
                      }}
                      source={{uri: BASE_DOMAIN + item.userData?.image}}
                    />
                    <Text style={styles.name}>
                      {item.userData?.firstname} {item.userData?.lastname}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.name,
                      {fontSize: moderateScale(10), opacity: 0.6},
                    ]}>
                    {moment(item?.createOn).fromNow('LT')}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.name,
                    {
                      fontSize: moderateScale(11),
                      opacity: 0.9,
                      marginTop: 0,
                      marginLeft: moderateScale(item?.sendByme ? 40 : 0),
                      marginRight: moderateScale(item?.sendByme ? 0 : 40),
                      textAlign: item?.sendByme ? 'left' : 'right',
                    },
                  ]}>
                  {item.message}
                </Text>
              </View>
            );
          }}
        />

        <View
          style={{
            // position: 'absolute',
            width: '90%',
            alignSelf: 'center',
            // bottom: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={[GlobalStyles.textInputView, {width: '80%'}]}>
            <TextInput
              placeholder="Message"
              placeholderTextColor={COLORS.white}
              style={{
                width: '85%',
                fontSize: moderateScale(12),
                color: COLORS.white,
              }}
              value={msg}
              onChangeText={setmsg}
            />
            {/* <Icon name="attach" type="Ionicons" style={{color: COLORS.white}} /> */}
          </View>
          <TouchableOpacity
            onPress={sendMsg}
            disabled={disabled}
            style={{
              backgroundColor: COLORS.theme,
              justifyContent: 'center',
              alignItems: 'center',
              width: moderateScale(50),
              height: moderateScale(45),
              borderRadius: 5,
            }}>
            <Icon
              name="paper-plane"
              type="Ionicons"
              style={{color: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    // paddingVertical: verticalScale(),
    // borderBottomWidth: 0.2,
    // borderColor: COLORS.textInput,
    paddingHorizontal: moderateScale(35),
    // flexDirection:'row',
    // justifyContent:'space-between',
    // alignItems:'center'
    marginBottom: 15,
  },
  image: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(20),
    marginRight: 10,
    backgroundColor: COLORS.textInput,
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
