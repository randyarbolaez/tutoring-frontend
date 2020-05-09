import {
  CREATE_POST,
  READ_POST,
  UPDATE_POST,
  DELETE_POST,
  SEARCH_POSTS,
} from "../actions/posts-actions";
// import Post from "../../models/Post";

const initialState = {
  allPosts: [],
  searchPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      const newPost = {
        _id: action.postData._id,
        title: action.postData.title,
        description: action.postData.description,
        user: action.postData.user,
        likes: 0,
        usersThatLikedThePost: [],
      };
      return { ...state, searchPosts: state.searchPosts.concat(newPost) };

    case READ_POST:
      return {
        allPosts: action.posts,
        searchPosts: action.posts,
      };
    case UPDATE_POST:
      const postIndex = state.allPosts.findIndex(
        (post) => post._id === action.updatedPostData._id
      );
      let updatedPost = {
        ...state.allPosts[postIndex],
        _id: action.updatedPostData._id,
        likes: action.updatedPostData.likes,
        usersThatLikedThePost: action.updatedPostData.usersThatLikedThePost,
        user: action.updatedPostData.user,
      };

      const updatedAllPost = [...state.allPosts];
      updatedAllPost[postIndex] = updatedPost;

      return {
        ...state,
        allPosts: updatedAllPost,
        searchPosts: updatedAllPost,
      };

    case DELETE_POST:
      return {
        ...state,
        searchPosts: state.searchPosts.filter(
          (post) => post.id !== action.postId
        ),
      };
    case SEARCH_POSTS:
      return {
        ...state,
        searchPosts: action.posts,
      };
    default:
      return state;
  }
};
