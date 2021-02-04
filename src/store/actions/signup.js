import axios from "axios";
import Cookie from 'js-cookie';

import { SIGNUP_SUCCESS, SIGNUP_START, SIGNUP_SHOW } from './actionTypes';

export const signupSuccess = data => {
    return {
        account: data,
        type: SIGNUP_SUCCESS,
        loading: false,
        hide: true
    };
};

export const signup = data => {

    return dispatch => {

        axios.post('/api/accounts/signup', data)
        .then( res => {
            Cookie.set('account', res.data.account);
            dispatch( signupSuccess(res.data.account) );
        })
        .catch( err => {
            console.log(err);
        });
    };
};

export const showSignup = currentState => {
    return {
        type: SIGNUP_SHOW,
        hide: !currentState
    }
}