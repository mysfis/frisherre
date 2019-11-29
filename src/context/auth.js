import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

import { FullPageSpinner } from 'layout/FullPageSpinner';

const setSessionCookie = (session) => {
    Cookies.remove("session")
    Cookies.set("session", session, { expires: 8 })
}

const clearSessionCookie = () => {
    Cookies.remove("session")

}
const getSessionCookies = () => {
    const sessionCookie = Cookies.get("session")

    if (sessionCookie === undefined) {
        return {}
    } else {
        return JSON.parse(sessionCookie)
    }
}

const AuthContext = React.createContext()

const initialAuthState = {
    loading: false,
    isAuthenticated: getSessionCookies().token ? true : false,
    user: getSessionCookies().user || null,
    token: getSessionCookies().token || null,
    profiles: getSessionCookies().profiles || null,
    profile: getSessionCookies().profile || null
}

const authReducer = (state, action) => {

    console.log('action set: ' + action.type)
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                token: null,
                user: null,
                profiles: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token
            }
        case 'LOGOUT':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                profiles: null,
                profile: null
            }
        case 'PROFILES_FETCH':
            return {
                ...state,
                user:  action.payload.user,
                profiles: action.payload.profiles,
            }
        case 'PROFILES_SELECT':
            return {
                ...state,
                profile: action.payload.profile,
            }
        default:
            return state
    }
}

function AuthProvider (props) {

    const [authData, updateAuthData] = React.useReducer(authReducer, initialAuthState)
    
    // if(isLoading) {
    //     return <FullPageSpinner />
    // }

    if (authData.loading) {
        return <FullPageSpinner />
    }

    const login = (username, password) => {
        updateAuthData({
            type: "LOGIN_START"
        })
        return axios
            .post('/api/auth/login/', {
                username: username,
                password: password,})
            .then(res => {
                const token = res.data.key;
                setSessionCookie({token})
                // const expirationDate = new Date(new Date().getTime() + 3600*1000);
                // localStorage.setItem('token', token);
                // localStorage.setItem('expirationDate', expirationDate);
                updateAuthData({
                    type: "LOGIN_SUCCESS",
                    payload: {token: token}
                })
                setSessionCookie({token})
                return Promise.resolve})
            .catch(error => {
                return Promise.reject(error)})
    }
    const register = () => {}
    const logout = () => {
        clearSessionCookie()
        updateAuthData({
            type: "LOGOUT"
        })
    }
    const fetchProfiles = () => {
        axios.defaults.headers= {
            "Content-Type": "application/json",
            Authorization: "Token " + authData.token,
        }
        return axios
            .get("/api/currentuser/")
            .then(res => {
                const user_acount = res.data[0].user_account
                setSessionCookie({
                    ...getSessionCookies(), 
                    user:res.data[0],
                    profiles: user_acount.profiles
                })
                updateAuthData({
                    type: "PROFILES_FETCH",
                    payload: {
                        user:res.data[0],
                        profiles: user_acount.profiles
                    }
                })
                return Promise.resolve
            })
    }

    const selectProfile = (profile) => {
        setSessionCookie({
            ...getSessionCookies(), 
            profile: profile
        })
        updateAuthData({
            type: "PROFILES_SELECT",
            payload: {
                profile: profile}
        })
    }

    return (
        <AuthContext.Provider value={{authData, login, logout, register, fetchProfiles, selectProfile}} {...props} />
    )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}