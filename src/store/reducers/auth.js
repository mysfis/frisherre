import * as actionTypes from 'store/actions/actionTypes';
import { updateObject } from 'store/utility'

export const initialState = {
  token: null,
  error: null,
  loading: false,
  profiles: null,
  profile: null,
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    profiles: null,
    profile: null,
  });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    profiles: null,
    profile: null,
  });
}
const identify = (state, action) => {
  return updateObject(state, {
    profile: action.profile,
  });
}

const fetchProfiles = (state, action) => {
  return updateObject(state, {
    profiles: action.profiles,
  });
}


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.PROFILE_IDENTIFY: return identify(state, action);
    case actionTypes.PROFILE_FETCH: return fetchProfiles(state, action);
    default: return state;
  }
}

export default reducer;
