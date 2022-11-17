import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import { Icon } from 'native-base';
import { COLORS } from '../../Constant/Colors';
import { FONTS } from '../../Constant/Font';
import { moderateScale, verticalScale } from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

const LocationView = () => {
    return (
        <CustomImageBackground>
        <View style={{flex:1}}>
            <TouchableOpacity
            onPress={() => Navigation.back()}
            style={{position: 'absolute', top: 30, left: 10, zIndex: 99,justifyContent:'center',alignItems:'center',
            width:moderateScale(35),height:moderateScale(35),borderRadius:moderateScale(18),backgroundColor:COLORS.liteBlack}}>
            <Icon
                name="keyboard-arrow-left"
                type="MaterialIcons"
                style={{color: COLORS.white}}
            />
            </TouchableOpacity>
            <View style={{flex:1}}>
                <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 55.3781,
                    longitude: 3.4360,
                    latitudeDelta: 15.515,
                    longitudeDelta: 8.0121,
                }}
                >
                 <Marker coordinate={{latitude: 51.5074,longitude: 0.1278}} />
                </MapView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height:verticalScale(60),
                paddingLeft:15
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
                  marginLeft:5
                }}
                numberOfLines={1}>
                Lorem Ipsum is simply dummy text of the printing
              </Text>
            </View>
        </View>
      </CustomImageBackground>
    )
}

export default LocationView;

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });