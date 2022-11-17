import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyles from '../GlobalStyle';
import {Icon} from 'native-base';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';

const Picker = ({
  data,
  label,
  value,
  placeholder,
  onSelect,
  selectedValue,
  style,
}) => {
  const [showPicker, setshowPicker] = useState(false);
  const [currentShowValue, setcurrentShowValue] = useState(placeholder);
  const [currentVal, setcurrentVal] = useState(selectedValue);

  useEffect(() => {
    const findVal = data.find(i => i[value] === selectedValue);
    if (findVal && Object.keys(findVal).length > 0) {
      setcurrentVal(selectedValue);
      setcurrentShowValue(findVal[label]);
    }
  }, [data]);

  const selectVal = item => {
    setcurrentShowValue(item[label]);
    setcurrentVal(item[value]);
    onSelect(item[value], item);
    setshowPicker(false);
  };
  const setToDefault = () => {
    setcurrentShowValue('');
    setcurrentVal('');
    onSelect('', '');
    setshowPicker(false);
  };
  return (
    <>
      <Pressable
        onPress={() => setshowPicker(true)}
        style={{
          ...GlobalStyles.textInputView,
          paddingHorizontal: 20,
          ...style,
        }}>
        <Text style={styles.dob}>
          {!currentShowValue ? placeholder : currentShowValue}
        </Text>
        <Icon
          style={{color: COLORS.white}}
          name="arrow-drop-down"
          type="MaterialIcons"
        />
      </Pressable>
      <Modal
        transparent
        visible={showPicker}
        onRequestClose={() => setshowPicker(false)}>
        <Pressable
          onPress={() => setshowPicker(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0000004f',
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '85%',
              padding: 20,
              borderRadius: 3,
              maxHeight: '75%',
            }}>
            <ScrollView>
              <TouchableOpacity
                onPress={setToDefault}
                style={{paddingVertical: 12}}>
                <Text style={styles.pickerItem}>{placeholder}</Text>
              </TouchableOpacity>
              {data.map((i, key) => (
                <TouchableOpacity
                  onPress={() => selectVal(i)}
                  style={{paddingVertical: 12}}
                  key={key}>
                  <Text
                    style={{
                      ...styles.pickerItem,
                      fontFamily:
                        i[value] === currentVal ? FONTS.Bold : FONTS.Medium,
                    }}>
                    {i[label]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  picker: {
    color: COLORS.white,
    width: '100%',
  },
  pickerItem: {
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
    opacity: 0.8,
  },
  dob: {
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
    color: COLORS.white,
  },
});
