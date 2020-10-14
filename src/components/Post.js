import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import PostCard from "./PostCard";
import * as postActions from "../store/actions/posts-actions";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4vh;
  margin-bottom: 10vh;
`;

const Post = () => {
  const posts = useSelector((state) => state.post.searchPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(postActions.fetchPosts());
    }
    fetchData();
  }, [dispatch]);

  return (
    <Wrapper>
      {posts ? (
        posts.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })
      ) : (
        <h1>Loading</h1>
      )}
    </Wrapper>
  );
};

export default Post;
