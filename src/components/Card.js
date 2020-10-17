import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import * as postActions from "../store/actions/posts-actions";
import * as bookmarkActions from "../store/actions/bookmark-actions";

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c8d0d8;
  transition: 0.8s;
  background: #6c757d;
  border: 0.5vw #1d3557 solid;
  border-radius: 105px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0 5vw;
  span {
    :hover {
      color: #1d3557;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.3vw;
  margin: 0;
  margin-right: 0.5vw;
`;

const Description = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  color: #a3a3a3;
  padding: 2vw 5vw;
  height: 5vw;
  width: 15vw;
  text-align: center;
  background-color: #1d3557;
  border-radius: 105px;
  font-size: 1.2vw;
`;

const Wrapper = styled.div`
  flex: 0 1 25vw;
  display: flex;
  margin: 0 2vw;
  flex-direction: column;
  word-wrap: break-word;
  background: #c8d0d8;
  button {
    transition: 0.5s;
    background: none;
    border: none;
    color: #2b2d42;
    font-size: 1em;
    margin: 0 20%;
    outline: none;
    &:hover {
      transition: 0.5s;
      color: #93a8ac;
    }
  }
`;

const DateMade = styled.p`
  color: #284b63;
  text-align: center;
`;

const PostCard = ({
  post: { created_at, title, description, user, _id },
  bookmarkPage,
  post,
}) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth);
  const bookmarks = useSelector((state) => state.bookmark.allBookmarks);

  let dateCreated = created_at;
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

  const addBookmarkHandler = async (post) => {
    let action = bookmarkActions.addBookmark(post);
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const removeBookmarkHandler = async (post) => {
    let action = bookmarkActions.removeBookmark(post);
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>{title}</Title>
        {isUserLoggedIn.userId ? (
          isUserLoggedIn.userId === user ? null : (
            <span>
              {bookmarkPage ? (
                <BookmarkIcon
                  fontSize="small"
                  onClick={() => removeBookmarkHandler(post)}
                />
              ) : !!bookmarks.find((x) => x._id === post._id) ? (
                <BookmarkIcon
                  fontSize="small"
                  onClick={() => removeBookmarkHandler(post)}
                />
              ) : (
                <BookmarkBorderIcon
                  fontSize="small"
                  onClick={() => addBookmarkHandler(post)}
                />
              )}
            </span>
          )
        ) : null}
      </TitleContainer>
      <Description>{description}</Description>
      <DateMade>{`${month} ${day}, ${year}`}</DateMade>
      {isUserLoggedIn.userId === user ? (
        <button onClick={() => onHandleDelete(_id)}>Delete</button>
      ) : null}
    </Wrapper>
  );
};

export default PostCard;
