/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ModalNavigator from './src/navigators/ModalNavigator';

function App(): JSX.Element {
  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <ModalNavigator />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
