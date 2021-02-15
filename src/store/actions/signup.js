import axios from "axios";
import Cookie from 'js-cookie';

import { REQUEST_SIGNUP_SUCCESS, RENDER_SIGNUP_COMPONENT, REQUEST_SIGNIN_FAILED, REQUEST_SIGNUP_STARTED, REQUEST_SIGNUP_CANCEL} from './actionTypes';

export const requestSuccess = data => {
    return {
        account: data.data,
        type: REQUEST_SIGNUP_SUCCESS,
        loading: false,
        hide: true,
        redirect: data.redirect,
        toast: data.toast,
        errors: [],
        loading: false
    };
};

const requestStarted = () => {
    return {
        loading: true,
        type: REQUEST_SIGNUP_STARTED,
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

export const signup = data => {

    return dispatch => {
        dispatch( requestStarted() );

        axios.post('/api/accounts/signup', data)
        .then( res => {
            Cookie.set('account', res.data.account);
            dispatch( requestSuccess({ 
                data: res.data.account,
                toast: 'Account created successfully. Login to access account',
                redirect: '/'
            }) );
        })
        .catch( err => {
            dispatch( requestFailed( err.response ) );
        });
    };
};

export const signupCancel = () => {
    return dispatch => {
        dispatch({
            type: REQUEST_SIGNUP_CANCEL,
            hide: true,
            errors: [],
        });
    };
};

export const showSignup = currentState => {
    return dispatch => {
        dispatch({
            type: RENDER_SIGNUP_COMPONENT,
            hide: !currentState,
            errors: [],
        });
    };
};