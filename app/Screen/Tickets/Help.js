import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GradientButton from '../../Component/Button/GradientButton';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';

const Help = () => {
  const [helpList, sethelpList] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getHelpData();
  }, []);

  const getHelpData = async () => {
    const result = await Event.getHelp();
    console.log('helpList result', result);
    if (result && result.status) {
      sethelpList(result.data);
    }
    setisFetching(false);
  };

  const showThis = (it, index) => {
    let dd = helpList;
    let index2 = dd.findIndex(it => it.selected == true);
    if (index2 >= 0) {
      dd[index2].selected = false;
    }
    dd[index].selected = !dd[index].selected;
    sethelpList(dd);
    setrefresh(!refresh);
  };

  return (
    <CustomImageBackground>
      <BackCross title="Help" icon={false} />
      {isFetching ? (
        <Loader />
      ) : (
        <ScrollView>
          <View
            style={{
              justifyContent: 'space-evenly',
              width: '100%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            {helpList.map((it, key) => (
              <View style={styles.mainView} key={key}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <Text
                    style={[styles.title, {opacity: it.selected ? 1 : 0.8}]}>
                    {it.titel}
                  </Text>
                  <TouchableOpacity
                    onPress={() => showThis(it, key)}
                    style={styles.plusButton}>
                    <Icon
                      name={!it.selected ? 'plus' : 'minus'}
                      type="AntDesign"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {it.selected ? (
                  <Text style={styles.subtitle}>{it.description}</Text>
                ) : null}
              </View>
            ))}
            <GradientButton
              onPress={() => Navigation.navigate('ContactUs')}
              title="Contact Us"
              style={{width: '85%', alignSelf: 'center', marginVertical: 20}}
            />
          </View>
        </ScrollView>
      )}
    </CustomImageBackground>
  );
};

export default Help;

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    // marginTop:20,
    // paddingVertical: verticalScale(20),
    borderBottomWidth: 0.2,
    borderColor: COLORS.textInput,
    paddingHorizontal: moderateScale(35),
    paddingBottom: 15,
    // paddingTop:15,
    // marginBottom:25,
    // flexDirection:'row',
    // justifyContent:'space-between',
    alignItems: 'flex-start',
    // marginVertical:20
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(14),
  },
  subtitle: {
    color: COLORS.lightgray,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    width: '85%',
    // marginBottom:15
    // opacity:.7
  },
  icon: {
    color: COLORS.white,
    fontSize: moderateScale(20),
  },
});
