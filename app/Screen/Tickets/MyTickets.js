import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import HomeHeader from '../../Component/Header/HomeHeader';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import HomeSearch from '../../Component/Search/HomeSearch';
import TicketsList from '../../Component/Tickets/TicketsList';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';

const MyTickets = () => {
  const isFocused = useIsFocused();
  const [active, setactive] = useState(0);
  const [allEvent, setallEvent] = useState([]);
  const [allLiveEvent, setallLiveEvent] = useState([]);
  const [pendingEvent, setpendingEvent] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [isFetching, setisFetching] = useState(true);

  useEffect(() => {
    getMYEvent();
  }, [isFocused]);

  const getMYEvent = async () => {
    setisFetching(true);
    setallEvent([]);
    setallLiveEvent([]);
    setpendingEvent([]);
    const result = await Event.myEvent();
    console.log('myEvent result=>>', JSON.stringify(result));
    if (result && result?.status) {
      setallEvent(
        result.data.map(i => {
          let dateFrom = moment(i?.eventsData?.startDate).format('L');
          let dateTo = moment(i?.eventsData?.endDate).format('L');
          let dateCheck = moment(new Date()).format('L');
          if (dateCheck <= dateFrom) {
            i.showAll = true;
          } else if (dateCheck >= dateFrom && dateCheck <= dateTo) {
            i.showAll = true;
          } else if (i.bookingStatus == 'pending') {
            i.showAll = true;
          } else {
            i.showAll = true;
          }
          return i;
        }),
      );
      // setcompleteEvent(
      //   result.data.filter(it => it.bookingStatus == 'complete'),
      // );
      result.data.forEach(element => {
        let dateFrom = moment(element?.eventsData?.startDate).format('L');
        let dateTo = moment(element?.eventsData?.endDate).format('L');
        let dateCheck = moment(new Date()).format('L');
        if (
          dateCheck >= dateFrom &&
          dateCheck <= dateTo &&
          element.bookingStatus != 'pending'
        ) {
          setallLiveEvent(state => [...state, element]);
          // setallEvent(state => [...state, element]);
        }
      });
      setpendingEvent(result.data.filter(it => it.bookingStatus == 'pending'));
      // setallEvent(state => [
      //   ...result.data.filter(it => it.bookingStatus == 'pending'),
      // ]);
      setrefresh(!refresh);
      // console.log('allEventallEventallEventallEvent=>>', allEvent);
    }
    setisFetching(false);
  };

  // useEffect(() => {
  //   setallEvent(state => [...state, ...allLiveEvent]);
  // }, [allLiveEvent.length]);

  return (
    <CustomImageBackground>
      <HomeHeader title="My Tickets" />
      <View style={{marginHorizontal: moderateScale(30)}}>
        <HomeSearch />
      </View>
      {/* <View style={{flex:1}}>
            <CustomImageBackground>
                <Tab.Navigator 
                tabBarOptions={{
                    tabStyle:{backgroundColor:'transparent'}
                }}>
                    <Tab.Screen name="ALL" component={TicketsList} />
                    <Tab.Screen name="Live" component={TicketsList} />
                    <Tab.Screen name="Pending" component={TicketsList} />
                </Tab.Navigator>
            </CustomImageBackground>
            </View> */}
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
            alignSelf: 'center',
          }}>
          <Pressable
            onPress={() => setactive(0)}
            style={[
              styles.titleView,
              {borderColor: active == 0 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              ALL
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(1)}
            style={[
              styles.titleView,
              {borderColor: active == 1 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              LIVE
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setactive(2)}
            style={[
              styles.titleView,
              {
                width: '40%',
                borderColor: active == 2 ? COLORS.white : COLORS.theme,
              },
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              PENDING
            </Text>
          </Pressable>
        </View>

        {isFetching ? (
          <Loader />
        ) : (
          <>
            {active == 0 ? (
              <TicketsList
                click={true}
                live={true}
                ticket={true}
                data={[...allEvent.filter(i => i.showAll == true)]}
              />
            ) : null}
            {active == 1 ? (
              <TicketsList
                click={true}
                live={true}
                ticket={true}
                data={allLiveEvent}
              />
            ) : null}
            {active == 2 ? (
              <TicketsList
                click={true}
                live={false}
                ticket={true}
                data={pendingEvent}
              />
            ) : null}
          </>
        )}
      </View>

      {/* <TicketsList /> */}
    </CustomImageBackground>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  titleView: {
    borderBottomWidth: 2,
    borderColor: COLORS.theme,
    width: '30%',
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
