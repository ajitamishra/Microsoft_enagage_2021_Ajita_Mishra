import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Component } from 'react';
import Teacher from '../src/Teacher';
import Student from '../src/Student';

// check for token to keep user logged in

if(localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token and get user info and expiry
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000   // time in millisecs
  if(decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        {console.log('store',store.getState().auth.user.role)}
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
            <PrivateRoute exact path="/teacher" component={Teacher} />
              {/* {store.getState().auth.user.role==='Teacher'?<PrivateRoute exact path="/teacher" component={Teacher} />:<PrivateRoute exact path="/student" component={Student} />} */}
              
          
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
