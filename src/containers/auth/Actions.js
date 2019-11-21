import * as actionTypes from './ActionTypes';
import axios from 'axios';
import { navigate } from "@reach/router"

export const authStart = () => {
    console.log('action authStart');
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = token => {
    console.log('action authSuccess');
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

export const authFail = error => {
    console.log('action authFail');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    console.log('action logout');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeOut = expirationTime => {
    console.log('action checkAuthTimeOut');
    console.log('check timeout');
    setTimeout(() => { logout(); }, expirationTime * 1000)
}

export const authLogin = (username, password) => {
    console.log('login');
    authStart();
    axios.post('/api/auth/login/', {
        username: username,
        password: password,
    })
    .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600*1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        authSuccess(token);
        checkAuthTimeOut(3600);
        navigate('/household');
    })
    .catch(err => {authFail(err)})
}

export const authSignup = (username, email, password1, password2) => {
    console.log('signup');
    authStart();
    axios.post('/api/auth/registration/', {
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
        authSuccess(token);
        checkAuthTimeOut(3600);
    })
    .catch(err => {authFail(err)})
}

export const authCheckState = () => {
    console.log('check state');
    const token = localStorage.getItem('token');
    if ( token === undefined ) {
        logout();
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if ( expirationDate <= new Date() ) {
            logout();
        } else {
            authSuccess(token);
            checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000);
        }
    }
}

export const initialState = {
    token: null,
    error: null,
    loading: false,
  }

export const reducer = (state=initialState, action) => {
    console.log('auth reducer')
    switch (action.type) {
        case AUTH_START: return { ...state, error: null, loading: true,}
        case AUTH_SUCCESS: return {...state, token: action.token, error: null, loading: false,};
        case AUTH_FAIL: return {...state, error: action.error, loading: false,}
        case AUTH_LOGOUT: return { ...state, token: null, }
    default: return state;
    }
}