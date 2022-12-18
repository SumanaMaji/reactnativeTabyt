import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import HomeSearch from '../../Component/Search/HomeSearch';
import TicketsList from '../../Component/Tickets/TicketsList';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Helper from '../../Service/Helper';

const MyEventList = () => {
  const isFocused = useIsFocused();
  const [active, setactive] = useState(0);
  const [allEvent, setallEvent] = useState([]);
  const [completeEvent, setcompleteEvent] = useState([]);
  const [canceledEvent, setcanceledEvent] = useState([]);

  useEffect(() => {
    getMYEvent();
  }, [isFocused]);

  const getMYEvent = async () => {
    const result = await Event.myEvent();
    console.log('result=>>', JSON.stringify(result));
    if (result && result?.status) {
      setallEvent(result.data);
      setcompleteEvent(
        result.data.filter(
          it =>
            Helper.eventCompleteCheck(
              it?.eventsData?.endDate,
              it?.eventsData?.endTime,
              it?.eventsData?.timeZone,
            ) && it.bookingStatus === 'complete',
        ),
      );
      setcanceledEvent(result.data.filter(it => it.bookingStatus == 'cancel'));
    }
  };

  return (
    <CustomImageBackground>
      <BackCross title="My Event" icon={false} />
      <View style={{marginHorizontal: moderateScale(30)}}>
        <HomeSearch />
      </View>

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
              COMPLETE
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
              CANCELLED
            </Text>
          </Pressable>
        </View>

        {active == 0 ? (
          <TicketsList click={true} live={true} cancel={true} data={allEvent} />
        ) : null}
        {active == 1 ? (
          <TicketsList click={true} live={true} data={completeEvent} />
        ) : null}
        {active == 2 ? (
          <TicketsList
            click={true}
            live={false}
            cancel={true}
            data={canceledEvent}
          />
        ) : null}
      </View>

      {/* <TicketsList /> */}
    </CustomImageBackground>
  );
};

export default MyEventList;

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
