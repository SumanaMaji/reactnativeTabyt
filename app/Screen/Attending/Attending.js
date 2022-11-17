import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground'
import BackHeader from '../../Component/Header/BackHeader'
import { moderateScale } from '../../PixelRatio'
import { COLORS } from '../../Constant/Colors'
import { FONTS } from '../../Constant/Font'

const USERLIST = [
    {
        name : "Dulcie Docher",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "Garth Hardin",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "John Hardy",
        table : 'Lartum',
        count : 9,
        img : 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
    },
    {
        name : "Dulcie Docher",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "Garth Hardin",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "John Hardy",
        table : 'Lartum',
        count : 9,
        img : 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
    },
    {
        name : "Dulcie Docher",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "Garth Hardin",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "John Hardy",
        table : 'Lartum',
        count : 9,
        img : 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
    },
    {
        name : "Dulcie Docher",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "Garth Hardin",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "John Hardy",
        table : 'Lartum',
        count : 9,
        img : 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
    },
    {
        name : "Dulcie Docher",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "Garth Hardin",
        table : 'Lartum',
        count : 7,
        img : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    },
    {
        name : "John Hardy",
        table : 'Lartum',
        count : 9,
        img : 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
    }
]

const Attending = () => {
    return (
       <CustomImageBackground>
           <BackHeader title="Attending"/>

           <ScrollView showsVerticalScrollIndicator={false}>
                
                {USERLIST.map((item,key)=> 
                       <View 
                       key={key}
                       style={{flexDirection:"row",alignItems:'center',width:'100%',
                       paddingHorizontal:moderateScale(30),
                       paddingVertical:moderateScale(15),borderBottomWidth:.7,borderColor:COLORS.textInput}}>
                               <Image 
                                 source={{uri:item.img}}
                                 style={{width:moderateScale(35),height:moderateScale(35),borderRadius:moderateScale(20),marginRight:10}}
                               />
                                <Text style={{color:COLORS.white,fontFamily:FONTS.Regular,fontSize:moderateScale(12)}}>
                                    {item.name}
                                </Text>
                       </View>
                       )}
            </ScrollView>
       </CustomImageBackground>
    )
}

export default Attending;
