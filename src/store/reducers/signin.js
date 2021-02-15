import { REQUEST_SIGNIN_SUCCESS, REQUEST_SIGNOUT_SUCCESS, REQUEST_SIGNIN_FAILED, REQUEST_SIGNIN_STARTED, RENDER_SIGNIN_COMPONENT } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    redirect: '/',
    errors: [],
    loading: false,
    signedout: true
}

const requestSuccess = ( state, action ) => {
    return updateObject ( state, {
        token: action.token,
        redirect: action.redirect,
        loading: action.loading,
        errors: action.errors
    });
}

const requestStarted = ( state, action ) => {
    return updateObject( state, {
        loading: action.loading,
        errors: action.errors,
    });
};

const signoutSuccess = ( state, action ) => {
    return updateObject( state, {
        token: null,
        redirect: action.redirect,
        errors: action.errors,
    });
}
const requestFailed = ( state, action ) => {
    return updateObject( state, {
        errors: action.errors,
        loading: action.loading,
    })
}

const renderComponent = ( state, action ) => {
    return updateObject( state, {
        hide: action.hide,
        errors: action.errors,
     });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case REQUEST_SIGNIN_SUCCESS:
            return requestSuccess( state, action );
        case REQUEST_SIGNOUT_SUCCESS:
            return requestSuccess( state, action);
        case REQUEST_SIGNIN_FAILED:
            return requestFailed( state, action );
        case REQUEST_SIGNIN_STARTED:
            return requestStarted( state, action );
        case RENDER_SIGNIN_COMPONENT:
            return renderComponent( state, action ) ;
        default:
            return state;
    }
};

export default reducer;
