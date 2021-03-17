import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import * as authActions from "../store/actions/auth-actions";

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
  border: 0.2vw solid #1F1300;
  border-radius:5vw;
  background: none;
  outline:none;
  margin-bottom: 3%;
  width: 70%;
  padding: 3% 4%;
  margin-left:30%;
  text-align: center;
  color: #1F1300;
  font-size: 1.2em;
  &::placeholder {
    color: #F7934C;
    font-size: 1em;
  }
`;

const Button = styled.button`
  margin-top:1.2vw;
  outline:none;
  background: none;
  border: none;
  color: #1F1300;
  font-size: 1.3em;
  cursor:pointer;
  &:hover {
    color: #CC5803;
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
