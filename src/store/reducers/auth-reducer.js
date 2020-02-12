import { AUTHENTICATE, LOGOUT } from "../actions/auth-actions";

let user = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  userId: user ? JSON.parse(localStorage.getItem("userData")).userId : null,
  token: user ? JSON.parse(localStorage.getItem("userData")).token : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
