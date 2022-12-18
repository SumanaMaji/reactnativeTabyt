import {Icon, Radio} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import SplitBillonfirmation from '../../Component/Modal/SplitBillConfirmation';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import SplitBillInvite from './SplitBillInvite';

const SplitBillUser = props => {
  const {eventData, eId, bId} = props.route.params;
  const {userData} = useSelector(state => state.User);
  console.log('userData=>>', JSON.stringify(eventData));
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [allUser, setallUser] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [inviteModal, setinviteModal] = useState(false);
  const [modal, setmodal] = useState(false);
  const [splitGuest, setsplitGuest] = useState([]);
  const [totalSplitUser, settotalSplitUser] = useState('');
  const [splitMoney, setsplitMoney] = useState('');
  const [splitUser, setsplitUser] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getSplitBillUser();
  }, []);

  const getSplitBillUser = async () => {
    const result = await Event.getSplitUser(bId);
    console.log('getSplitBillUser result=>', result);
    if (result && result.status) {
      setsplitGuest(result.data);
    }
    setisLoading(true);
  };

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

  const inviteUser = (item, index) => {
    let data = splitGuest;
    data[index].invite = !data[index].invite;
    setsplitGuest(data);
    setrefresh(!refresh);
  };

  console.log('splitGuest=>>', JSON.stringify(splitGuest));

  const sendInvitation = async () => {
    if (
      splitGuest.filter(it => it.guest == true || it.isGest == true).length == 0
    ) {
      SimpleToast.show('You need to add guest user to send invitation!');
      return;
    }
    if (splitGuest.filter(it => it.invite).length == 0) {
      SimpleToast.show('Select guest user to send invitation!');
      return;
    }
    splitGuest
      .filter(it => it.invite)
      .forEach(async element => {
        const result = await Event.sendInvitation({email: element.email});
      });
    SimpleToast.show('Invitation send successfully!');
  };

  const reserveTable = () => {
    const splituserData = splitGuest.filter(it => it.guest != true);
    if (splituserData.length > 0) {
      const count = splituserData.filter(it => it?.approved == true);
      // alert('count' + count.length);
      if (count.length > 0) {
        setsplitUser(count);
        console.log('eventData?.total=>', eventData?.total);
        settotalSplitUser(count.length);
        setsplitMoney(eventData?.total / Number(count.length + 1));
        setmodal(true);
      }
    }
  };

  const removeSplitUser = async it => {
    const result = await Event.deleteSplitUser(it._id);
    console.log('deleteSplitUser result', result);
    if (result && result.status) {
      SimpleToast.show('Removed successfully!');
      getSplitBillUser();
    }
  };

  const renderPaymentStatus = item => {
    // return null;
    if (item?.guest || item?.isGest) {
      return 'Registration pending';
    }
    if (item?.paymentmethods == undefined) {
      if (item?.userData[0]?.paymentmethods.length == 0) {
        return 'Add Payment Method';
      } else if (!item?.approved && !item?.reject) {
        return 'Waiting for response';
      } else if (item?.approved) {
        return 'Ready to split';
      } else if (item?.reject) {
        return 'Split request rejected';
      } else {
        return 'Ready to split';
      }
    } else {
      if (item?.paymentmethods.length === 0) {
        return 'Add Payment Method';
      } else if (item?.approved) {
        return 'Ready to split';
      } else if (item?.reject) {
        return 'Split request rejected';
      } else {
        return 'Ready to split';
      }
    }
  };

  const renderName = item => {
    // return null;
    console.log('name=>>', item);
    // {item?.firstname == undefined || item?.fullname == undefined
    //   ? item?.userData[0]?.firstname
    //   : item?.firstname}{' '}
    // {item?.lastname == undefined
    //   ? item?.userData[0]?.lastname
    //   : item?.lastname}
    if (item?.firstname) {
      return item?.firstname;
    } else if (item?.fullname) {
      return item?.fullname;
    } else if (item?.firstname == undefined) {
      return item?.userData[0]?.firstname;
    } else {
      return item?.userData[0]?.firstname;
    }
  };

  const returnImg = item => {
    if (item?.image) {
      return item?.image;
    } else if (item?.userData && item?.userData.length > 0) {
      return item?.userData[0]?.image;
    } else {
      return null;
    }
    // return !item?.image || item?.image == undefined
    //   ? item?.userData[0]?.image
    //   : item?.image;
  };

  return (
    <CustomImageBackground>
      <BackCross title="Split the bill" icon={false} />
      <Pressable
        style={{...styles.mainView, marginHorizontal: 20, width: '90%'}}
        // onPress={() => continueTOSplit(item, index)}
      >
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={{
              uri: BASE_DOMAIN + userData?.image,
            }}
          />

          <View>
            <Text style={styles.name}>
              {userData?.firstname} {userData?.lastname}
            </Text>
            <Text style={[styles.name, {color: COLORS.cream, fontSize: 10}]}>
              No Activity
            </Text>
          </View>
        </View>
        {splitGuest.length >= 4 ? null : (
          <TouchableOpacity
            onPress={() => setinviteModal(true)}
            style={{...styles.plusButton, width: '23%'}}>
            <Text style={{color: COLORS.theme}}>Add user</Text>
          </TouchableOpacity>
        )}
      </Pressable>
      <FlatList
        data={splitGuest}
        style={{marginTop: 7, marginHorizontal: 20, marginBottom: 80}}
        contentContainerStyle={{paddingBottom: 150}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          console.log('item=>>>', item);
          // console.log(
          //   'userImggg=>',
          //   BASE_DOMAIN +
          //     (item?.image ? item?.userData[0]?.image : item?.image),
          // );
          return (
            <Pressable
              style={styles.mainView}
              onPress={() => inviteUser(item, index)}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: BASE_DOMAIN + returnImg(item),
                  }}
                />

                <View>
                  <Text style={styles.name}>{renderName(item)}</Text>
                  {item?.guest || item?.isGest ? null : (
                    <Text style={styles.shadow}>
                      Age:{' '}
                      <Text style={styles.name}>
                        {getAge(
                          item?.dob == undefined
                            ? item?.userData[0]?.dob
                            : item?.dob,
                        )}{' '}
                      </Text>
                      | Gender:{' '}
                      <Text style={styles.name}>
                        {item?.gender == undefined
                          ? item?.userData[0]?.gender
                          : item?.gender}
                      </Text>
                    </Text>
                  )}
                  <Text
                    style={[styles.name, {color: COLORS.theme, fontSize: 10}]}>
                    {renderPaymentStatus(item)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                {item?.guest || item?.isGest ? (
                  <TouchableOpacity
                    onPress={() => inviteUser(item, index)}
                    style={styles.plusButton}>
                    <Icon
                      name={!item.invite ? 'plus' : 'minus'}
                      type="AntDesign"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  onPress={() => removeSplitUser(item)}
                  style={{...styles.plusButton, marginLeft: 10}}>
                  <Icon
                    name={'minus'}
                    type="AntDesign"
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          );
        }}
      />
      {splitGuest.length == 0 ? null : (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 25,
            alignSelf: 'center',
            height: 35,
            borderWidth: 1,
            borderColor: COLORS.cream,
            borderRadius: 4,
            width: '75%',
          }}>
          <TouchableOpacity
            onPress={sendInvitation}
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: COLORS.cream,
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: COLORS.cream,
                fontFamily: FONTS.Medium,
                fontSize: 13,
              }}>
              SEND INVITATIONS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={reserveTable}
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: COLORS.cream,
                fontFamily: FONTS.Medium,
                fontSize: 13,
              }}>
              RESERVE TABLE
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={inviteModal}>
        <SplitBillInvite
          splitGuest={splitGuest}
          eId={bId}
          back={() => setinviteModal(false)}
          confirm={data => {
            // setsplitGuest([...splitGuest, ...data]);
            getSplitBillUser();
            setinviteModal(false);
          }}
        />
      </Modal>
      <Modal visible={modal} transparent>
        <SplitBillonfirmation
          close={() => setmodal(false)}
          total={totalSplitUser}
          money={splitMoney}
          continue={() => {
            setmodal(false);
            Navigation.navigate('CheckoutSplitBill', {
              eventData: eventData,
              currentSelection: 'reservation',
              selectedItem: eventData?.tickets,
              splitUser: splitUser,
            });
          }}
        />
      </Modal>
    </CustomImageBackground>
  );
};

export default SplitBillUser;

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
    width: moderateScale(28),
    height: moderateScale(22),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: COLORS.theme,
  },
  plusIcon: {
    color: COLORS.theme,
    fontSize: moderateScale(14),
  },
});
