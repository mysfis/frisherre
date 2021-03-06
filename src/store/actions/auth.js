import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';
import { navigate } from "@reach/router"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => {
  console.log('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const setProfile = profile => {
  return {
    type: actionTypes.PROFILE_IDENTIFY,
    profile: profile,
  }
}

export const setProfiles = (profiles) => {
  return {
    type: actionTypes.PROFILE_FETCH,
    profiles: profiles,
  }
}

export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    console.log('check timeout');
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    console.log('login');
    dispatch (authStart());
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
      dispatch(getProfiles(token))
      navigate('/');
    })
    .catch(error => {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      dispatch(authFail(error))})
  }
}

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    console.log('signup');
    dispatch (authStart());
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
    .catch(err => {dispatch(authFail(err))})
  }
}

export const authCheckState = () => {
  return dispatch => {
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
        dispatch(getProfiles(token))
      }
    }
  }
}

export const getProfiles = (token) => {
  return dispatch => {
    if ( token === undefined ) {
      dispatch(logout());
    } else {
      axios.defaults.headers= {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
      }
      axios
          .get("/api/v1/currentuser/")
          .then(res => {
              const user_acount = res.data[0].user_account
              dispatch(setProfiles(user_acount.profiles))
          })
          .catch(err => console.log(err));

    }
  }
}