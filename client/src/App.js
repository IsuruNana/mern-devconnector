import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

import store from './store';
import { clearCurrentProfile } from './actions/profileActions';

//Check for token
if(localStorage.jwtToken){
  //Set the auth token header off
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAutheticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser);
    // TODO: clear current user
    store.dispatch(clearCurrentProfile);
    //Redirect to login
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path = "/" component = {Landing} />
            <div className="container">
              <Route exact path="/register" component = {Register} />
              <Route exact path="/login" component = {Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component = {Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component = {CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
