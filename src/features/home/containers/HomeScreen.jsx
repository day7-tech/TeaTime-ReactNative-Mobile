import {useIsFocused} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_SEARCH_SCREEN} from '../../../navigators/RouteNames';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import SearchIcon from './../../../../assets/images/search.png';
import Favourites from './Favourites';
import Moments from './Moments';

// Create two components to render as the two tabs
// Create two components to render as the two tabs
const FirstRoute = ({isFocused}) => {
  return <Moments isFocused={isFocused} />;
};

const SecondRoute = ({isFocused}) => {
  return <Favourites isFocused={isFocused} />;
};

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  // Set up state to track the selected tab
  const [index, setIndex] = React.useState(0);
  // Define an array of route objects, one for each tab
  const [routes] = React.useState([
    {key: 'favourites', title: 'Favourites'},
    {key: 'moments', title: 'Moments'},
  ]);

  // Define a function to render the appropriate tab component based on the current index
  const renderScene = SceneMap({
    moments: useCallback(() => <FirstRoute isFocused={index === 1} />, [index]),
    favourites: useCallback(
      () => <SecondRoute isFocused={index === 0} />,
      [index],
    ),
  });

  // Define a function to render the tab bar
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {/* Map over each route object and create a tab item */}
        {props.navigationState.routes.map((route, i) => {
          const isSelected = props.navigationState.index === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.tabItem, isSelected && styles.selectedTabItem]}
              onPress={() => setIndex(i)}>
              {/* Render the title of the tab */}
              <Typography
                style={[styles.tabBarText, isSelected && styles.selectedText]}>
                {route.title}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Define a callback function for when the search icon is pressed
  const onSearchPress = useCallback(() => {
    navigation.navigate(ROUTE_SEARCH_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Render the tab view */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: SCREEN_WIDTH}}
        renderTabBar={renderTabBar}
        lazy={false}
      />
      {/* Render the search icon */}
      <Pressable style={styles.searchIcon} onPress={onSearchPress}>
        <Image source={SearchIcon} />
      </Pressable>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 1,
    top: 80,
    right: 0,
    left: 0,
    justifyContent: 'center',
  },
  selectedTabItem: {
    borderRadius: 25,
    backgroundColor: Colors.whiteOpacity60,
  },
  tabItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchIcon: {
    position: 'absolute',
    top: 80,
    right: 20,
  },
  tabBarText: {
    color: Colors.white,
    fontSize: 16,
  },
  selectedText: {
    color: Colors.black,
  },
});

export default HomeScreen;
