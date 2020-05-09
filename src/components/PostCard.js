import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as postActions from "../store/actions/posts-actions";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #d8dad3;
`;

const Description = styled.p`
  text-align: center;
  color: #a3a3a3;
  /* width: 33%; */
  width: 20vmax;
  height: 3.5vmax;
`;

const Wrapper = styled.div`
  /* Background color */
  /* background-color: rgba(0, 0, 0, 0.3); */

  /* You can use gradient background color such as
    background: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%); */

  /* Curved corners */
  border-bottom-left-radius: 5%;
  border-top-left-radius: 90%;
  border-bottom-right-radius: 5%;
  border-top-right-radius: 90%;
  flex: 0 1 20%;
  margin: 2vw 0 0 -2vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 4%;
  width: 20%;
  background: #495159;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  button {
    background: none;
    border: none;
    color: #9d8189;
    font-size: 1em;
    margin: 0 20%;
    outline: none;

    &:hover {
      color: #efd3d7;
    }
  }

  &:hover {
    background: #fbe7b5;
    margin: 2vh 4vw;
  }
`;

const DateMade = styled.p`
  color: #f1f2eb;
  text-align: center;
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0%;
  .right-span {
    margin-left: 25%;
  }
  .left-span {
    margin-right: 25%;
  }
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.auth);
  let token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!isUserLoggedIn.userId) {
      console.log("NO USER");
    }
    if (isUserLoggedIn.userId) {
      setUserId(post.usersThatLikedThePost.includes(isUserLoggedIn.userId));
    }
  }, [isUserLoggedIn]);

  let dateCreated = post.created_at;
  let d = new Date(dateCreated);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();

  const onHandleDelete = (id) => {
    try {
      dispatch(postActions.deletePost(id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onlikeOrDislikePostHandler = (
    title,
    description,
    likes,
    usersThatLikedThePost,
    postid
  ) => {
    if (userId) {
      console.log("already liked");
      return;
    }
    if (!isUserLoggedIn.userId) {
      console.log("no user");
      return;
    }
    if (isUserLoggedIn.userId) {
      try {
        dispatch(
          postActions.updatePost(
            title,
            description,
            likes,
            usersThatLikedThePost,
            postid,
            token
          )
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(post);

  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>
      <DateMade>{`${month} ${day}, ${year}`}</DateMade>
      <LikeContainer>
        <span
          onClick={() => {
            onlikeOrDislikePostHandler(
              post.title,
              post.description,
              post.likes,
              post.usersThatLikedThePost,
              post._id
            );
          }}
          className="right-span"
        >
          <button>{userId ? "♥︎" : "♡"}</button>
        </span>
        <span className="left-span">{post.likes || 0}</span>
      </LikeContainer>
      {isUserLoggedIn.userId === post.user ? (
        <button onClick={() => onHandleDelete(post._id)}>Delete</button>
      ) : null}
    </Wrapper>
  );
};

export default PostCard;
