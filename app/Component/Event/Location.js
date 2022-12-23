import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Navigation from '../../Service/Navigation';
import {Icon} from 'native-base';
import {moderateScale} from '../../PixelRatio';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';

const Location = ({address, stateData, cityData}) => {
  const goToMapView = () => {
    Navigation.navigate('LocationView', {
      coordinate: {
        lat: Number(cityData?.latitude),
        long: Number(cityData?.longitude),
      },
      address: `${address + ', ' + cityData?.name + ', ' + stateData?.name}`,
    });
  };

  return (
    <View style={styles.addressContainer}>
      <Pressable
        onPress={() => goToMapView()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
        }}>
        <Icon
          name="md-location-sharp"
          type="Ionicons"
          style={styles.locationIcon}
        />
        <Text style={styles.addressTxt} numberOfLines={1}>
          {address}, {cityData?.name}, {stateData?.name}
        </Text>
      </Pressable>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  addressTxt: {
    color: COLORS.button,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
    width: '100%',
    textTransform: 'capitalize',
  },
  locationIcon: {
    color: COLORS.button,
    fontSize: moderateScale(18),
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
});
