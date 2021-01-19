import axios from "axios";
import { SIGNUP_SUCCESS } from './actionTypes';

export const signupSuccess = data => {
    return {
        data: data,
        type: SIGNUP_SUCCESS
    };
};

export const signup = data => {
    console.log( data );
    return dispatch => {
        axios.post('/api/signup', data)
        .then( res => {
            console.log(res.data);
            dispatch(signupSuccess(res.data));
        })
        .catch( err => {
            console.log(err);
        });
    };
};