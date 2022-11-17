import {Icon} from 'native-base';
import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../Constant/Colors';

const AnimatedRow = props => {
  const {item, style} = props;

  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          Animated.timing(pan, {
            toValue: gestureState.dx,
            duration: 10,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 20) {
          Animated.spring(pan, {
            toValue: 0,
            friction: 3,
            tension: 5,
            useNativeDriver: true,
          }).start();
        }
        if (gestureState.dx < -20) {
          Animated.timing(pan, {
            toValue: -95,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const resetAnimation = () => {
    Animated.spring(pan, {
      toValue: 0,
      friction: 3,
      tension: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.box, style, {transform: [{translateX: pan}]}]}
      {...panResponder.panHandlers}>
      {props.children}
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => {
          resetAnimation();
          props.edit(item);
        }}>
        <Icon name="edit" type="MaterialIcons" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, style, {backgroundColor: '#216666'}]}
        onPress={() => {
          resetAnimation();
          props.delete(item);
        }}>
        <Icon name="close" type="Ionicons" style={styles.icon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedRow;

const styles = StyleSheet.create({
  button: {
    //   ...StyleSheet.absoluteFillObject,
    width: 46,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#268281',
    marginRight: 1,
  },
  icon: {
    color: COLORS.white,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
