import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import { COLORS } from '../../Constant/Colors';
import { FONTS } from '../../Constant/Font';
import GlobalStyles from '../../Component/GlobalStyle';
import { moderateScale, verticalScale } from '../../PixelRatio';
import { Icon } from 'native-base';

const USERLIST = [
    {
        'image' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
        'name' : 'Robert',
        'edit' : true
    },
    {
        'image' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
        'name' : 'Robert Clay',
        'edit' : false
    },
    {
        'image' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU',
        'name' : 'John Alan',
        'edit' : true
    }
]

const Gift = (props) => {
    return (
        <CustomImageBackground>
            <ReservationHeader
                title="Send a Gift"
                back={()=>Navigation.back()}
            />

           <View style={{width:'85%',alignSelf:'center'}}>
             <Text style={{color:COLORS.white,fontFamily:FONTS.Medium,marginVertical:10,fontSize:moderateScale(13)}}>
               Choose Members And Add Menus
             </Text>
             <View style={[GlobalStyles.textInputView,
                {borderRadius:20,height:verticalScale(45),backgroundColor:'#406265',
                justifyContent:'flex-start',alignItems:'center',paddingLeft:17,
                width:'100%',alignSelf:"center"}]}>
                <Icon
                name="search"
                type="Ionicons"
                style={{color:COLORS.white,fontSize:moderateScale(17)}}
                />
                <TextInput
                    style={[GlobalStyles.textInput,{width:'85%',height:verticalScale(40),
                    borderRadius:20,paddingBottom:0,paddingLeft: 10,backgroundColor:'transparent'}]}
                    placeholder="Search"
                    placeholderTextColor={COLORS.white}
                />
            </View>
           </View>
           <ScrollView showsVerticalScrollIndicator={false}>
                
                {USERLIST.map((item,key)=> 
                       <View 
                       key={key}
                       style={{alignItems:'center',width:'100%',
                       paddingHorizontal:moderateScale(30),
                       paddingVertical:moderateScale(15),borderBottomWidth:.7,borderColor:COLORS.textInput}}>
                          <View 
                          style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image 
                                        source={{uri:item.image}}
                                        style={{width:moderateScale(30),height:moderateScale(30),borderRadius:moderateScale(20),marginRight:10}}
                                    />
                                    <Text style={{color:COLORS.white,fontFamily:FONTS.Regular,fontSize:moderateScale(12)}}>
                                        {item.name}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                style={{borderWidth:1,borderColor:COLORS.theme,paddingHorizontal:5,paddingVertical:2,borderRadius:5}}>
                                     <Text style={{color:COLORS.theme,fontFamily:FONTS.Regular,fontSize:moderateScale(9)}}>
                                     {item.edit? "EDIT MENU" : "ADD MENU" }</Text>
                                </TouchableOpacity>
                          </View>
                       {item.edit ?
                         <>
                           <View style={styles.listView}>
                                <Text style={styles.title}>
                                   Fruit Plater
                                </Text>
                                <Text style={styles.title}>
                                    $10
                                </Text>
                            </View>

                            <View style={styles.listView}>
                                <Text style={styles.title}>
                                   Vodka
                                </Text>
                                <Text style={styles.title}>
                                    $10
                                </Text>
                            </View>

                            <View style={styles.listView}>
                                <Text style={[styles.title,{fontFamily:FONTS.SemiBold}]}>
                                   Total
                                </Text>
                                <Text style={[styles.title,{fontFamily:FONTS.SemiBold}]}>
                                    $20
                                </Text>
                            </View>
                        </> : null }
                       </View>
                       )}
            </ScrollView>
        </CustomImageBackground>
    )
}

export default Gift

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:3,
        width:'75%'
      },
      title: {
        fontFamily: FONTS.Regular,
        color: COLORS.white,
        fontSize: moderateScale(12),
        opacity: 0.9,
      },
})