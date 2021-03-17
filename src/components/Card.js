import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import * as postActions from "../store/actions/posts-actions";
import * as bookmarkActions from "../store/actions/bookmark-actions";

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F7FF;
  border-top-right-radius:0.5vw;
  border-top-left-radius:0.5vw;
  span {
    :hover {
      // color: #1d3557;
      color: #F7934C;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.3vw;
  border-bottom: 0.2vw #F7934C solid;
  margin: 0;
  margin-right: 0.5vw;
  color:#1F1300;
  padding-top:2%;
  padding:0.4vw 5vw;
  font-weight:400;
`;

const Description = styled.p`
  display: flex;
  justify-content: center;
  margin: 0;
  color: #FF7700;
  padding: 0.4vw 5vw;
  // height: 5vw;
  // width: 15vw;
  text-align: center;
  background-color: #F8F7FF;
  font-size: 1vw;
`;

const Wrapper = styled.div`
  // position: relative;
  flex: 0 1 25vw;
  display: flex;
  margin: 0 2vw;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #F8F7FF;
  border-bottom-right-radius:0.5vw;
  border-bottom-left-radius:0.5vw;
  border-top-right-radius:0.5vw;
  border-top-left-radius:0.5vw;
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
  font-size:0.9vw;
  color: #284b63;
  text-align: center;
  background:#CEDADA;
  margin:0 6vw;
  padding:0.4vw;
  border-top-right-radius:0.5vw;
  border-top-left-radius:0.5vw;
  margin-top: auto;
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
      {isUserLoggedIn.userId === user ? (
          <span>
            <DeleteOutlineIcon fontSize="small" onClick={() => onHandleDelete(_id)}/>
          </span>
        ) : null}
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
    </Wrapper>
  );
};

export default PostCard;
