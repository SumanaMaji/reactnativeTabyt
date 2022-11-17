import React from 'react'
import { View, Text } from 'react-native'
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground'
import { COLORS } from '../../Constant/Colors'
import { FONTS } from '../../Constant/Font'

const CommingSoon = () => {
    return (
        <CustomImageBackground>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <Text style={{color:COLORS.white,fontFamily:FONTS.extraBold,fontSize:18}}>Comming Soon !!!</Text>
            </View>
        </CustomImageBackground>
    )
}

export default CommingSoon
