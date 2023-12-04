import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import BottomDrawerWithSlider from './components/BottomDrawerWithSlider';

const App = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const sliderWidth = Dimensions.get('window').width * 0.995;

  return (
    <GestureRecognizer
      style={ styles.wrapper }
      onSwipeUp={() => setIsDrawerVisible(true)}
      onSwipeDown={() => setIsDrawerVisible(false)}
    >
      <View style={ styles.container }>
        <Text style={ styles.mainTopText }>Current value is :</Text>
        <Text style={ styles.mainMiddleText }>{sliderValue}</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDrawerVisible}
          onRequestClose={() => {
            setIsDrawerVisible(!isDrawerVisible);
          }}
        >
          <View style={ styles.drawerContainer }>
            <Pressable
              style={ styles.closeModalButton }
              onPress={event => {
                if (event.target == event.currentTarget) {
                  setIsDrawerVisible(false);
                }
              }}
            >
              <View style={ styles.modalView }>
                <BottomDrawerWithSlider
                  width={sliderWidth}
                  minValue={0}
                  maxValue={100}
                  step={1}
                  sliderValue={sliderValue}
                  setSliderValue={setSliderValue}
                />
                <View style={ styles.modalText }>
                  <Text>
                    Use the slider to set your value
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
        <Text style={ styles.mainBottomText }>Swipe up to set the value</Text>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  mainTopText: { 
    color: 'black', 
    marginBottom: 10 
  },
  mainMiddleText: {
    fontVariant: ['tabular-nums'], 
    fontSize: 50, marginBottom: 250
  },
  mainBottomText: { 
    fontSize: 20, 
    marginBottom: 25,
  },
  drawerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    width: '100%',
    backgroundColor: '#EAFAF1',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.05)',
  },
  modalText: { 
    margin: 30
  }
});

export default App;
