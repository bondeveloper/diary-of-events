import { updateObject } from "../../shared/utility";
import { REQUEST_SIGNUP_SUCCESS, RENDER_SIGNUP_COMPONENT, REQUEST_SIGNIN_FAILED, REQUEST_SIGNUP_STARTED, REQUEST_SIGNUP_CANCEL } from '../actions/actionTypes';

const initialState = {
    account: null,
    hide: true,
    errors: [],
    toast: null,
    redirect: null,
    loading: false
}

const requestSuccess = ( state, action ) => {
    return updateObject( state, { 
        account: action.account, 
        hide: action.hide,
        toast: action.toast,
        redirect: action.redirect,
        errors: action.errors,
        loading: action.loading
     });
};

const requestStarted = ( state, action ) => {
    return updateObject( state, {
        loading: action.loading,
        errors: action.errors,
    });
};

const renderComponent = ( state, action ) => {
    return updateObject( state, { 
        hide: action.hide,
        errors: action.errors,
     });
}

const requestFailed = ( state, action ) => {
    return updateObject( state, {
        errors: action.errors,
        loading: action.loading
    })
}

const requestCancel = ( state, action ) => {
    return updateObject( state, {
        hide: action.hide,
        errors: action.errors
    })
}

const reducer = ( state = initialState, action ) => { 
    switch (action.type) {
        case REQUEST_SIGNUP_SUCCESS:
            return requestSuccess(state, action);
        case RENDER_SIGNUP_COMPONENT:
            return renderComponent( state, action );
        case REQUEST_SIGNIN_FAILED:
            return requestFailed( state, action );
        case REQUEST_SIGNUP_STARTED:
            return requestStarted( state, action );
        case REQUEST_SIGNUP_CANCEL:
            return requestCancel( state, action );
        default:
            return state;
    }
}

export default reducer;