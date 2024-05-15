import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { useDispatch } from "react-redux";

import { pageLoad } from "./redux/actions/pageAction";
import Editor from "./Editor";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));
const RecoveryPassword = React.lazy(() => import('./views/RecoveryPassword'));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    pageLoad()(dispatch);
  }, [dispatch]);


  return (

    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/RecoveryPassword" name="RecoveryPassword Page" render={props => <RecoveryPassword {...props} />} />
          <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );

};

export default App;
