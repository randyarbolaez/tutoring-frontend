import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import * as authActions from "../store/actions/auth-actions";
import * as postActions from "../store/actions/posts-actions";

import Modal from "./ModalComponent";
import Authenticate from "./Authenticate";
import AddPost from "./AddPost";

const Wrapper = styled.div`
  background: transparent;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  align-items: baseline;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #ef6f6c;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #e8f0ff;
  font-size: 2em;
  outline: none;
  &:hover {
    color: #747c92;
  }
`;

const Input = styled.input`
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: none;
  margin-bottom: 3%;
  padding: 3%;
  border-radius: 3%;
  text-align: center;
  color: #ef6f6c;
  font-size: 1.5em;
  margin-top: 2%;
  outline: none;
  &::placeholder {
    font-size: 1.6em;
    text-align: center;
    color: #ef6f6c;
  }
`;

const Nav = () => {
  let isUserLoggedIn = useSelector((state) => state.auth.token);
  let posts = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (!isUserLoggedIn) {
      isUserLoggedIn = null;
      setUser(false);
    }
    if (isUserLoggedIn) {
      setUser(true);
    }
  }, [isUserLoggedIn]);

  const handleOnClick = async () => {
    let action = authActions.logout();
    try {
      await dispatch(action);
      setUser(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const onInputChangeHandler = async (e) => {
    let { value } = e.target;
    setSearch(value);
    let action = postActions.searchPosts(value, posts);
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {user ? (
        <>
          <Button onClick={handleOnClick}>Logout</Button>
          <Input
            type="text"
            value={search}
            onChange={onInputChangeHandler}
            placeholder="Tutoring Board"
          />
          <Modal buttonName="Add Post">
            <AddPost />
          </Modal>
        </>
      ) : (
        <>
          <Title>Tutoring Board</Title>
          <Input
            type="text"
            value={search}
            onChange={onInputChangeHandler}
            placeholder="Search"
          />
          <Modal buttonName="Sign Up | Sign In">
            <Authenticate />
          </Modal>
        </>
      )}
    </Wrapper>
  );
};

export default Nav;
