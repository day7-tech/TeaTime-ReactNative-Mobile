import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import AppTextInput from "../../../components/AppTextInput";
import BottomModal from "../../../components/BottomModal";
import Typography from "../../../components/Typography/Typography";
import UserComment from "../../../components/UserComment";
import { Colors } from "../../../utils/styles";

const CommentsModal = ({ commentsModalRef, userDetails }) => {
  const [commentText, setCommentText] = useState("");

  const onPostPress = useCallback(() => {
    console.lot("on Comment Press");
  }, []);
  return (
    <BottomModal
      bottomSheetContainerStyle={styles.bottomSheetContainer}
      bottomSheetModalRef={commentsModalRef}
      containerStyle={styles.bottomModalContainer}
    >
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={({ item }) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <UserComment
                userImage={userDetails.uploader.image}
                userName={userDetails.uploader.name}
                comment={"Helllo Hi how are you?"}
              />
              <UserComment
                userImage={userDetails.uploader.image}
                userName={userDetails.uploader.name}
                comment={
                  "Helllo Hi how are you? I am good. what about you? had you lunch"
                }
              />
              <UserComment
                userImage={userDetails.uploader.image}
                userName={userDetails.uploader.name}
                comment={"Helllo "}
              />
            </View>
          );
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? getBottomSpace() + 180 : 0
        }
        style={styles.keyboardAvoidingContainer}
      >
        <Image
          source={{ uri: userDetails.channel.image }}
          style={styles.userImage}
        />
        <AppTextInput
          value={commentText}
          onChangeText={setCommentText}
          textStyle={styles.textStyle}
          placeholder={"Search"}
          autoCorrect={false}
          suffixComponent={
            <Pressable style={styles.postButton} onPress={onPostPress}>
              <Typography style={styles.postText}>Post</Typography>
            </Pressable>
          }
          containerStyle={styles.textInputContainer}
        />
      </KeyboardAvoidingView>
    </BottomModal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  bottomModalContainer: {
    marginTop: 15,
    flex: 1,
    paddingBottom: getBottomSpace(),
  },
  textInputContainer: {
    height: 50,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getBottomSpace(),
  },
  textInput: {
    alignItems: "center",
  },
  textStyle: {
    width: "100%",
  },
  postText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 600,
  },
  postButton: {
    height: "100%",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
