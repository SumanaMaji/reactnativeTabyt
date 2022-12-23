import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import {Icon} from 'native-base';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

const LocationView = props => {
  const {coordinate, address} = props.route.params;
  return (
    <CustomImageBackground>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => Navigation.back()}
          style={{
            position: 'absolute',
            top: 40,
            left: 10,
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center',
            width: moderateScale(35),
            height: moderateScale(35),
            borderRadius: moderateScale(18),
            backgroundColor: COLORS.liteBlack,
          }}>
          <Icon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            style={{color: COLORS.white}}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: coordinate.lat,
              longitude: coordinate.long,
              latitudeDelta: 2.515,
              longitudeDelta: 4.0121,
            }}>
            <Marker
              coordinate={{
                latitude: coordinate.lat,
                longitude: coordinate.long,
              }}
            />
          </MapView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: verticalScale(60),
            paddingLeft: 15,
            maxWidth: '90%',
          }}>
          <Icon
            name="md-location-sharp"
            type="Ionicons"
            style={{color: COLORS.button, fontSize: moderateScale(18)}}
          />
          <Text
            style={{
              color: COLORS.button,
              fontFamily: FONTS.Medium,
              fontSize: moderateScale(13),
              marginLeft: 5,
            }}
            numberOfLines={2}>
            {address}
          </Text>
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default LocationView;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
