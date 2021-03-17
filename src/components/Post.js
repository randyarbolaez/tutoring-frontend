import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Card from "./Card";
import * as postActions from "../store/actions/posts-actions";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4vh;
  margin-bottom: 10vh;
`;

const Title = styled.h1`
  font-size: 3vw;
  text-align: center;
  color: #fff1e6;
`;

const Post = (props) => {
  const [isDoneSearching,setIsDoneSearching] = useState(false)
  const posts = useSelector((state) => state.post.searchPosts);
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchData() {
      await dispatch(postActions.fetchPosts());
      setIsDoneSearching(true)
    }
    fetchData();
    setIsDoneSearching(false)
  }, [dispatch]);
  
  return (
    <Wrapper>
      {posts.length ? (
        posts.map((post) => {
          return <Card key={post._id} post={post} bookmarkPage={false} />;
        })
      ) : isDoneSearching && posts.length == 0 ? (
        <Title>No Posts</Title>
      ):(
        <Title>Loading...</Title>
      )}
    </Wrapper>
  );
};

export default Post;
