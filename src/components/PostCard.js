import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as postActions from "../store/actions/posts-actions";

const Title = styled.h1`
  font-size: 1.5vw;
  text-align: center;
  color: #c8d0d8;
  transition: 0.8s;
  background: #495159;
  border: 1vw #c8d0d8 solid;
  border-top-left-radius: 5%;
`;

const Description = styled.p`
  color: #a3a3a3;
  padding: 0 5vw;
  height: 100%;
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: center;

  /* Curved corners */
  border-bottom-left-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-top-right-radius: 5%;
  flex: 0 1 22vw;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  transition: 0.5s;
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
    border-left: 0.3vmax #ef6f6c solid;
    border-bottom: 0.3vmax #ef6f6c solid;
    border-right: 0.3vmax #ef6f6c solid;
    background: #c8d0d8;
    transition: 0.5s;
    h1 {
      color: #495159;
      transition: 0.5s;
      background: none;
    }
  }
`;

const DateMade = styled.p`
  color: #f1f2eb;
  text-align: center;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth);

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

  // console.log(post);

  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>
      <DateMade>{`${month} ${day}, ${year}`}</DateMade>
      {isUserLoggedIn.userId === post.user ? (
        <button onClick={() => onHandleDelete(post._id)}>Delete</button>
      ) : null}
    </Wrapper>
  );
};

export default PostCard;
