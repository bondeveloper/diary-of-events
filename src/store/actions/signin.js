import axios from 'axios';
import Cookie from 'js-cookie';

import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "./actionTypes"

export const signinSuccess = token => {
    return {
        type: SIGNIN_SUCCESS,
        token: token,
        redirect: '/workouts'
    };
};

export const signin = data => {
    return dispatch => {
        axios.post('/api/accounts/signin', data)
        .then( res => {
            if( 'token' in res.data ) Cookie.set('token', res.data.token);
            dispatch( signinSuccess( res.data.token ));
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
