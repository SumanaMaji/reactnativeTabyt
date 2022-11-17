import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../Constant/Colors';
import Navigation from '../../Service/Navigation';

const CBottomTab = () => {
    return (
        <View style={styles.tab}>
            <Pressable 
            onPress={()=>Navigation.navigate('Home')}>
               <Ionicons 
               name="ios-flash-sharp"
               color={COLORS.lightgray}
               style={{opacity:.6}}
               size={26} />
            </Pressable>
            <Pressable 
            onPress={()=>Navigation.navigate('MyActivities')}>
               <Ionicons 
               name="ios-document-text"
               color={COLORS.lightgray}
               style={{opacity:.6}}
               size={26} />
            </Pressable>
            <Pressable 
            onPress={()=>Navigation.navigate('diamond')}>
            <MaterialCommunityIcons 
               name="diamond-stone"
               color={COLORS.lightgray}
               style={{opacity:.6}}
               size={26} />
            </Pressable>
            <Pressable 
            onPress={()=>Navigation.navigate('MyTickets')}>
            <FontAwesome 
               name="ticket"
               color={COLORS.lightgray}
               style={{opacity:.6}}
               size={26} />
            </Pressable>
        </View>
    )
}

export default CBottomTab

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.bottomTab,
    height: 50,
    borderTopWidth: 0.2,
    borderTopColor: COLORS.textInput,
    elevation: 50,
  },
});