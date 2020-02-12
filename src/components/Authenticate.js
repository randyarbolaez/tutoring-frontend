import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import * as authActions from "../store/actions/auth-actions";

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
  border: 1px solid #4c4b63;
  background: none;
  margin-bottom: 3%;
  width: 75%;
  padding: 8%;
  border-radius: 3%;
  text-align: center;
  color: #eee5e9;
  font-size: 1.2em;
  &::placeholder {
    color: #1c1c1c;
    font-size: 1em;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #e8f0ff;
  font-size: 1.3em;
  &:hover {
    color: #747c92;
  }
`;

const Authenticate = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState(false);

  const authHandler = async () => {
    let action = authActions.verify(username, password, isSignup);
    if (username.length < 3 || password.length < 3) {
      setError(true);
    }
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Wrapper>
      <Title>{isSignup ? "Sign Up" : "Sign In"}</Title>
      {error && <p>Username or Password are incorrect</p>}
      <Input
        type="text"
        name="username"
        value={username}
        onChange={inputChangeHandler}
        placeholder="username"
        required
        minLength="3"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={inputChangeHandler}
        placeholder="password"
        required
        minLength="3"
      />
      <div>
        <Button type="submit" onClick={authHandler}>
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          onClick={() => {
            setIsSignup(prevState => !prevState);
          }}
        >
          Switch to {isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </Wrapper>
  );
};

export default Authenticate;
