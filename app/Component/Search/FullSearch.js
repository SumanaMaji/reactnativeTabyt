import React from 'react';
import { View, Text,TextInput } from 'react-native';
import { Icon } from 'native-base';
import { COLORS } from '../../Constant/Colors';
import { moderateScale, verticalScale } from '../../PixelRatio';
import GlobalStyles from '../GlobalStyle';

const FullSearch = () => {
    return (
        <View style={{flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',marginVertical:10}}>
            <View style={[GlobalStyles.textInputView,
              {width:'100%',borderRadius:20,height:verticalScale(45),backgroundColor:'#406265',
              justifyContent:'flex-start',alignItems:'center',paddingLeft:17}]}>
               <Icon
               name="search"
               type="Ionicons"
               style={{color:COLORS.white,fontSize:moderateScale(17)}}
               />
               <TextInput
                style={[GlobalStyles.textInput,{width:'85%',height:verticalScale(40),
                borderRadius:20,paddingBottom:0,paddingLeft: 10,backgroundColor:'transparent'}]}
                placeholder="Search Name / Email / Phone"
                placeholderTextColor={COLORS.white}
               />
            </View>
        </View>
    )
}

export default FullSearch
