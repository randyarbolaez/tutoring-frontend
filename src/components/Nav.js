import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import * as authActions from "../store/actions/auth-actions";
import * as postActions from "../store/actions/posts-actions";

import Modal from "./ModalComponent";
import Authenticate from "./Authenticate";
import AddPost from "./AddPost";


const Wrapper = styled.div`
  // background: purple;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  align-items: baseline;
  margin-top:3vw;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #ef6f6c;
  margin-top:0;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #F8F7FF;
  font-size: 2em;
  outline: none;
  &:hover {
    padding-bottom: 0.5vw;
    cursor:pointer;
    color: #CC5803;
    border-bottom:0.2vw #CC5803 solid;
  }
`;

const Input = styled.input`
  outline: none;
  background: none;
  border: none;
  border-bottom:0.2vw #F8F7FF solid;
  text-align:center;
  color: #F8F7FF;
  font-size: 1.4em;
  padding: 0.5%;
  margin-bottom: 3%;
  &::placeholder {
    color: #F8F7FF;
    font-size: 1.4em;
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
            style={{fontSize:'2vw'}}
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
