import axios from 'axios';
import Cookie from 'js-cookie';

import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "./actionTypes"

export const signinSuccess = token => {
    return {
        type: SIGNIN_SUCCESS,
        token: token
    };
};

export const signin = data => {
    return dispatch => {
        axios.post('/signin', data)
        .then( res => {
            console.log("SIGNED IN");
            console.log(res.data);
            dispatch( signinSuccess( res.data));
        })
        .catch( err => {
            console.log(err);
        })
    }
}

export const checkSignedIn = () => {
    return dispatch => {
        const token = Cookie.get('token');
        if (!token) {
            console.log('NO AUTH || AUTH EXPIRED');
            dispatch(signout());
        } else {
            dispatch(signinSuccess(token));
        }
    };
};

export const signout = () => {
    Cookie.remove('token');
    return {
        type: SIGNOUT_SUCCESS
    };
};
