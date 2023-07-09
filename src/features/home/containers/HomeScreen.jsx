import React, {useCallback, useEffect} from 'react';
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
import {getPostsByChannel} from '../../../api/homeApi';
import {useDispatch} from 'react-redux';
import {setPosts} from '../store/HomeActions';

// Create two components to render as the two tabs
// Create two components to render as the two tabs

// Define memoized versions of the `Moments` and `Favourites` components
const MemoizedMoments = React.memo(Moments);
const MemoizedFavourites = React.memo(Favourites);
const FirstRoute = ({isFocused}) => {
  // return <MemoizedMoments isFocused={isFocused} />;
  return null;
};

const SecondRoute = ({isFocused}) => {
  // return <MemoizedFavourites isFocused={isFocused} />;
  return null;
};

const HomeScreen = ({navigation}) => {
  // Set up state to track the selected tab
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  // Define an array of route objects, one for each tab
  const [routes] = React.useState([
    {key: 'favourites', title: 'Favourites'},
    {key: 'moments', title: 'Moments'},
  ]);

  useEffect(() => {
    // Function to fetch posts by channel
    const fetchPostsByChannel = async () => {
      try {
        const channelId = 'fa2b8d44-5c79-4646-bb87-ca2146057f5d';
        const numberOfItems = 10;

        const posts = await getPostsByChannel(channelId, numberOfItems);
        dispatch(setPosts(posts.posts));
        console.log(posts); // Handle the fetched posts as needed
      } catch (error) {
        console.error(error); // Handle any errors that occur during the API call
      }
    };

    // Call the fetchPostsByChannel function when the component mounts
    fetchPostsByChannel();
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
