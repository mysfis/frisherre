import * as actionTypes from 'components/auth/ActionTypes';
import axios from 'axios';
import { navigate } from "@reach/router"

export const authStart = (dispatch) => {
    console.log('action authStart');
    return({
        type: actionTypes.AUTH_START,
    })
}

export const authSuccess = (dispatch, token) => {
    console.log('action authSuccess');
    return({
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    })
}

export const authFail = (dispatch, error) => {
    console.log('action authFail');
    return({
        type: actionTypes.AUTH_FAIL,
        error: error,
    })
}

export const logout = () => {
    console.log('action logout');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return ({
        type: actionTypes.AUTH_LOGOUT,
    })
}

export const checkAuthTimeOut = (dispatch, expirationTime) => {
    console.log('action checkAuthTimeOut')
    return (setTimeout(() => { 
        logout(dispatch) 
    }, expirationTime * 1000))
}

export const authLogin = (dispatch, username, password) => {
    console.log('login');
    dispatch(authStart());
    axios.post('/api/v1/auth/login/', {
        username: username,
        password: password,
    })
    .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600*1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
        navigate('/household');
    })
    .catch(err => { dispatch(authFail(err)) })
}

export const authSignup = (dispatch, username, email, password1, password2) => {
    console.log('signup');
    dispatch(authStart())
    axios.post('/api/v1/auth/registration/', {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
    })
    .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600*1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
    })
    .catch(err => { dispatch(authFail(err)) })
}

export const authCheckState = (dispatch) => {
    console.log('check state');
    const token = localStorage.getItem('token');
    if ( token === undefined ) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if ( expirationDate <= new Date() ) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }
}

export const initialState = { token: null, error: null, loading: false, }

export const reducer = (state=initialState, action) => {
    console.log('state=', state)
    console.log('action=', action)
    switch (action.type) {
        case actionTypes.AUTH_START: return { ...state, error: null, loading: true,}
        case actionTypes.AUTH_SUCCESS: return {...state, token: action.token, error: null, loading: false,}
        case actionTypes.AUTH_FAIL: return {...state, error: action.error, loading: false,}
        case actionTypes.AUTH_LOGOUT: return { ...state, token: null, }
    default: return state;
    }
}