import React from 'react'
import axios from 'axios';
import { FullPageSpinner } from 'layout/FullPageSpinner';

const AuthContext = React.createContext()

const initialAuthState = {
    loading: false,
    isAuthenticated: localStorage.getItem('token')? true : false,
    user: null,
    token: localStorage.getItem('token'),
    profiles:null
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
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case 'PROFILES_FETCH':
            return {
                ...state,
                user:  action.payload.user,
                profiles: action.payload.profiles,
                profile: action.payload.profiles.length ? action.payload.profiles[0] : null
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
                const expirationDate = new Date(new Date().getTime() + 3600*1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                updateAuthData({
                    type: "LOGIN_SUCCESS",
                    payload: {token: token}
                })
                return Promise.resolve})
            .catch(error => {
                return Promise.reject(error)})
    }
    const register = () => {}
    const logout = () => {
        localStorage.clear()
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