import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import GradientButton from '../../Component/Button/GradientButton';
import ReservationHeader from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import JoinList from './JoinList';
import Reservations from './Reservations';
import Tickets from './Tickets';

const MakeReservation = props => {
  const {eventData, eId} = props.route.params;
  const {userData} = useSelector(state => state.User);
  console.log('userData=>>', userData);
  const [active, setactive] = useState(0);
  const [currentSelection, setcurrentSelection] = useState('');
  const [selectedItem, setselectedItem] = useState([]);
  const [allTickets, setallTickets] = useState([]);

  // console.log('eventData?.tickets=>', eventData?.tickets);

  useEffect(() => {
    setcurrentSelection('');
    setselectedItem([]);
    setallTickets(
      eventData?.tickets.filter(
        i => i.gender == userData.gender || i.gender == 'All',
      ),
    );
  }, [eventData?.tickets]);

  const continueToCheckout = async () => {
    if (selectedItem.length === 0) {
      SimpleToast.show('Select an item to continue!');
      return;
    }
    Navigation.navigate('Checkout2', {
      currentSelection,
      selectedItem,
      eventData,
    });
  };

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Make Reservation"
        back={() => Navigation.back()}
      />

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
              TICKETS
            </Text>
          </Pressable>
          {/* <Pressable
            onPress={() => setactive(1)}
            style={[
              styles.titleView,
              {borderColor: active == 1 ? COLORS.white : COLORS.theme},
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              JOIN LIST
            </Text>
          </Pressable> */}
          <Pressable
            onPress={() => setactive(2)}
            style={[
              styles.titleView,
              {
                // width: '40%',
                borderColor: active == 2 ? COLORS.white : COLORS.theme,
              },
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              RESERVATIONS
            </Text>
          </Pressable>
        </View>

        {active == 0 ? (
          <Tickets
            // data={eventData?.tickets}
            // data={eventData?.tickets.filter(
            //   i => i.gender == userData.gender || i.gender == 'All',
            // )}
            eventData={eventData}
            data={allTickets}
            currentSelection={currentSelection}
            selectedCallback={data => {
              setselectedItem(data);
              setcurrentSelection(data.length > 0 ? 'ticket' : '');
            }}
          />
        ) : null}
        {active == 1 ? <JoinList /> : null}
        {active == 2 ? (
          <Reservations
            data={eventData?.tablelistsData}
            currentSelection={currentSelection}
            selectedCallback={data => {
              setselectedItem(data);
              setcurrentSelection(data.length > 0 ? 'reservation' : '');
            }}
          />
        ) : null}

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            width: '85%',
          }}>
          <GradientButton
            title="Checkout"
            onPress={continueToCheckout}
            // onPress={() => Navigation.navigate('Checkout2')}
          />
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default MakeReservation;

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
    fontSize: moderateScale(13.5),
  },
});
