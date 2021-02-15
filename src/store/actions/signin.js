import axios from 'axios';
import Cookie from 'js-cookie';

import { REQUEST_SIGNIN_SUCCESS, REQUEST_SIGNOUT_SUCCESS, REQUEST_SIGNIN_FAILED, REQUEST_SIGNIN_STARTED, RENDER_SIGNIN_COMPONENT } from "./actionTypes"

const requestSuccess = token => {
    console.log(666);
    return {
        type: REQUEST_SIGNIN_SUCCESS,
        token: token,
        redirect: '/workouts',
        loading: false,
        errors: [],
    };
};


const requestStarted = () => {
    return {
        loading: true,
        type: REQUEST_SIGNIN_STARTED,
        errors: [],
    }
}

const requestFailed = err => {
    let errors = [];
    switch( err.status ) {
        case 400:
            errors = err.data.errors;
            break;
        case 500:
            errors.push({ message: err.statusText})
            errors = errors;
    }
    return {
        type: REQUEST_SIGNIN_FAILED,
        errors: errors,
        redirect: '/',
        loading: false
    };
}

export const signin = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.post('/api/accounts/signin', data)
        .then( res => {
            if( 'token' in res.data ) Cookie.set('token', res.data.token);
            dispatch( requestSuccess( res.data.token ));
        })
        .catch( err => {
            dispatch( requestFailed( err.response ) );
        })
    }
}

export const checkSignedIn = () => {
    return dispatch => {
        const token = Cookie.get('token');
        if (!token) {
            signout();
        } else {
            dispatch( requestSuccess( token ) );
        }
    };
};

export const showSignin = () => {
    return dispatch => {
        dispatch({
            errors: [],
            type: RENDER_SIGNIN_COMPONENT
        });
    };
};

export const signout = () => {
    Cookie.remove('token');
    console.log(55555555555);
    // return { redirect: '/', type: REQUEST_SIGNOUT_SUCCESS,};
    return dispatch => {
        dispatch({
            type: REQUEST_SIGNOUT_SUCCESS,
            token: null,
            redirect: '/'
        });
    };
};
