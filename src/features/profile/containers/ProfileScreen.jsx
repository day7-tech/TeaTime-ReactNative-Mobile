import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SceneMap, TabView} from 'react-native-tab-view';
import SettingIcon from '../../../../assets/images/settings.png';
import Typography from '../../../components/Typography/Typography';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_PROFILE_SETTINGS_STACK_NAVIGATOR,
  ROUTE_SETTINGS,
} from '../../../navigators/RouteNames';
import {generateDummyVideoPosts} from '../../../services/generateRandomContent';
import {HORIZONTAL_MARGIN, SCREEN_WIDTH} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import AllPosts from '../components/AllPosts';
import UserImage from '../components/UserImage';
import {getUserDetails} from '../../../api/profileApi';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetails} from '../store/ProfileActions';
const AllPostsTab = () => {
  return <AllPosts />;
};
const MyPostsTab = () => {
  return <AllPosts />;
};
const SharedWithMePostsTab = () => {
  return <AllPosts />;
};

const renderScene = SceneMap({
  all: AllPostsTab,
  myPosts: MyPostsTab,
  sharedWithMe: SharedWithMePostsTab,
});

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {userDetails} = useSelector(state => state.profile);
  const [videos, setVideos] = useState(() => generateDummyVideoPosts(1));
  const [index, setIndex] = useState(0);
  // Define an array of route objects, one for each tab
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'myPosts', title: 'My Posts'},
    {key: 'sharedWithMe', title: 'Shared with me'},
  ]);
  useEffect(() => {
    // Function to fetch posts by channel
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(userId);
        dispatch(setUserDetails(user)); // Handle the fetched posts as needed
      } catch (error) {
        console.error(error); // Handle any errors that occur during the API call
      }
    };

    // Call the fetchPostsByChannel function when the component mounts
    fetchUserDetails();
  }, [dispatch, userId]);

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
              {isSelected && <View style={styles.bottomBar}></View>}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topContainer}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#FF3D00', '#E42982', '#5A189A']}
            style={styles.gradient}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}>
            { userDetails?.profilePicResource && (
              <UserImage
              imageUri={
                userDetails.profilePicResource ?? videos[0].uploader.image
              }
            />
            )}
            
          </LinearGradient>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTE_AUTHENTICATED_NAVIGATOR, {
              screen: ROUTE_PROFILE_SETTINGS_STACK_NAVIGATOR,
              params: {
                screen: ROUTE_SETTINGS,
              },
            })
          }
          style={styles.settingsIcon}>
          <Image source={SettingIcon} />
        </TouchableOpacity>
      </View>
      <Typography style={styles.userName}>
        {userDetails?.firstName || 'User First Name not set' + ' ' + userDetails?.lastName || 'User Last Name not set'}
      </Typography>
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: SCREEN_WIDTH}}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  gradientContainer: {
    width: 120,
    height: 120,
    borderRadius: 120,
    overflow: 'hidden',
    marginTop: 30,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: HORIZONTAL_MARGIN,
  },
  userName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  tabBarText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.lightestGrey,
  },
  tabItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  selectedTabItem: {},
  bottomBar: {
    backgroundColor: Colors.primary,
    height: 5,
    marginTop: 8,
    borderRadius: 10,
  },
  selectedText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
