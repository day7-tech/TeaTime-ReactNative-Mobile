import {useSelector} from 'react-redux';

const usePostDetails = (postId, isFavourites) => {
  const {favPosts, momentPosts} = useSelector(state => state.home);
  const posts = isFavourites ? favPosts : momentPosts;

  const post = posts.find(item => item.id === postId) || null;

  return post;
};

export default usePostDetails;
