import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {useDispatch} from 'react-redux';
import {getFavPosts, getMomentPostsByChannel} from '../../../api/homeApi';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_SEARCH_SCREEN} from '../../../navigators/RouteNames';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {setFavPosts, setMomentPosts} from '../store/HomeActions';
import SearchIcon from './../../../../assets/images/search.png';
import Favourites from './Favourites';
import Moments from './Moments';
const channelId = '90f0abdb-951e-4186-bc70-bdcfb0f1e733';
const numberOfItems = 10;
const page = 0;

// Create two components to render as the two tabs
// Create two components to render as the two tabs

// Define memoized versions of the `Moments` and `Favourites` components

const FirstRoute = ({isFocused}) => {
  return <Moments isFocused={isFocused} />;
  // return null;
};

const SecondRoute = ({isFocused}) => {
  return <Favourites isFocused={isFocused} />;
  // return null;
};

const HomeScreen = ({navigation}) => {
  // Set up state to track the selected tab
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  // Define an array of route objects, one for each tab
  const [routes] = React.useState([
    {key: 'favourites', title: 'Favourites'},
    {key: 'moments', title: 'Moments'},
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [momentPosts, favPosts] = await Promise.all([
          getMomentPostsByChannel(channelId, numberOfItems),
          getFavPosts(numberOfItems, page),
        ]);

        dispatch(setMomentPosts(momentPosts.posts));
        dispatch(setFavPosts(favPosts.posts));
        setIsLoading(false);
      } catch (error) {
        console.error(error); // Handle any errors that occur during the API calls
      }
    };

    fetchData();
  }, [dispatch]);

  // Define a function to render the appropriate tab component based on the current index
  const renderScene = SceneMap({
    moments: () => <FirstRoute isFocused={index === 1} />,
    favourites: () => <SecondRoute isFocused={index === 0} />,
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

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

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
