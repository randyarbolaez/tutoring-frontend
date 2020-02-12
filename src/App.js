import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

// import Routes from "./Routes";
import postsReducer from "./store/reducers/posts-reducer";
import authReducer from "./store/reducers/auth-reducer";
import Home from "./components/Home";

const rootReducer = combineReducers({
  post: postsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
