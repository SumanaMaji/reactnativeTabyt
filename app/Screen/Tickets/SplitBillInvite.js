import {Icon, Radio} from 'native-base';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import GradientButton from '../../Component/Button/GradientButton';
import GlobalStyles from '../../Component/GlobalStyle';
import BackCross from '../../Component/Header/BackCross';
import BackHeader from '../../Component/Header/BackHeader';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Event from '../../Service/Event';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const SplitBillInvite = props => {
  const {eId, splitGuest} = props;
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [allUser, setallUser] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const searchUser = async () => {
    let data = {
      name: name,
      email: email,
    };
    if (!name) {
      delete data.name;
    }
    if (!email) {
      delete data.email;
    }
    const result = await Auth.findUser(data);
    console.log('all user', result);
    if (result && result.status) {
      setallUser(result.data);
    } else {
      setallUser([]);
      if (email) {
        let pattern =
          /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);

        if (emailresult !== true) {
          SimpleToast.show('Invalid Email Id!');
          return false;
        } else {
          let count = allUser.filter(it => it.guest == true).length;
          let dd = {
            firstname: 'Guest ' + Number(count + 1),
            email,
            guest: true,
          };
          setallUser([...allUser, dd]);
        }
      }
    }
  };

  const getAge = data => {
    var date1 = new Date(data);
    var date2 = new Date();
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    return Math.round(diffDays / 365);
  };

  const continueTOSplit = (item, index) => {
    let data = allUser;
    const currentIndex = data.findIndex(i => i.selected == true);
    if (currentIndex >= 0) {
      data[currentIndex].selected = false;
    }
    data[index].selected = !data[index].selected;
    setallUser(data);
    setrefresh(!refresh);
  };

  const confirm = async () => {
    if (splitGuest.length >= 5) {
      SimpleToast.show('Can not add more than 5 user!');
      return;
    }

    const currentUser = allUser.filter(it => it.selected == true);
    console.log('currentUser=>>>', currentUser);
    if (splitGuest.filter(i => i.email == currentUser[0].email).length > 0) {
      SimpleToast.show('This user already added!');
      return;
    }
    // return;
    if (currentUser.length > 0) {
      let data = {
        bookingId: eId,
        fullname: currentUser[0]?.firstname,
        email: currentUser[0]?.email,
        isGest:
          currentUser[0]?.guest === undefined ? false : currentUser[0]?.guest,
      };

      console.log('split data=>>', data);
      const result = await Event.inviteSplitUser(data);
      console.log('inviteSplitUser result=>>>', result);
      if (result && result.status) {
        props.confirm(allUser.filter(it => it.selected == true));
      }
    }
  };

  return (
    <CustomImageBackground>
      <BackHeader title="Split the bill" back={() => props.back()} />
      <View
        style={{
          justifyContent: 'space-evenly',
          width: '85%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TextInput
          placeholder="Enter Guest Name"
          placeholderTextColor={COLORS.white}
          style={[GlobalStyles.textInput, {borderRadius: 50}]}
          value={name}
          onChangeText={setname}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View
            style={{
              width: '43%',
              height: 0.6,
              backgroundColor: COLORS.textInput,
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontFamily: FONTS.SemiBold,
              fontSize: moderateScale(12),
            }}>
            OR
          </Text>
          <View
            style={{
              width: '43%',
              height: 0.6,
              backgroundColor: COLORS.textInput,
            }}
          />
        </View>

        <TextInput
          placeholder="Enter Email Id"
          placeholderTextColor={COLORS.white}
          style={[GlobalStyles.textInput, {borderRadius: 50}]}
          value={email}
          onChangeText={setemail}
        />

        <TouchableOpacity
          onPress={searchUser}
          style={{
            height: verticalScale(45),
            backgroundColor: COLORS.button,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            elevation: 5,
            marginTop: 15,
          }}>
          <Text
            style={{
              fontFamily: FONTS.title,
              color: COLORS.white,
              fontSize: 14,
            }}>
            Search
          </Text>
          <Icon
            name="ios-search"
            style={{color: COLORS.white, fontSize: 20, marginLeft: 5}}
          />
        </TouchableOpacity>

        <FlatList
          data={allUser}
          style={{marginTop: 7}}
          contentContainerStyle={{paddingBottom: 150}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Pressable
              style={styles.mainView}
              onPress={() => continueTOSplit(item, index)}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: BASE_DOMAIN + item?.image,
                  }}
                />

                <View>
                  <Text style={styles.name}>
                    {item?.firstname} {item?.lastname}
                  </Text>
                  {item?.guest ? null : (
                    <Text style={styles.shadow}>
                      Age: <Text style={styles.name}>{getAge(item?.dob)} </Text>
                      | Gender: <Text style={styles.name}>{item?.gender}</Text>
                    </Text>
                  )}
                  <Text
                    style={[styles.name, {color: COLORS.cream, fontSize: 10}]}>
                    No Activity
                  </Text>
                </View>
              </View>
              <Radio
                color={COLORS.theme}
                selected={item.selected}
                onPress={() => continueTOSplit(item, index)}
                selectedColor={COLORS.theme}
              />
            </Pressable>
          )}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '85%',
        }}>
        <GradientButton title="Confirm" onPress={confirm} />
      </View>
    </CustomImageBackground>
  );
};

export default SplitBillInvite;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    // marginTop: 10,
    paddingVertical: verticalScale(7),
    // borderBottomWidth: 0.2,
    // borderColor: COLORS.textInput,
    paddingHorizontal: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: 10,
    backgroundColor: COLORS.lightgray,
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
    // borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  plusIcon: {
    color: COLORS.theme,
    fontSize: moderateScale(17),
  },
});
