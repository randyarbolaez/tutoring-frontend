import React from "react";
import { useDispatch } from "react-redux";
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
`;

const Wrapper = styled.div`
  margin: 2% 2%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5%;
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
`;

const DateMade = styled.p`
  color: #f1f2eb;
  text-align: center;
`;

const PostCard = ({ post, user }) => {
  const dispatch = useDispatch();

  let dateCreated = post.created_at;
  let d = new Date();
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
    "December"
  ];
  let month = months[d.getMonth(dateCreated)];
  let day = d.getDate(dateCreated);
  let year = d.getFullYear(dateCreated);

  const onHandleDelete = id => {
    try {
      dispatch(postActions.deletePost(id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>
      <DateMade>{`${month} ${day}, ${year}`}</DateMade>
      {user.userId === post.user ? (
        <button onClick={() => onHandleDelete(post._id)}>Delete</button>
      ) : null}
    </Wrapper>
  );
};

export default PostCard;
