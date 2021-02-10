import axios from 'axios';
import Cookie from 'js-cookie';

import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS, REQUEST_FAILED } from "./actionTypes"

const signinSuccess = token => {
    return {
        type: SIGNIN_SUCCESS,
        token: token,
        redirect: '/workouts'
    };
};

const requestFailed = err => {
    return {
        type: REQUEST_FAILED,
        errors: err.data.errors,
        redirect: '/'
    };
}

export const signin = data => {
    return dispatch => {
        axios.post('/api/accounts/signin', data)
        .then( res => {
            if( 'token' in res.data ) Cookie.set('token', res.data.token);
            console.log(res.data);
            dispatch( signinSuccess( res.data.token ));
        })
        .catch( err => {
            console.log(err.response);
            dispatch( requestFailed( err.response ) );
        })
    }
}

export const checkSignedIn = () => {
    return dispatch => {
        const token = Cookie.get('token');
        if (!token) {
            dispatch( signout() );
        } else {
            dispatch( signinSuccess(token) );
        }
    };
};

export const signout = () => {
    Cookie.remove('token');
    return {
        type: SIGNOUT_SUCCESS,
        redirect: '/'
    };
};
