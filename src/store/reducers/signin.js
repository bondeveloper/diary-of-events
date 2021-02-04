import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    redirect: '/'
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
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SIGNIN_SUCCESS:
            return signinSuccess( state, action );
        case SIGNOUT_SUCCESS:
            return signoutSuccess( state, action);
        default:
            return state;
    }
};

export default reducer;