import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {moderateScale} from '../../PixelRatio';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {Icon, Left, ListItem, Right} from 'native-base';
import BackCross from '../../Component/Header/BackCross';
// import {Picker} from '@react-native-picker/picker';
import GlobalStyles from '../../Component/GlobalStyle';
import NormalButton from '../../Component/Button/NormalButton';
import PrefModal from '../../Component/Modal/PrefModal';
import AuthModal from '../../Component/Modal/AuthModal';
// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {setImg, setUser} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import ImageCropPicker from 'react-native-image-crop-picker';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Picker from '../../Component/DropDownPicker/Picker';
import {ETHNCITY_TYPE, GENDER} from '../../Constant/DATA';
import CountryCityModal from '../../Component/Modal/CountryCityModal';

const datet = new Date();

const year = datet.getFullYear();
const month = datet.getMonth();
const day = datet.getDate();

const EditProfile = () => {
  const dispatch = useDispatch();
  const {userData, updateImg} = useSelector(state => state.User);

  console.log('userData', userData);

  const [organizerModal, setorganizerModal] = useState(false);
  const [musicModal, setmusicModal] = useState(false);
  const [eventModal, seteventModal] = useState(false);
  const [drinksModal, setdrinksModal] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  // const [date, setDate] = React.useState(new Date(1598051730000));
  // const [dob, setdob] = React.useState('DOB');
  // const [dateModal, setdateModal] = React.useState(false);

  const [dateModal, setdateModal] = React.useState(false);
  const [uData, setuData] = React.useState(userData);
  const [gender, setgender] = React.useState(userData.gender);
  const [firstname, setfirstname] = React.useState(userData.firstname);
  const [lastname, setlastname] = React.useState(userData.lastname);
  const [zip, setzip] = React.useState(JSON.stringify(userData.zipcode));
  const [email, setemail] = React.useState(userData.email);
  const [mobile, setmobile] = React.useState(
    userData?.phone ? userData?.phone?.toString() : '',
  );
  const [ethncity, setethncity] = React.useState(userData.ethncity);
  const [city, setcity] = React.useState({});
  const [allcity, setallcity] = React.useState([]);
  const [states, setstates] = React.useState('');
  const [allstates, setallstates] = React.useState([]);
  const [date, setDate] = React.useState(new Date(userData.dob));
  const [dob, setdob] = React.useState(userData.dob);
  const [userImg, setuserImg] = React.useState(BASE_DOMAIN + userData.image);

  const [organizerList, setorganizerList] = useState([]);
  const [musicList, setmusicList] = useState([]);
  const [eventList, seteventList] = useState([]);
  const [drinksList, setdrinksList] = useState([]);

  const [statesModal, setstatesModal] = React.useState(false);
  const [cityModal, setcityModal] = React.useState(false);

  console.log('userData.city=>>>', userData.city);

  // useEffect(() => {
  //   console.log("updateImg",updateImg)
  //   if (updateImg) {
  //     alert();
  //     setTimeout( async () => {
  //       await Auth.setAccount(userData);
  //       let getAcc = await Auth.getAccount();
  //       console.log("getAcc",getAcc)
  //     }, 1000);
  //   }
  //   return () => null
  // }, [updateImg])

  useEffect(() => {
    getAllStates();
    getCurrentCity();
    getOrganizer();
    getMusic();
    getEvent();
    getDrinks();
    return () => null;
  }, []);

  const getAllStates = async () => {
    let result = await Auth.getStates();
    //  console.log("states",result);
    if (result && result.success) {
      setallstates(result.data);
      setstates(result.data.filter(it => it.id == userData.state)[0]);
      getCityByStates(
        result.data.filter(it => it.id == userData.state)[0],
        true,
      );
    }
  };

  const getCurrentCity = async () => {
    let result = await Auth.getCity(userData.state);
    if (result && result.success) {
      setallcity(result.data);
    }
  };

  const getOrganizer = async () => {
    let result = await Auth.getOrganizer();
    // console.log("result",result);
    if (result && result.status) {
      result.data.forEach(element => {
        if (userData.organizer.filter(it => it._id == element._id).length > 0) {
          element.status = false;
        }
      });
      setorganizerList(result.data);
    }
  };

  const getMusic = async () => {
    let result = await Auth.getMusic();
    // console.log("result",result);
    if (result && result.status) {
      result.data.forEach(element => {
        if (userData.musicType.filter(it => it._id == element._id).length > 0) {
          element.status = false;
        }
      });
      setmusicList(result.data);
    }
  };

  const getEvent = async () => {
    let result = await Auth.getEvent();
    // console.log("result",result);
    if (result && result.status) {
      result.data.forEach(element => {
        if (userData.eventType.filter(it => it._id == element._id).length > 0) {
          element.status = false;
        }
      });
      seteventList(result.data);
    }
  };

  const getDrinks = async () => {
    let result = await Auth.getDrinks();
    // console.log("getDrinks",result);
    if (result && result.status) {
      result.data.forEach(element => {
        if (
          userData.favoriteDrink.filter(it => it._id == element._id).length > 0
        ) {
          element.status = false;
        }
      });
      setdrinksList(result.data);
    }
  };

  const getCityByStates = async (data, status) => {
    console.log('city >>>', data, status);
    setstates(data);
    setcity({});
    setstatesModal(false);
    let result = await Auth.getCity(data.id);
    console.log('cityList=>>>>>>', result);
    if (result && result.success) {
      setallcity(result.data);
      if (
        status &&
        result.data.filter(ddd => Number(ddd.id) == Number(userData.city))
          .length > 0
      ) {
        setcity(
          result.data.filter(ddd => Number(ddd.id) == Number(userData.city))[0],
        );
      }
    }
  };

  const onChange = selectedDate => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setdateModal(false);
    setDate(currentDate);
    setdob(moment(currentDate).format('L'));
  };

  const updateProfile = async status => {
    if (
      email == '' ||
      zip == '' ||
      firstname == '' ||
      lastname == '' ||
      gender == '' ||
      city == '' ||
      dob == 'DOB' ||
      mobile == ''
    ) {
      Toast.show('Please fill out all fields!');
      return;
    }

    if (
      organizerList.filter(it => it.status == false).length == 0 ||
      musicList.filter(it => it.status == false).length == 0 ||
      eventList.filter(it => it.status == false).length == 0 ||
      drinksList.filter(it => it.status == false).length == 0
    ) {
      Toast.show('Please fill out all fields!');
      return;
    }

    let pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    let emailresult = pattern.test(email);

    if (emailresult !== true) {
      Toast.show('Invalid Email Id!', Toast.SHORT);
      return false;
    }

    if (!status) {
      setVerifyModal(true);
      return false;
    }

    let data = {
      email: email,
      phone: mobile,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      zipcode: Number(zip),
      ethncity: ethncity,
      state: Number(states.id),
      city: Number(city.id),
      organizer: organizerList.filter(it => it.status == false),
      musicType: musicList.filter(it => it.status == false),
      favoriteDrink: drinksList.filter(it => it.status == false),
      eventType: eventList.filter(it => it.status == false),
    };

    let result = await Auth.updateprofile(data);
    console.log('update', result);
    if (result && result.status) {
      Toast.show('Update Successfully!', Toast.SHORT);
      await Auth.setAccount(result.data);
      dispatch(setUser(result.data));
    }

    // Navigation.navigate('Password',{data})
  };

  const browseImage = async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      console.log(image);
      setuserImg(image.path);
      let result = await Auth.uploadPic(image);
      console.log('imagUpload', result);
      if (result && result.status) {
        // result.data.image = BASE_DOMAIN+result.data.image;
        Toast.show('Upload Successfully!', Toast.SHORT);
        await Auth.setAccount(result.data);
        dispatch(setUser(result.data));
      }
    });
  };

  const renderFavDrink = () => {
    const data = drinksList.filter(it => it.status == false);
    return data.map((it, key) => {
      return (
        <Text key={key} style={{fontWeight: 'bold'}}>
          {it.name}
          {data.length == key + 1 ? ' ' : ', '}
        </Text>
      );
    });
  };

  return (
    <CustomImageBackground>
      <BackCross title="Edit Profile" icon={false} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{width: '85%', alignSelf: 'center', flex: 1}}>
          <View
            style={{
              // flexDirection: 'row',
              borderBottomWidth: 0.2,
              borderColor: COLORS.textInput,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: moderateScale(70),
                height: moderateScale(70),
              }}>
              <Image source={{uri: userImg}} style={styles.img} />
              <TouchableOpacity onPress={browseImage} style={styles.camera}>
                <Icon
                  name="camera"
                  type="Ionicons"
                  style={{color: COLORS.white, fontSize: moderateScale(22)}}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: COLORS.theme,
                fontFamily: FONTS.Regular,
                fontSize: moderateScale(11),
                marginTop: 10,
              }}>
              Preview My Profile
            </Text>
          </View>

          <View style={{paddingBottom: 50}}>
            <Text style={styles.heading}>Personal Information</Text>

            <TextInput
              placeholder="First Name"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={firstname}
              onChangeText={val => setfirstname(val)}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={lastname}
              onChangeText={val => setlastname(val)}
            />
            {/* <View
              style={[
                Platform.OS == 'android' ? GlobalStyles.textInputView : {},
              ]}>
              <Picker
                style={GlobalStyles.picker}
                dropdownIconColor={COLORS.white}
                selectedValue={gender}
                itemStyle={{color: '#fff'}}
                onValueChange={(itemValue, itemIndex) => setgender(itemValue)}>
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Gender"
                  value=""
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Male"
                  value="Male"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Female"
                  value="Female"
                />
                <Picker.Item
                  style={styles.pickerItem}
                  label="Transgender"
                  value="Transgender"
                />
              </Picker>
            </View> */}
            <Picker
              data={GENDER.filter(i => i.value !== 'All')}
              label="label"
              value="value"
              onSelect={(val, item) => setgender(val)}
              placeholder="Gender"
              selectedValue={gender}
            />
            <TouchableOpacity
              style={[GlobalStyles.textInputView, {paddingHorizontal: 20}]}
              onPress={() => setdateModal(true)}>
              <Text style={GlobalStyles.dob}>{dob}</Text>
              {/* <TouchableOpacity onPress={() => setdateModal(true)} style={{}}> */}
              <Icon
                name="calendar"
                type="Ionicons"
                style={{color: COLORS.white, fontSize: moderateScale(20)}}
              />
              {/* </TouchableOpacity> */}
              {/* {dateModal && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  minimumDate={new Date('1947-01-01')}
                  maximumDate={new Date(year - 21, month, day)}
                  display="default"
                  onChange={onChange}
                />
              )} */}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={dateModal}
              mode="date"
              minimumDate={new Date('1947-01-01')}
              maximumDate={new Date(year - 21, month, day)}
              onConfirm={onChange}
              onCancel={() => setdateModal(false)}
            />
            {/* <View
              style={[
                Platform.OS == 'android' ? GlobalStyles.textInputView : {},
              ]}>
              <Picker
                style={GlobalStyles.picker}
                dropdownIconColor={COLORS.white}
                selectedValue={ethncity}
                itemStyle={{color: '#fff'}}
                onValueChange={(itemValue, itemIndex) =>
                  setethncity(itemValue)
                }>
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Ethncity"
                  value=""
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="American Indian"
                  value="American Indian"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Asian"
                  value="Asian"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="African American"
                  value="African American"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Native Hawaiian"
                  value="Native Hawaiian"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="White"
                  value="White"
                />
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="Hispanic"
                  value="Hispanic"
                />
              </Picker>
            </View> */}
            <Picker
              data={ETHNCITY_TYPE}
              label="label"
              value="value"
              onSelect={(val, item) => setethncity(val)}
              placeholder="Ethncity"
              selectedValue={ethncity}
            />
            <TextInput
              placeholder="Postal Code"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={zip}
              onChangeText={val => setzip(val)}
            />
            <Pressable
              onPress={() => setstatesModal(true)}
              style={[GlobalStyles.textInputView, {paddingHorizontal: 20}]}>
              <Text style={styles.dob}>
                {Object.keys(states).length == 0 ? 'States' : states.name}
              </Text>
              <Icon
                style={{color: COLORS.white}}
                name="arrow-drop-down"
                type="MaterialIcons"
              />
            </Pressable>
            <Pressable
              onPress={() => setcityModal(true)}
              style={[GlobalStyles.textInputView, {paddingHorizontal: 20}]}>
              <Text style={styles.dob}>
                {Object.keys(city).length == 0 ? 'City' : city.name}
              </Text>
              <Icon
                style={{color: COLORS.white}}
                name="arrow-drop-down"
                type="MaterialIcons"
              />
            </Pressable>
            {/* <View
              style={[
                Platform.OS == 'android' ? GlobalStyles.textInputView : {},
              ]}>
              <Picker
                style={GlobalStyles.picker}
                dropdownIconColor={COLORS.white}
                selectedValue={states}
                itemStyle={{color: '#fff'}}
                onValueChange={(itemValue, itemIndex) =>
                  getCityByStates(itemValue, itemIndex)
                }>
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="State"
                  value=""
                />
                {allstates.map((it, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      style={GlobalStyles.pickerItem}
                      label={it.name}
                      value={it.id}
                    />
                  );
                })}
              </Picker>
            </View> */}

            {/* <View
              style={[
                Platform.OS == 'android' ? GlobalStyles.textInputView : {},
              ]}>
              <Picker
                style={GlobalStyles.picker}
                dropdownIconColor={COLORS.white}
                selectedValue={city}
                itemStyle={{color: '#fff'}}
                onValueChange={(itemValue, itemIndex) => setcity(itemValue)}>
                <Picker.Item
                  style={GlobalStyles.pickerItem}
                  label="City"
                  value=""
                />
                {allcity.map((it, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      style={GlobalStyles.pickerItem}
                      label={it.name}
                      value={it.id}
                    />
                  );
                })}
              </Picker>
            </View> */}

            <Text style={styles.heading}>Contact Information</Text>
            <TextInput
              placeholder="Email Id"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={email}
              onChangeText={val => setemail(val)}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.white}
              style={GlobalStyles.textInput}
              value={mobile}
              onChangeText={val => setmobile(val)}
            />
            <Text style={styles.heading}>Preferences</Text>

            <View>
              <Pressable
                onPress={() => setorganizerModal(true)}
                style={[
                  GlobalStyles.textInputView,
                  {
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={{width: '90%'}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    Organizer Type:{' '}
                    {organizerList
                      .filter(it => it.status == false)
                      .map((it, key) => (
                        <Text key={key} style={{fontWeight: 'bold'}}>
                          {it.name},{' '}
                        </Text>
                      ))}
                  </Text>
                </View>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  style={{color: COLORS.white}}
                />
              </Pressable>

              <Pressable
                onPress={() => setmusicModal(true)}
                style={[
                  GlobalStyles.textInputView,
                  {
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={{width: '90%'}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    Music Type:{' '}
                    {musicList
                      .filter(it => it.status == false)
                      .map((it, key) => (
                        <Text key={key} style={{fontWeight: 'bold'}}>
                          {it.name},{' '}
                        </Text>
                      ))}
                  </Text>
                </View>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  style={{color: COLORS.white}}
                />
              </Pressable>

              <Pressable
                onPress={() => seteventModal(true)}
                style={[
                  GlobalStyles.textInputView,
                  {
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={{width: '90%'}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    Event Type:{' '}
                    {eventList
                      .filter(it => it.status == false)
                      .map((it, key) => (
                        <Text key={key} style={{fontWeight: 'bold'}}>
                          {it.name},{' '}
                        </Text>
                      ))}
                  </Text>
                </View>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  style={{color: COLORS.white}}
                />
              </Pressable>

              <Pressable
                onPress={() => setdrinksModal(true)}
                style={[
                  GlobalStyles.textInputView,
                  {
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View style={{width: '90%'}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.Regular,
                      fontSize: moderateScale(12),
                    }}>
                    Favorite Drink: {renderFavDrink()}
                  </Text>
                </View>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  style={{color: COLORS.white}}
                />
              </Pressable>
            </View>

            <NormalButton
              title="Update"
              onPress={updateProfile}
              // onPress={() => setVerify(true)}
              style={{marginTop: 10}}
            />
          </View>

          <Modal
            visible={verifyModal}
            transparent={true}
            onRequestClose={() => setVerifyModal(false)}>
            <AuthModal
              userData={userData}
              close={() => setVerifyModal(false)}
              verified={() => {
                setVerify(true);
                setVerifyModal(false);
                updateProfile(true);
              }}
              buttonTitle="Apply"
            />
          </Modal>

          <Modal
            visible={organizerModal}
            transparent={true}
            onRequestClose={() => setorganizerModal(false)}>
            <PrefModal
              data={organizerList}
              selected={data => [
                setorganizerList(data),
                setorganizerModal(false),
              ]}
            />
          </Modal>

          <Modal
            visible={musicModal}
            transparent={true}
            onRequestClose={() => setmusicModal(false)}>
            <PrefModal
              data={musicList}
              selected={data => [setmusicList(data), setmusicModal(false)]}
            />
          </Modal>

          <Modal
            visible={eventModal}
            transparent={true}
            onRequestClose={() => seteventModal(false)}>
            <PrefModal
              data={eventList}
              selected={data => [seteventList(data), seteventModal(false)]}
            />
          </Modal>

          <Modal
            visible={drinksModal}
            transparent={true}
            onRequestClose={() => setdrinksModal(false)}>
            <PrefModal
              data={drinksList}
              add={true}
              selected={data => [setdrinksModal(data), setdrinksModal(false)]}
            />
          </Modal>

          <Modal
            visible={statesModal}
            animationType="slide"
            onRequestClose={() => setstatesModal(false)}>
            <CountryCityModal
              title="All States"
              data={allstates}
              name="name"
              SelectedItem={data => getCityByStates(data)}
              Close={() => setstatesModal(false)}
            />
          </Modal>
          <Modal
            visible={cityModal}
            animationType="slide"
            onRequestClose={() => setcityModal(false)}>
            <CountryCityModal
              title="All City"
              data={allcity}
              name="name"
              SelectedItem={data => {
                setcity(data);
                setcityModal(false);
              }}
              Close={() => setcityModal(false)}
            />
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </CustomImageBackground>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  heading: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(13),
    marginVertical: 15,
  },
  img: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    borderWidth: 3,
    borderColor: COLORS.theme,
    overflow: 'hidden',
  },
  camera: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -10,
  },
  dob: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    color: COLORS.white,
  },
});
