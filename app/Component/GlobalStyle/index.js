import { StyleSheet } from "react-native";
import { COLORS } from "../../Constant/Colors";
import { FONTS } from "../../Constant/Font";
import { moderateScale, verticalScale } from "../../PixelRatio";

const GlobalStyles = StyleSheet.create({
  textInputView: {
    width: '100%',
    height: verticalScale(50),
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: COLORS.textInput,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  textInput: {
    width: '100%',
    height: verticalScale(50),
    // paddingLeft: 10,
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    backgroundColor: COLORS.textInput,
    paddingLeft: 20,
    borderRadius: 5,
    marginBottom: 7,
  },
  picker : {
    color:COLORS.white,width:'100%'
   },
   pickerItem : {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(13)
   },
   dob : {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    color:COLORS.white
   },
  modalMainView  :{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.liteBlack,
  },
  modalContainer : {backgroundColor:COLORS.white,padding: 20,margin:30,borderRadius:20,paddingBottom: 30,},
  modalHeader : {flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',marginBottom:25},
  modalTitle : {fontFamily:FONTS.Bold,color:COLORS.black,fontSize:15},
  modalBut: {
    height: verticalScale(50),
    backgroundColor: COLORS.button,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButTxt: {fontFamily: FONTS.title, color: COLORS.white, fontSize: 15},
});

export default GlobalStyles;