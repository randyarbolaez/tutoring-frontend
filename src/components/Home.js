import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import Post from "./Post";
import Nav from "./Nav";
import Bookmark from "./Bookmark";

import * as bookmarkActions from "../store/actions/bookmark-actions";

const Home = () => {
  const [bookmarkClicked, setBookmarkClicked] = useState(false);
  const bookmarks = useSelector((state) => state.bookmark.allBookmarks);
  let isUserLoggedIn = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserLoggedIn) {
      isUserLoggedIn = null;
      setUser(false);
    }
    if (isUserLoggedIn) {
      setUser(true);
      async function fetchData() {
        await dispatch(bookmarkActions.fetchBookmarks());
      }
      fetchData();
    }
  }, [dispatch, isUserLoggedIn]);

  return (
    <>
      <Nav />
      {user ? (
        bookmarkClicked ? (
          <BookmarkIcon
            fontSize="large"
            color={bookmarkClicked ? "action" : "disabled"}
            onClick={(e) => {
              setBookmarkClicked(!bookmarkClicked);
            }}
          />
        ) : (
          <BookmarkBorderIcon
            fontSize="large"
            color={bookmarkClicked ? "action" : "disabled"}
            onClick={(e) => {
              setBookmarkClicked(!bookmarkClicked);
            }}
          />
        )
      ) : null}
      {bookmarkClicked ? <Bookmark bookmarks={bookmarks} /> : <Post />}
    </>
  );
};
export default Home;
