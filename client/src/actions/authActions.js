import axios from 'axios';
import { decode } from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// register user
export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData).then(res => history.push("/login"))     // direct to login on successful registration
    .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
    }));
};

// login -> get user token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login", userData).then(res => {
        // save to local storage; set token to local storage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // set token to auth header
        setAuthToken(token);
        // decode token to get user data
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
    }).catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
    }));
};

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// log out user
export const logoutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem("jwtToken");
    // remove auth header from future requests
    setAuthToken(false);
    // set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};