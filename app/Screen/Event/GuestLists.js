import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
// import TicketsList from '../../Component/Tickets/TicketsList';
import BackCross from '../../Component/Header/BackCross';
// import FullSearch from '../../Component/Search/FullSearch';
import UserList from '../../Component/MyAccount/UserList';
import Event from '../../Service/Event';
import {useSelector} from 'react-redux';

const GuestLists = props => {
  const {eId} = props.route.params;
  const {userData} = useSelector(state => state.User);
  const [active, setactive] = useState(0);
  const [eventGuest, seteventGuest] = useState([]);
  const [eventMyGuest, seteventMyGuest] = useState([]);

  useEffect(() => {
    getUsers();
    getMyUsers();
  }, [eId]);

  const getUsers = async () => {
    const result = await Event.getEventUser(eId);
    console.log('event guest', result);
    if (result && result.status) {
      seteventGuest(result?.data);
    }
  };

  const getMyUsers = async () => {
    const result = await Event.getEventMyUser(eId);
    console.log('event guest', result);
    if (result && result.status) {
      seteventMyGuest(result?.data);
      seteventMyGuest(state => [...state, userData]);
    }
  };

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
            <Text numberOfLines={1} style={styles.title}>
              ALL GUESTS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(1)}
            style={[
              styles.titleView,
              {borderColor: active == 1 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              MY GUESTS
            </Text>
          </Pressable>
        </View>

        {active == 0 ? (
          <UserList
            data={eventGuest}
            showPlus={false}
            showBottom={false}
            disableLive={true}
            event={true}
          />
        ) : null}
        {active == 1 ? (
          <UserList
            data={eventMyGuest}
            showPlus={false}
            showBottom={false}
            disableLive={true}
            event={true}
          />
        ) : null}
      </View>

      {/* <TicketsList /> */}
    </CustomImageBackground>
  );
};

export default GuestLists;

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
