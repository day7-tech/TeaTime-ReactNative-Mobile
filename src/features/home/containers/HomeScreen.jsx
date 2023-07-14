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
import {useDispatch, useSelector} from 'react-redux';
import {getFavPosts, getMomentPostsByChannel} from '../../../api/homeApi';
import Typography from '../../../components/Typography/Typography';
import {ROUTE_SEARCH_SCREEN} from '../../../navigators/RouteNames';
import {SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {setFavPosts, setMomentPosts} from '../store/HomeActions';
import SearchIcon from './../../../../assets/images/search.png';
import Favourites from './Favourites';
import Moments from './Moments';
import {useFocusEffect} from '@react-navigation/native';
const channelId = '90f0abdb-951e-4186-bc70-bdcfb0f1e733';
const numberOfItems = 5;
const page = 0;

// Define memoized versions of the `Moments` and `Favourites` components

const FirstRoute = ({isFocused}) => {
  return <Favourites isFocused={isFocused} />;
};

const SecondRoute = ({isFocused}) => {
  return <Moments isFocused={isFocused} />;
};

const HomeScreen = ({navigation}) => {
  // Set up state to track the selected tab
  const [index, setIndex] = React.useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const {favPosts, momentPosts} = useSelector(state => state.home);

  const dispatch = useDispatch();
  // Define an array of route objects, one for each tab
  const [routes] = React.useState([
    {key: 'favourites', title: 'Favourites'},
    {key: 'moments', title: 'Moments'},
  ]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (index === 0 && !favPosts.length) {
        const favPostsResponse = await getFavPosts(numberOfItems, page);
        dispatch(setFavPosts(favPostsResponse.posts));
      } else if (index === 1 && !momentPosts.length) {
        const momentPostsResponse = await getMomentPostsByChannel(
          channelId,
          numberOfItems,
        );
        dispatch(setMomentPosts(momentPostsResponse.posts));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, favPosts.length, index, momentPosts.length]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData, index]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  // Define a function to render the appropriate tab component based on the current index
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'favourites':
        return index === 0 ? <FirstRoute isFocused={index === 0} /> : null;
      case 'moments':
        return index === 1 ? <SecondRoute isFocused={index === 1} /> : null;
      default:
        return null;
    }
  };
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
        lazy={true}
        shouldRenderScene={(route, focused) =>
          focused || route.key === routes[index].key
        }
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
