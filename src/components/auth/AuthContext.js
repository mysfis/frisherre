import React, { createContext, useState, useReducer } from 'react';
import * as actionTypes from 'containers/auth/ActionTypes';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
    loading: false,
    // user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                token: null,
                // user: null,
                error: null,
            }
        case actionTypes.AUTH_STOP:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                // user: null,
                error: null,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                error: null,
                // user: action.payload.user,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                // user: null,
                error: action.payload.error,
            };
      
        default:
            console.log('WARNING -> Unknown reducer type.');
            return {
                ...state,
            };
    }
};

const actions = dispatch => {
    return {
        start: () =>
            dispatch({
                type: actionTypes.AUTH_START,
            }
        ),
        stop: () =>
            dispatch({
                type: actionTypes.AUTH_STOP,
            }),
        success: token =>
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                payload: {
                    token,
                    // user,
                },
            }),
        fail: error =>
            dispatch({
                type: actionTypes.AUTH_FAIL,
                payload: {
                    error,
                },
            }),
    };
};


const AuthProvider = (children) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [ user, setUser ] = useState()
    React.useEffect(()=> {
        console.log('Check authState before = ', state)
        const token = localStorage.getItem('token')
        if ( token === undefined ) {
            actions.stop();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                actions.stop();
            } else {
                actions.success(token, expirationDate);
                setTimeout(() => { 
                    localStorage.removeItem('token');
                    localStorage.removeItem('expirationDate');
                    actions.stop();
                }, (expirationDate.getTime() - new Date().getTime()))
            }
        }
        // authCheckState(authDispatch)
        console.log('Check authState after = ', state)
    }, [])
    return (
        <AuthContext.Provider
            value={{ ...state, dispatch, actions: actions(dispatch) }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
