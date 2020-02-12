import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Post from "./components/Post";
import Authenticate from "./components/Authenticate";

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={Post} />
        <Route path="/signup-signin" component={Authenticate} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
