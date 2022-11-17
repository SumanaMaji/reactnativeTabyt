import {Icon, Radio} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import GlobalStyles from '../GlobalStyle';

export default function SurveyModal(props) {
  const {bookingId} = props;
  const [option, setoption] = useState('');

  const submitForCancel = async () => {
    if (!option) {
      SimpleToast.show('Please select an option!');
      return;
    }
    const result = await Event.cancelBooking({
      bookingId: bookingId,
      reason: option,
    });
    if (result && result.status) {
      SimpleToast.show('Reservation canceled successfully!');
    } else {
      SimpleToast.show('Something wrong, try after sometimes!');
    }
    props.close();
  };
  return (
    <View style={GlobalStyles.modalMainView}>
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.modalHeader}>
          <Text style={GlobalStyles.modalTitle}>Survey</Text>
          <TouchableOpacity onPress={() => props.close()}>
            <Icon name="cross" type="Entypo" />
          </TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <Radio
            color={COLORS.theme}
            onPress={() => setoption('Unable to attened')}
            selected={option == 'Unable to attened'}
            selectedColor={COLORS.theme}
          />
          <Text style={styles.txt}>Unable to attened</Text>
        </View>
        <View style={styles.listView}>
          <Radio
            color={COLORS.theme}
            onPress={() => setoption('Wrong Event or Venue')}
            selected={option == 'Wrong Event or Venue'}
            selectedColor={COLORS.theme}
          />
          <Text style={styles.txt}>Wrong Event or Venue</Text>
        </View>
        <View style={styles.listView}>
          <Radio
            color={COLORS.theme}
            onPress={() => setoption('Trouble at Check in')}
            selected={option == 'Trouble at Check in'}
            selectedColor={COLORS.theme}
          />
          <Text style={styles.txt}>Trouble at Check in</Text>
        </View>
        <View style={styles.listView}>
          <Radio
            color={COLORS.theme}
            onPress={() => setoption('Other')}
            selected={option == 'Other'}
            selectedColor={COLORS.theme}
          />
          <Text style={styles.txt}>Other</Text>
        </View>

        <TouchableOpacity
          onPress={submitForCancel}
          // onPress={() => {
          //   props.close();
          //   // Navigation.navigate('CheckoutReservation');
          // }}
          style={{...GlobalStyles.modalBut, marginTop: 10}}>
          <Text style={GlobalStyles.modalButTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listView: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  txt: {
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(12),
    color: COLORS.textInput,
    marginLeft: 5,
  },
});
