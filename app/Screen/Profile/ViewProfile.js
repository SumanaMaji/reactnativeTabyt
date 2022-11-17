import { Icon } from 'native-base'
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground'
import { COLORS } from '../../Constant/Colors'
import { FONTS } from '../../Constant/Font'
import { moderateScale } from '../../PixelRatio'

const DATA = [
    {
        "title" : "Mark quick reservations",
        "date" : "May 21, 2021",
        "organized":'Rajib Sk',
        "attn" : "15",
        "live" : true,
        "address" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "image" : "https://assets.website-files.com/5ff4e43997c4ec6aa5d646d1/603d547ed5c5fd6365dabbef_industry%20expert%20roundup%20-%20why%20are%20events%20important.png"
    }
]

const DATA1 = [
    {
        "title" : "What is Lorem Ipsum?",
        "date" : "May 22, 2021",
        "organized":'Arindam Samanta',
        "attn" : "25",
        "live" : true,
        "address" : "Lorem Ipsum is simply dummy text of the printing",
        "image" : "https://www.livemorezone.com/wp-content/uploads/secret-events-delhi-livemorezone-dbs.jpg"
    },
    {
        "title" : "The standard Lorem Ipsum passage, used since the 1500s",
        "date" : "May 23, 2021",
        "organized":'Arpan Sarkar',
        "attn" : "23",
        "live" : true,
        "address" : "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        "image" : "https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-1critgpgg04atfhu32lg71hhs3-20160229231908.Medi.jpeg"
    }
]

const ViewProfile = () => {
    return (
       <CustomImageBackground>
             <View style={{justifyContent:'center',alignItems:'center',padding:35,borderBottomWidth:.2,
             borderColor:COLORS.textInput,paddingBottom:20}}>
                   <Image 
                     style={{width:moderateScale(95),height:moderateScale(95),borderRadius:moderateScale(50),
                     borderWidth:4,borderColor:COLORS.theme,marginBottom:5}}
                     source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_5aeaS13y24e1D7KBOIPNUwGflPnLR8AuQQUQ6tHDnycRg_2woHNm3fX1K_UYtxizZw&usqp=CAU'}}   
                   />
                   <Text style={styles.name}>John Henry</Text>
                   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'60%',marginBottom:5}}>
                       <Text style={styles.shadow}>Followers: 17</Text>
                       <Text style={styles.shadow}>Following: 7</Text>
                   </View>
                   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'55%',marginBottom:10}}>
                        <TouchableOpacity style={styles.acceptButton}>
                              <Text style={styles.butTxt}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                              <Text style={styles.butTxt}>Send Gift</Text>
                        </TouchableOpacity>
                   </View>
                   <Text style={[styles.name,{fontSize:moderateScale(12),opacity:.9,textAlign:'center'}]}>
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                   </Text>
             </View>
             <ScrollView>
                  <View style={{marginHorizontal:moderateScale(30),paddingTop:20,paddingBottom:50}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.bold}>Post Event</Text>
                        <View style={{width:25,height:20,backgroundColor:COLORS.textInput,borderRadius:3,justifyContent:'center',
                        alignItems:'center',marginLeft:10}}>
                            <Text style={styles.name}>1</Text>
                        </View>
                    </View>
                    {DATA.map((it,key)=>
                        <TouchableWithoutFeedback  
                        onPress={()=>{}}
                        key={key}>
                            <View 
                            style={{borderBottomWidth:.3,paddingVertical:moderateScale(20),flexDirection:'row',borderColor:COLORS.textInput,
                            width:'100%'}}>
                                <Image 
                                source={{uri:it.image}}
                                style={{width:moderateScale(75),height:moderateScale(75),borderRadius:5}}
                                />
                                <View style={{flex:1,marginLeft:15}}>
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',
                                    alignItems:'flex-start',}}>
                                        <Text style={{color:COLORS.white,fontFamily:FONTS.Medium,opacity:.7}}>{it.date}</Text>
                                    </View>
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <Text 
                                        numberOfLines={2}
                                        style={{width:'90%',
                                            color:COLORS.white,fontFamily:FONTS.title,fontSize:moderateScale(14)}}>
                                        {it.title}
                                        </Text>
                                        <Icon
                                            name="keyboard-arrow-right"
                                            type="MaterialIcons"
                                            style={{color:COLORS.white}}
                                        />
                                    </View>
                                    <View 
                                    style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0}}>
                                        <Text style={{color:COLORS.white,fontFamily:FONTS.Medium,opacity:.7,fontSize:moderateScale(12.5)}}>
                                        {it.organized}
                                        </Text>
                                        
                                    </View>
                                </View>
                                
                            </View>
                            </TouchableWithoutFeedback>
                        )}
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <Text style={styles.bold}>Upcoming Event</Text>
                            <View style={{width:25,height:20,backgroundColor:COLORS.textInput,borderRadius:3,justifyContent:'center',
                            alignItems:'center',marginLeft:10}}>
                                <Text style={styles.name}>2</Text>
                            </View>
                       </View>
                       {DATA1.map((it,key)=>
                        <TouchableWithoutFeedback  
                        onPress={()=>{}}
                        key={key}>
                            <View 
                            style={{borderBottomWidth:.3,paddingVertical:moderateScale(20),flexDirection:'row',borderColor:COLORS.textInput,
                            width:'100%'}}>
                                <Image 
                                source={{uri:it.image}}
                                style={{width:moderateScale(75),height:moderateScale(75),borderRadius:5}}
                                />
                                <View style={{flex:1,marginLeft:15}}>
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',
                                    alignItems:'flex-start',}}>
                                        <Text style={{color:COLORS.white,fontFamily:FONTS.Medium,opacity:.7}}>{it.date}</Text>
                                    </View>
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <Text 
                                        numberOfLines={2}
                                        style={{width:'90%',
                                            color:COLORS.white,fontFamily:FONTS.title,fontSize:moderateScale(14)}}>
                                        {it.title}
                                        </Text>
                                        <Icon
                                            name="keyboard-arrow-right"
                                            type="MaterialIcons"
                                            style={{color:COLORS.white}}
                                        />
                                    </View>
                                    <View 
                                    style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:0}}>
                                        <Text style={{color:COLORS.white,fontFamily:FONTS.Medium,opacity:.7,fontSize:moderateScale(12.5)}}>
                                        {it.organized}
                                        </Text>
                                        
                                    </View>
                                </View>
                                
                            </View>
                            </TouchableWithoutFeedback>
                        )}
                  </View>
             </ScrollView>
       </CustomImageBackground>
    )
}

export default ViewProfile;

const styles = StyleSheet.create({
    name: {
        color: COLORS.white,
        fontFamily: FONTS.Medium,
        fontSize: moderateScale(13),
      },
      bold: {
        color: COLORS.cream,
        fontFamily: FONTS.SemiBold,
        fontSize: moderateScale(13),
      },
      shadow: {
        color: COLORS.lightgray,
        fontFamily: FONTS.Regular,
        fontSize: moderateScale(11.5),
        opacity:.7
      },
      acceptButton: {
        borderWidth: 1,
        borderColor: COLORS.theme,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
        // marginRight: 10,
      },
      butTxt: {
        color: COLORS.theme,
        fontFamily: FONTS.Medium,
        fontSize: moderateScale(10),
      },
})
