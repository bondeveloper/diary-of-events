import { updateObject } from "../../shared/utility";
import { SIGNUP_SUCCESS, SIGNUP_SHOW } from '../actions/actionTypes';

const initialState = {
    account: null,
    hide: true
}

const signupSuccess = ( state, action ) => {
    return updateObject( state, { 
        account: action.account, 
        hide: action.hide
     });
};

const showSignup = ( state, action ) => {
    return updateObject( state, { hide: action.hide });
}

const reducer = ( state = initialState, action ) => { 
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case SIGNUP_SHOW:
            return showSignup( state, action );
        default:
            return state;
    }
}

export default reducer;