import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import BackIcon from "../../../../assets/images/back.png";
import ChannelDetails from "../../../components/ChannelDetails";
import SearchBar from "../../../components/SearchBar";
import { generateDummyVideoPosts } from "../../../services/generateRandomContent";
import { HORIZONTAL_MARGIN } from "../../../utils/constants";
import { Colors } from "../../../utils/styles";
import HistoryRow from "../components/HistoryRow";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState(() => generateDummyVideoPosts(10));
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHistoryItem = useCallback(({ item, index }) => {
    return (
      <View key={index}>
        <HistoryRow searchedText={"Bloom aged care"} />
      </View>
    );
  }, []);

  const renderSearchItem = useCallback(({ item, index }) => {
    return (
      <View key={index} style={styles.searchResultContainer}>
        <ChannelDetails
          channelName={item.uploader.name}
          channelImage={item.uploader.image}
          textStyle={styles.textStyle}
        />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardViewContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBackPress} style={styles.back}>
            <Image source={BackIcon} style={styles.icon} />
          </TouchableOpacity>
          <SearchBar
            style={styles.searchBarContainer}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </View>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.commentCount.toString()}
          renderItem={searchText ? renderSearchItem : renderHistoryItem}
          style={styles.flatlistContainer}
          extraData={videos}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    height: 40,
    flex: 1,
  },
  keyboardViewContainer: {
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistContainer: {
    marginTop: 10,
  },
  back: {
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
  },
  textStyle: {
    color: Colors.black,
  },
  searchResultContainer: {
    flex: 1,
    marginVertical: 8,
  },
});

export default SearchScreen;
