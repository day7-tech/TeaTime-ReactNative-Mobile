import React, {useState} from 'react';
import {Switch, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#5A189A',
          'rgba(228, 41, 130, 0.85)',
          'rgba(255, 61, 0, 0.88)',
        ]}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradientContainer}>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: 'transparent', true: 'transparent'}}
            thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="transparent"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 32,
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  switchContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    transform: [{scaleX: 1}, {scaleY: 1}], // Increase size of the switch
  },
});

export default GradientSwitch;
