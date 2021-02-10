import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS, REQUEST_FAILED } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    redirect: '/',
    errors: []
}

const signinSuccess = ( state, action ) => {
    return updateObject ( state, { 
        token: action.token,
        redirect: action.redirect
    });
}
const signoutSuccess = ( state, action ) => {
    return updateObject( state, {
        token: null,
        redirect: action.redirect
    });
}
const requestFailed = ( state, action ) => {
    return updateObject( state, {
        errors: action.errors
    })
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SIGNIN_SUCCESS:
            return signinSuccess( state, action );
        case SIGNOUT_SUCCESS:
            return signoutSuccess( state, action);
        case REQUEST_FAILED:
            return requestFailed( state, action );
        default:
            return state;
    }
};

export default reducer;