import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import TicketsList from '../../Component/Tickets/TicketsList';
import BackCross from '../../Component/Header/BackCross';
import FullSearch from '../../Component/Search/FullSearch';
import UserList from '../../Component/MyAccount/UserList';

const TicketGuestLists = () => {
  const [active, setactive] = useState(0);

  return (
    <CustomImageBackground>
      <BackCross title="Guest Lists" icon={false} />

      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '85%',
            alignSelf: 'center',
          }}>
          <Pressable
            onPress={() => setactive(0)}
            style={[
              styles.titleView,
              {borderColor: active == 0 ? COLORS.white : COLORS.theme},
            ]}>
            <Text
              numberOfLines={1}
              style={[styles.title, {opacity: active == 0 ? 1 : 0.7}]}>
              ALL GUESTS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(1)}
            style={[
              styles.titleView,
              {borderColor: active == 1 ? COLORS.white : COLORS.theme},
            ]}>
            <Text
              numberOfLines={1}
              style={[styles.title, {opacity: active == 1 ? 1 : 0.7}]}>
              MY GUESTS
            </Text>
          </Pressable>
        </View>

        {active == 0 ? (
          <UserList
            showPlus={false}
            showBottom={false}
            disableLive={true}
            event={false}
          />
        ) : null}
        {active == 1 ? (
          <UserList
            showPlus={true}
            showBottom={false}
            disableLive={true}
            event={false}
          />
        ) : null}
      </View>

      {/* <TicketsList /> */}
    </CustomImageBackground>
  );
};

export default TicketGuestLists;

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '50%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
});
