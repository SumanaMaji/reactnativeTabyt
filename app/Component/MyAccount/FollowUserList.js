import moment from 'moment';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import InviteModal from '../Modal/InviteModal';

const FollowUserList = props => {
  const {showPlus, showBottom, disableLive, event, data, userId} = props;

  const [modal, setModal] = useState(false);

  const getAge = it => {
    const a = moment([moment(new Date()).format('YYYY', 'MM')]);
    const b = moment([moment(it.dob).format('YYYY', 'MM')]);
    const age = a.diff(b, 'years');
    return age;
  };

  const responseRequest = async (it, status) => {
    const result = await Event.responseFollowUserList(it._id, {
      status: status,
      accpect: status,
    });
    console.log('result=>>', result);
    if (result && result.status) {
      SimpleToast.show(status ? 'Accepted' : 'Rejected' + 'successfully');
      props.reload();
    }
  };

  return (
    <View style={{width: '100%', paddingBottom: 50}}>
      <ScrollView>
        <View style={{paddingBottom: 100}}>
          {data.map((it, key) => {
            return (
              <Pressable
                key={key}
                style={styles.mainView}
                onPress={() =>
                  Navigation.navigate('ViewUserProfile', {
                    uname: it?.userData?.firstname,
                    uId: it?.userData?._id,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={styles.image}
                      source={{uri: BASE_DOMAIN + it?.userData?.image}}
                    />
                    {it.live && !disableLive ? (
                      <View style={styles.live} />
                    ) : null}
                    <View>
                      <Text style={styles.name}>
                        {it?.userData?.firstname} {it?.userData?.lastname}
                      </Text>
                      <Text style={styles.shadow}>
                        Age:{' '}
                        <Text style={styles.name}>{getAge(it?.userData)} </Text>
                        | Favorite Drink:{' '}
                        <Text style={styles.name}>
                          {/* {Object.keys(it).length > 0 &&
                          it?.userData?.favoriteDrink.length > 0
                            ? it?.userData?.favoriteDrink[0]?.name
                            : null} */}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                {it.event && event ? (
                  <View style={styles.event}>
                    <Text style={[styles.name, {fontSize: moderateScale(10)}]}>
                      UPCOMING EVENT
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}>
        <InviteModal
          close={val => {
            setModal(false);
          }}
          buttonTitle="Send"
        />
      </Modal>
    </View>
  );
};

export default FollowUserList;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    paddingVertical: verticalScale(15),
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
    backgroundColor: COLORS.textInput,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
    top: 10,
    right: 30,
  },
});
