import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Navigation from '../../Service/Navigation';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import GradientButton from '../../Component/Button/GradientButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../Component/GlobalStyle';

const LIST = [
  {
    name: 'Lorem Ipsum',
    count: 1,
    price: 10,
    selected: false,
  },
  {
    name: 'Lorem Ipsum 2',
    count: 1,
    price: 15,
    selected: false,
  },
  {
    name: 'Another Ticket',
    count: 1,
    price: 20,
    selected: false,
  },
  {
    name: 'Ticket',
    count: 1,
    price: 50,
    selected: false,
  },
  {
    name: 'Ticket 2',
    count: 1,
    price: 35,
    selected: false,
  },
];

const MenuBooking = props => {
  // const {currentSelection} = props;
  // const [ticketsList, setticketsList] = useState(props.data);
  const [refresh, setrefresh] = useState(false);
  const {eventData, eId, bId, menuData} = props.route.params;
  console.log('menuData=>>', JSON.stringify(menuData));
  const [allmenuData, setallmenuData] = useState(menuData);
  const [allmenuDataBackup, setallmenuDataBackup] = useState(menuData);
  const [searchData, setsearchData] = useState('');

  useEffect(() => {
    if (Object.keys(menuData).length > 0) {
      setallmenuData(
        menuData?.category.map(item => {
          item?.catItem.map(i => {
            i.count = 0;
            i.totalPrice = i.itemPrice;
            return i;
          });
          return item;
        }),
      );
      setallmenuDataBackup(
        menuData?.category.map(item => {
          item?.catItem.map(i => {
            i.count = 0;
            i.totalPrice = i.itemPrice;
            return i;
          });
          return item;
        }),
      );
    }
  }, [menuData]);

  const selectedIndex = (item, index) => {
    if (currentSelection !== '' && currentSelection !== 'ticket') {
      SimpleToast.show('Already selected other options!');
      return;
    }
    let data = ticketsList;
    data[index].selected = !data[index].selected;
    setticketsList(state => data);
    setrefresh(!refresh);
    props.selectedCallback(ticketsList.filter(it => it.selected === true));
  };

  const IncreaseCount = (count, key, index) => {
    let data = allmenuData;
    console.log('=allmenuData', allmenuData);
    data[key].catItem[index].count = Number(data[key].catItem[index].count) + 1;
    data[key].catItem[index].totalPrice = Number(
      data[key].catItem[index].count * data[key].catItem[index].itemPrice,
    );

    setallmenuData(data);
    setrefresh(!refresh);
    // props.selectedCallback(ticketsList.filter(it => it.selected === true));
  };

  const showMenu = key => {
    let data = allmenuData;
    data[key].show = !data[key].show;
    setallmenuData(data);
    setrefresh(!refresh);
  };

  const DecreaseCount = (count, key, index) => {
    if (count > 0) {
      let data = allmenuData;
      console.log('=allmenuData', allmenuData);
      data[key].catItem[index].count =
        Number(data[key].catItem[index].count) - 1;
      if (data[key].catItem[index].count > 0) {
        data[key].catItem[index].totalPrice = Number(
          data[key].catItem[index].count * data[key].catItem[index].itemPrice,
        );
      }
      setallmenuData(data);
      setrefresh(!refresh);
    }
  };

  const gotToCheckout = () => {
    // let data = menuData?.category;
    // const selectedItem = data.map(i => {
    //   let dd = i;
    //   let remove = i.catItem.filter(it => it.count > 0);
    //   dd.catItem = remove;
    //   return dd;
    // });

    // const selectedItem = menuData.map(i => i);

    // const subTotal = menuData?.category.map(i =>
    //   i.catItem.reduce((accumulator, object) => {
    //     return Number(accumulator + object.count);
    //   }, 0),
    // )[0];
    // const check = menuData?.category.filter(i => i.)

    // console.log('selectedItem=>>>', subTotal);
    // return;
    Navigation.navigate('MenuCheckout', {
      eventData,
      eId,
      bId,
      menuData,
    });
  };

  const searchMenu = val => {
    const filteredData = allmenuDataBackup
      .map(ele => ({
        ...ele,
        catItem: ele?.catItem.filter(({menuItem}) =>
          new RegExp(val.toLowerCase()).test(menuItem.toLowerCase()),
        ),
      }))
      .filter(({catItem}) => catItem.length > 0);
    let result = allmenuDataBackup.filter(it =>
      new RegExp(val.toLowerCase()).test(it?.categoryName.toLowerCase()),
    );
    setallmenuData(
      filteredData && filteredData.length > 0 ? filteredData : result,
    );
    setsearchData(val);
  };

  return (
    <CustomImageBackground>
      <BackCross title="Menu" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <View
            style={[
              GlobalStyles.textInputView,
              {
                width: '80%',
                borderRadius: 20,
                height: verticalScale(45),
                backgroundColor: '#406265',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 17,
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
              placeholder="Search Events"
              placeholderTextColor={COLORS.white}
              value={searchData}
              onChangeText={val => searchMenu(val)}
            />
          </View>
          {allmenuData.length > 0 &&
            allmenuData.map((item, key) => {
              return (
                <View key={key}>
                  <Pressable
                    onPress={() => showMenu(key)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 15,
                      paddingHorizontal: 20,
                      paddingBottom: 5,
                    }}>
                    <Text style={{...styles.name, fontSize: 17}}>
                      {item.categoryName}
                    </Text>
                    <Icon
                      name={
                        item.show ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                      }
                      type="MaterialIcons"
                      style={{color: COLORS.white}}
                    />
                  </Pressable>
                  {item.show &&
                    item?.catItem.map((i, index) => (
                      <View
                        key={index}
                        style={{
                          paddingVertical: moderateScale(15),
                          borderBottomWidth: 0.7,
                          borderColor: COLORS.textInput,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 35,
                        }}>
                        <View>
                          <Text style={[styles.name]}>{i.menuItem}</Text>
                          <Text style={[styles.price]}>
                            Price:{' '}
                            <Text style={{color: COLORS.white}}>
                              ${i.totalPrice}
                            </Text>
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 6}}>
                          <TouchableOpacity
                            onPress={() => DecreaseCount(i.count, key, index)}
                            style={[styles.counterBox]}>
                            <Text style={styles.counterTxt}>-</Text>
                          </TouchableOpacity>
                          <View
                            style={[
                              styles.counterBox,
                              {
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderWidth: 0,
                                width: moderateScale(35),
                                marginHorizontal: 0,
                              },
                            ]}>
                            <Text
                              style={[
                                styles.counterTxt,
                                {color: COLORS.white},
                              ]}>
                              {i.count}
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() => IncreaseCount(i.count, key, index)}
                            style={[styles.counterBox]}>
                            <Text style={styles.counterTxt}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                </View>
              );
            })}
        </View>
        <GradientButton
          title="Next"
          style={{width: '85%', alignSelf: 'center', marginVertical: 20}}
          // onPress={registerUser}
          onPress={gotToCheckout}
        />
      </KeyboardAwareScrollView>
    </CustomImageBackground>
  );
};

export default MenuBooking;

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '30%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    // marginLeft: 10,
    fontSize: moderateScale(14),
  },
  price: {
    color: '#ccc',
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12.5),
  },
  time: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    marginLeft: 10,
    fontSize: moderateScale(12.5),
    opacity: 0.7,
  },
  counterBox: {
    width: moderateScale(33),
    height: verticalScale(28),
    borderWidth: 1,
    borderColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  counterTxt: {color: COLORS.theme, fontFamily: FONTS.SemiBold},
});
