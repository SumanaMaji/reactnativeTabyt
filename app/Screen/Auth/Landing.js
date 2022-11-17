import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import { COLORS } from '../../Constant/Colors';
import { FONTS } from '../../Constant/Font';
import { moderateScale } from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

const { width, height } = Dimensions.get('window');

const DATA = [
    {
        "title" : "Mark quick reservations",
        "subtitle" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
        "title" : "What is Lorem Ipsum?",
        "subtitle" : "Lorem Ipsum is simply dummy text of the printing"
    },
    {
        "title" : "Where does it come from?",
        "subtitle" : "Contrary to popular belief, Lorem Ipsum is not simply random text."
    }
]

export default function Landing() {

  React.useEffect(() => {
    setTimeout(() => {
      // Navigation.navigate('PhoneNumber')
    }, 5000);
    return () => null;
  }, [])

  return (
   <CustomImageBackground>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Image 
       style={{width: width/1.5,resizeMode:'contain'}}
       source={require('../../assets/logo.png')}
       />
       <View style={{height:150,width:'100%'}}>
        <Swiper 
        style={styles.wrapper} 
        showsButtons={false}
        dotColor={COLORS.textInput}
        activeDotColor={COLORS.button}
        >
           {
               DATA.map((it,key)=>
                <View style={styles.slide} key={key}>
                     <Text style={styles.text}>{it.title}</Text>
                     <Text style={styles.subtext}>{it.subtitle}</Text>
                </View>
               )
           }
        </Swiper>
       </View>
     </View>
     </CustomImageBackground> 
  );
}

const styles = StyleSheet.create({
    wrapper: {
        // width:'100%',
        // height:height/2
    },
    slide: {
    //   width:'100%',
    //     height:height/2,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal:15
    //   backgroundColor: '#9DD6EB'
    },
    text: {
      color: '#fff',
      fontSize: moderateScale(17),
      fontFamily:FONTS.title,
      textTransform:'uppercase',
      textAlign:'center'
    },
    subtext: {
        color: '#fff',
        fontSize: moderateScale(13),
        fontFamily:FONTS.Regular,
        textAlign:'center'
      }
  })
