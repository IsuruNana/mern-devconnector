//Register User
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import * as types from './types';


//Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        //Redirect
        .then(res =>history.push('/login'))
        .catch(err => 
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        );
}

//Login -get user token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //Get tokem
            const { token } = res.data;
            //Set token to ls
            localStorage.setItem('jwtToken', token);
            //Set token to Auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })
        });
};

//Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from LS
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}