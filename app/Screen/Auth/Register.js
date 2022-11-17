import {Icon} from 'native-base';
import React, {useEffect} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import GradientButton from '../../Component/Button/GradientButton';
import GlobalStyles from '../../Component/GlobalStyle';
import ImageWithTitle from '../../Component/Header/ImageWithTitle';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import Picker from '../../Component/DropDownPicker/Picker';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import CountryCityModal from '../../Component/Modal/CountryCityModal';
import {ETHNCITY_TYPE, GENDER} from '../../Constant/DATA';
import Auth from '../../Service/Auth';

const datet = new Date();

const year = datet.getFullYear();
const month = datet.getMonth();
const day = datet.getDate();

export default function Register() {
  const [dateModal, setdateModal] = React.useState(false);
  const [gender, setgender] = React.useState('');
  const [firstname, setfirstname] = React.useState('');
  const [lastname, setlastname] = React.useState('');
  const [zip, setzip] = React.useState('');
  const [email, setemail] = React.useState('');
  const [ethncity, setethncity] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [dob, setdob] = React.useState('DOB');

  const [city, setcity] = React.useState({});
  const [allcity, setallcity] = React.useState([]);
  const [states, setstates] = React.useState({});
  const [allstates, setallstates] = React.useState([]);
  const [statesModal, setstatesModal] = React.useState(false);
  const [cityModal, setcityModal] = React.useState(false);

  useEffect(() => {
    getAllStates();
    return () => null;
  }, []);

  const getAllStates = async () => {
    let result = await Auth.getStates();
    //  console.log("states",result);
    if (result && result.success) {
      setallstates(result.data);
    }
  };

  const getCityByStates = async data => {
    setstates(data);
    setcity({});
    setstatesModal(false);
    let result = await Auth.getCity(data.id);
    console.log('result=>>', result);
    if (result && result.success) {
      setallcity(result.data);
    }
  };

  const onChange = selectedDate => {
    const currentDate = selectedDate || date;
    setdateModal(false);
    setDate(currentDate);
    setdob(moment(currentDate).format('L'));
  };

  const registerUser = () => {
    if (
      zip == '' ||
      firstname == '' ||
      lastname == '' ||
      gender == '' ||
      Object.keys(city).length == 0 ||
      dob == 'DOB' ||
      ethncity == '' ||
      Object.keys(states).length == 0
    ) {
      Toast.show('Please fill out all fields!');
      return;
    }

    // let pattern =
    //   /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    // let emailresult = pattern.test(email);

    // if (emailresult !== true) {
    //   Toast.show('Invalid Email Id!', Toast.SHORT);
    //   return false;
    // }

    let data = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      zipcode: Number(zip),
      ethncity: ethncity,
      state: states?.id,
      city: city?.id,
    };

    console.log('data', data);
    // return;

    Navigation.navigate('Password', {data});
  };

  return (
    <CustomImageBackground>
      <TouchableOpacity
        onPress={() => Navigation.back()}
        style={{marginTop: moderateScale(45), marginLeft: moderateScale(15)}}>
        <Icon
          name="keyboard-arrow-left"
          type="MaterialIcons"
          style={{color: COLORS.white, fontSize: moderateScale(30)}}
        />
      </TouchableOpacity>
      <ScrollView
        style={{marginHorizontal: 30}}
        showsVerticalScrollIndicator={false}>
        <ImageWithTitle title="Create Account" />

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

        <Picker
          data={GENDER.filter(i => i.value !== 'All')}
          label="label"
          value="value"
          onSelect={(val, item) => setgender(val)}
          placeholder="Gender"
          selectedValue={gender}
        />
        <TouchableOpacity
          onPress={() => setdateModal(true)}
          style={[GlobalStyles.textInputView, {paddingHorizontal: 20}]}>
          <Text style={styles.dob}>{dob}</Text>
          <Icon
            name="calendar"
            type="Ionicons"
            style={{color: COLORS.white, fontSize: moderateScale(20)}}
          />
        </TouchableOpacity>
        {/* {dateModal && (
          <DateTimePicker
            // testID="dateTimePicker"
            value={date}
            mode="date"
            minimumDate={new Date('1947-01-01')}
            maximumDate={new Date(year - 21, month, day)}
            // is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )} */}

        <DateTimePickerModal
          isVisible={dateModal}
          mode="date"
          minimumDate={new Date('1947-01-01')}
          maximumDate={new Date(year - 21, month, day)}
          onConfirm={onChange}
          onCancel={() => setdateModal(false)}
        />

        <Picker
          data={ETHNCITY_TYPE}
          label="label"
          value="value"
          onSelect={(val, item) => setethncity(val)}
          placeholder="Ethncity"
          selectedValue={ethncity}
        />
        <TextInput
          placeholder="Zip Code"
          placeholderTextColor={COLORS.white}
          style={GlobalStyles.textInput}
          keyboardType="number-pad"
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

        <GradientButton
          title="Next"
          onPress={registerUser}
          // onPress={() => Navigation.navigate('Password',{data:null})}
        />

        {/* <SocialLogin /> */}

        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.Regular,
            fontSize: 13,
            marginVertical: moderateScale(15),
            textAlign: 'center',
          }}>
          Already have an account?{' '}
          <Text
            onPress={() => Navigation.navigate('Login')}
            style={{fontFamily: FONTS.title, textDecorationLine: 'underline'}}>
            Sign In
          </Text>
        </Text>
      </ScrollView>
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
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({
  picker: {
    color: COLORS.white,
    width: '100%',
  },
  pickerItem: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(13),
  },
  dob: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    color: COLORS.white,
  },
});
