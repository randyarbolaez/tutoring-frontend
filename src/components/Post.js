import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import PostCard from "./PostCard";
import * as postActions from "../store/actions/posts-actions";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Post = () => {
  const posts = useSelector(state => state.post.searchPosts);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(state => state.auth);

  useEffect(() => {
    async function fetchData() {
      await dispatch(postActions.fetchPosts());
    }
    fetchData();
  }, [dispatch]);

  return (
    <Wrapper>
      {posts.map(post => {
        return <PostCard key={post._id} post={post} user={isUserLoggedIn} />;
      })}
    </Wrapper>
  );
};

export default Post;
