import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as postActions from "../store/actions/posts-actions";

const Wrapper = styled.div`
  background: transparent;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #e8f0ff;
  margin-bottom: 2%;
`;

const Input = styled.input`
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: none;
  background: none;
  margin-bottom: 3%;
  width: 75%;
  padding: 2%;
  border-radius: 3%;
  text-align: center;
  color: #eee5e9;
  font-size: 1.2em;
  &::placeholder {
    color: #353b3c;
    font-size: 1em;
  }
`;

const TextArea = styled.textarea`
  resize: none;
  background: none;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 1em;
  color: #eee5e9;
  &::placeholder {
    color: #353b3c;
    font-size: 1em;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #e8f0ff;
  font-size: 1.3em;
  margin-top: 5%;
  &:hover {
    color: #747c92;
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
