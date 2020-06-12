import * as actionTypes from './actionTypes';
import axios from 'axios';

const authSuccess = (token, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error: error
    }
}


const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}


export const auth = (email, password, isSignUp) => {
    const authObject = {
        email: email,
        password: password,
        returnSecureToken :true
    }
    let url;
    if (!isSignUp) {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZ_6kJWbcx4GAf0ROdNM70huahpAsj81M"
    } else {
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZ_6kJWbcx4GAf0ROdNM70huahpAsj81M"
    }
   return dispatch => {
       dispatch(authStart());
       axios.post(url, authObject)
       .then(response => {
           console.log(response);
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("localId", response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(makeUserLogout(response.data.expiresIn))
       }).catch(error => {
        dispatch(authFail(error.response.data.error));
       })
   }
}


const makeUserLogout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("token")
    localStorage.removeItem("localId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        let token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout())
        } else  {
            let expirationTime = new Date(localStorage.getItem("expirationTime"));
            if (expirationTime <=  new Date()) {
                dispatch(logout());
            } else {
                let localId = localStorage.getItem("localId");
                dispatch(authSuccess(token, localId));
                dispatch(makeUserLogout((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}