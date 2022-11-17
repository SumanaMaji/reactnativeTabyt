import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Switch} from 'react-native-elements';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import RadioWithTitle from '../../Component/RadioWithTitle';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Auth from '../../Service/Auth';
import Navigation from '../../Service/Navigation';

const Settings = () => {
  const [notification, setnotification] = useState(false);
  const [guestVisibility, setguestVisibility] = useState('');
  const [reviewVisibility, setreviewVisibility] = useState('');
  const [ageVisibility, setageVisibility] = useState('');
  const [genderVisibility, setgenderVisibility] = useState('');
  const [notFirstRender, setnotFirstRender] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await Auth.getAccount();
    console.log('userDta', user);
    setnotification(user?.visibility?.notification);
    setguestVisibility(user?.visibility?.guestVisibility);
    setreviewVisibility(user?.visibility?.reviewVisibility);
    setageVisibility(user?.visibility?.ageVisibility);
    setgenderVisibility(user?.visibility?.genderVisibility);
    setTimeout(() => {
      setnotFirstRender(true);
    }, 1000);
  };

  const updateSettings = async () => {
    let data = {
      visibility: {
        notification,
        guestVisibility,
        reviewVisibility,
        ageVisibility,
        genderVisibility,
      },
    };
    console.log('data=>>', data);
    const result = await Auth.updateprofile(data);
    console.log('update Settinga', result);
    if (result && result.status) {
      await Auth.setAccount(result.data);
    }
  };

  useEffect(() => {
    if (notFirstRender) {
      updateSettings();
    }
  }, [
    guestVisibility,
    notification,
    reviewVisibility,
    ageVisibility,
    genderVisibility,
  ]);

  return (
    <CustomImageBackground>
      <BackCross title="Settings" icon={false} />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 30,
          marginTop: 15,
          paddingBottom: 50,
        }}>
        <View style={styles.list}>
          <Text style={styles.title}>Notifications</Text>
          <Switch
            value={notification}
            onValueChange={value => {
              setnotification(value);
            }}
            color={COLORS.theme}
            thumbColor={COLORS.white}
          />
        </View>

        <Text style={styles.title}>Privacy Settings</Text>

        <Text style={styles.subtitle}>Guestlist Visibility</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <RadioWithTitle
            title="Everyone"
            value={guestVisibility}
            onPress={val => {
              console.log('vall=>', val);
              setguestVisibility(val);
            }}
          />
          <RadioWithTitle
            title="Followers Only"
            value={guestVisibility}
            onPress={val => {
              setguestVisibility(val);
            }}
          />
          <RadioWithTitle
            title="No One"
            value={guestVisibility}
            onPress={val => {
              setguestVisibility(val);
            }}
          />
        </View>

        <Text style={styles.subtitle}>Reviews Visibility</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <RadioWithTitle
            title="Everyone"
            value={reviewVisibility}
            onPress={val => {
              setreviewVisibility(val);
            }}
          />
          <RadioWithTitle
            title="Followers Only"
            value={reviewVisibility}
            onPress={val => {
              setreviewVisibility(val);
            }}
          />
          <RadioWithTitle
            title="No One"
            value={reviewVisibility}
            onPress={val => {
              setreviewVisibility(val);
            }}
          />
        </View>

        <Text style={styles.subtitle}>Age</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <RadioWithTitle
            title="Everyone"
            value={ageVisibility}
            onPress={val => {
              setageVisibility(val);
            }}
          />
          <RadioWithTitle
            title="Followers Only"
            value={ageVisibility}
            onPress={val => {
              setageVisibility(val);
            }}
          />
          <RadioWithTitle
            title="No One"
            value={ageVisibility}
            onPress={val => {
              setageVisibility(val);
            }}
          />
        </View>

        <Text style={styles.subtitle}>Gender</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <RadioWithTitle
            title="Everyone"
            value={genderVisibility}
            onPress={val => {
              setgenderVisibility(val);
            }}
          />
          <RadioWithTitle
            title="Followers Only"
            value={genderVisibility}
            onPress={val => {
              setgenderVisibility(val);
            }}
          />
          <RadioWithTitle
            title="No One"
            value={genderVisibility}
            onPress={val => {
              setgenderVisibility(val);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.chngPassRow}
          onPress={() => Navigation.navigate('ChangePassword')}>
          <Text style={{...styles.title, color: COLORS.cream}}>
            Change Password
          </Text>
          <Icon
            name="ios-arrow-forward-sharp"
            type="ionicon"
            color={COLORS.cream}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', marginTop: 20}}>
          <Icon name="circle-with-cross" type="entypo" color={'red'} />
          <Text style={{...styles.title, color: 'red', marginLeft: 15}}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </CustomImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 0.4,
    paddingBottom: 13,
    borderColor: COLORS.lightgray,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
  subtitle: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    opacity: 0.7,
    marginTop: 15,
    marginBottom: 7,
  },
  but: {
    borderWidth: 1,
    borderColor: COLORS.theme,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    marginVertical: 7,
  },
  butTxt: {
    color: COLORS.theme,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(10),
  },
  chngPassRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: COLORS.cream,
    marginTop: 10,
  },
});
