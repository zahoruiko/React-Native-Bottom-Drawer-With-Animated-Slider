import React, { useRef, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { StyleSheet, View, Text, Animated } from 'react-native';

const BottomDrawerWithSlider = ({
  sliderValue,
  setSliderValue,
  width = 300,
  minValue = 0,
  maxValue = 100,
  step = 1,
  minimumTrackTintColor = '#28B463',
  maximumTrackTintColor = '#D4EFDF',
  pointerBackgroundColor = '#186A3B',
  pointerTextColor = '#FFFFFF'
}) => {
  const [isSliding, setIsSliding] = useState(false);
  const pointerHeightAnimation = useRef(new Animated.Value(30)).current;

  const handlePointerRaising = () => {
    Animated.timing(pointerHeightAnimation, {
      toValue: 120,
      duration: 50,
      useNativeDriver: false
    }).start();
  };

  const handlePointerLowering = () => {
    Animated.timing(pointerHeightAnimation, {
      toValue: 30,
      duration: 50,
      useNativeDriver: false
    }).start();
  };

  const containerStyles = getContainerStyles(width);
  const pointerStyles = getPointerStyles(pointerBackgroundColor, pointerTextColor);
  const raisedPointerContainerStyles = getRaisedPointerContainerStyles(pointerHeightAnimation, pointerBackgroundColor);
  const loweredPointerContainerStyles = getLoweredPointerContainerStyles(pointerHeightAnimation);

  return (
    <View style={containerStyles.container}>
      <Text>{sliderValue}</Text>
      <Slider
        value={sliderValue}
        onValueChange={value => setSliderValue(value)}
        animationType={'timing'}
        minimumValue={minValue}
        maximumValue={maxValue}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        onSlidingStart={() => setIsSliding(true)}
        onSlidingComplete={() => setIsSliding(false)}
        step={step}
        renderThumbComponent={() => {
          return isSliding ? (
            <Animated.View onLayout={() => handlePointerRaising()} style={raisedPointerContainerStyles.wrapper}>
              <View style={pointerStyles.container}>
                <Text style={pointerStyles.text}>{sliderValue}</Text>
              </View>
              <View style={[raisedPointerContainerStyles.bottomArrow, { width: 10, height: 1 }]} />
              <View style={[raisedPointerContainerStyles.bottomArrow, { width: 6, height: 1 }]} />
              <View style={[raisedPointerContainerStyles.bottomArrow, { width: 3, height: 1 }]} />
              <View style={[raisedPointerContainerStyles.bottomArrow, { width: 1, height: 1 }]} />
            </Animated.View>
          ) : (
            <Animated.View onLayout={() => handlePointerLowering()} style={loweredPointerContainerStyles.wrapper}>
              <View style={pointerStyles.container}>
                <Text style={pointerStyles.text}>{sliderValue}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default BottomDrawerWithSlider;

const getContainerStyles = width =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      marginLeft: 0,
      marginRight: 0,
      alignItems: 'stretch',
      justifyContent: 'center'
    }
  });

const getRaisedPointerContainerStyles = (pointerHeightAnimation, pointerBackgroundColor) =>
  StyleSheet.create({
    wrapper: {
      height: pointerHeightAnimation,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5
    },
    bottomArrow: {
      backgroundColor: pointerBackgroundColor
    }
  });

const getLoweredPointerContainerStyles = pointerHeightAnimation =>
  StyleSheet.create({
    wrapper: {
      height: pointerHeightAnimation
    }
  });

const getPointerStyles = (pointerBackgroundColor, pointerTextColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: pointerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 5,
    },
    text: {
      color: pointerTextColor,
      fontSize: 15,
      fontWeight: 'bold'
    }
  });
