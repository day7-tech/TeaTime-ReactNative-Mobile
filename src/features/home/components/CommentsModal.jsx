import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import AppTextInput from '../../../components/AppTextInput';
import BottomModal from '../../../components/BottomModal';
import Typography from '../../../components/Typography/Typography';
import UserComment from '../../../components/UserComment';
import {Colors} from '../../../utils/styles';
import CompanyImage from '../../../../assets/images/company.png';
import {createComment, fetchCommentsByPostId} from '../../../api/homeApi';
import {SafeAreaView} from 'react-native-safe-area-context';

const CommentsModal = ({commentsModalRef, postDetails}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]); // State variable for holding the comments data
  const [nextCursor, setCursor] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPostComments = useCallback(async () => {
    try {
      const response = await fetchCommentsByPostId(
        postDetails.id,
        nextCursor,
        10,
      );
      const {comments: fetchedComments, cursor} = response;

      setComments(prevComments => [...prevComments, ...fetchedComments]);
      setCursor(cursor);

      if (fetchedComments.length === 0) {
        setHasMoreData(false);
      }
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  }, [nextCursor, postDetails.id]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments]);

  const handleEndReached = useCallback(() => {
    if (hasMoreData) {
      fetchPostComments();
    }
  }, [fetchPostComments, hasMoreData]);

  const onPostPress = useCallback(async () => {
    if (commentText.trim() === '') {
      return;
    }

    try {
      const createdComment = await createComment(postDetails.id, commentText);
      console.log(createdComment);
      setComments(prevComments => [...prevComments, createdComment]);
      setCommentText('');
    } catch (error) {
      console.log('Error creating comment:', error);
    }
  }, [commentText, postDetails.id]);
  console.log(comments, postDetails);

  return (
    // Render the bottom modal container
    <BottomModal
      bottomSheetContainerStyle={styles.bottomSheetContainer}
      bottomSheetModalRef={commentsModalRef}
      containerStyle={styles.bottomModalContainer}>
      {/* Render the comments list */}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View key={index}>
            {/* Render each user comment */}
            <UserComment
              isUser={item.user === postDetails.user.id}
              userImage={CompanyImage}
              userName={item.user.name}
              comment={item.message}
            />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
      />

      {/* Render the comment input and post button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 220 : 0}
        style={styles.keyboardAvoidingContainer}>
        {/* <Image
          source={{uri: userDetails.channel.image}}
          style={styles.userImage}
        /> */}
        <AppTextInput
          value={commentText}
          onChangeText={setCommentText}
          textStyle={styles.textStyle}
          placeholder={'Search'}
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
    paddingBottom: 40,
  },
  textInputContainer: {
    height: 50,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  textInput: {
    alignItems: 'center',
  },
  textStyle: {
    width: '100%',
  },
  postText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  postButton: {
    height: '100%',
    justifyContent: 'center',
  },
  keyboardAvoidingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
