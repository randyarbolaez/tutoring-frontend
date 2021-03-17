import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as postActions from "../store/actions/posts-actions";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #F7934C;
  margin-bottom: 2%;
`;

const Input = styled.input`
  border: none;
  background: none;
  outline:none;
  border: 0.2vw solid #1F1300;
  border-radius:5vw;
  margin-bottom: 3%;
  width: 60%;
  padding: 2% 4%;
  margin-left:30%;
  text-align: center;
  color: #1F1300;
  font-size: 1.7vw;
  &::placeholder {
    color: #F7934C;
    font-size: 1.7vw;
  }
`;

const TextArea = styled.textarea`
  outline:none;
  resize: none;
  background: none;
  border: none;
  border: 0.2vw solid #1F1300;
  border-radius:0.5vw;
  font-size: 1.1vw;
  font-weight:500;
  font-family: Verdana, sans-serif;
  &::placeholder {
    color: #F7934C;
    font-size: 1.1vw;
  }
`;

const Button = styled.button`
  outline:none;
  cursor:pointer;
  border: none;
  border-top-left-radius:0.5vw;
  border-top-right-radius:0.5vw;
  color: #1F1300;
  background:#CEDADA;
  margin-top:2vw;
  font-size:1.2vw;
  text-align: center;
  margin:1.5vw 4.5vw 0 4.5vw;
  padding:0.4vw;
  &:hover {
    color: #CC5803;
  }
`;

const AddPost = () => {
  let token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const addPostHandler = async () => {
    let action = postActions.createPost(title, description, token);
    if (title.length < 3 || description.length < 15) {
      setError(true);
    }
    try {
      await dispatch(action);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  return (
    <Wrapper>
      <Title>Tutoring Post</Title>
      {error && <p>Please input the fields required</p>}
      <Input
        type="text"
        name="title"
        value={title}
        onChange={inputChangeHandler}
        placeholder="title"
        required
        maxLength="20"
        minLength="2"
      />
      <TextArea
        name="description"
        cols="30"
        rows="5"
        onChange={inputChangeHandler}
        placeholder="enter a description with 125 characters or less"
        maxLength="125"
        minLength="15"
        required
      ></TextArea>
      <Button type="submit" onClick={addPostHandler}>
        Add Tutoring Post
      </Button>
    </Wrapper>
  );
};
export default AddPost;
