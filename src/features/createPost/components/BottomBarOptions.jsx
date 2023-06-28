import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Typography from '../../../components/Typography/Typography';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';

const tabWidth = SCREEN_WIDTH / 5;

const BottomBarOptions = ({options, value, setValue}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScrollViewMounted, setIsScrollViewMounted] = useState(false);
  const scrollViewRef = useRef();
  const tabRefs = useRef([]);

  useEffect(() => {
    if (options && options.length > 0) {
      const index = options.findIndex(option => option.value === value);
      setSelectedIndex(index);
      scrollToCenter(index);
    }
  }, [value, options]);
  const scrollToCenter = index => {
    const scrollToX = index * (tabWidth + tabWidth / 10);
    scrollViewRef.current.scrollTo({
      x: scrollToX,
      y: 0,
      animated: true,
    });
  };

  const handleTabPress = index => {
    setValue(options[index].value);
  };

  const handleOnLayout = () => {
    setIsScrollViewMounted(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        style={styles.scrollView}
        contentContainerStyle={[
          styles.tabBar,
          {minWidth: tabWidth * options.length},
        ]}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onLayout={handleOnLayout}>
        <View style={[styles.hiddenSpacing]} />
        {options.map((option, index) => {
          const isFocused = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              ref={ref => (tabRefs.current[index] = ref)}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
              activeOpacity={1}>
              <Typography
                style={isFocused ? styles.activeTabLabel : styles.tabLabel}>
                {option.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
        <View style={[styles.hiddenSpacing]} />
      </ScrollView>
    </View>
  );
};

export default BottomBarOptions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
  },
  scrollView: {
    flexGrow: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    width: tabWidth,
    justifyContent: 'center',
    padding: 20,
  },
  tabLabel: {
    color: '#FFFFFFB3',
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeTabLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  hiddenSpacing: {
    width: (SCREEN_WIDTH - tabWidth / 2) / 2,
  },
});
