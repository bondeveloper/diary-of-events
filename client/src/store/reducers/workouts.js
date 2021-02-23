import { updateObject } from '../../shared/utility';
import {
    WORKOUT_FETCH_SUCCESS,
    WORKOUT_VIEWED_SET,
    RENDER_WORKOUT_COMPONENT,
    REQUEST_WORKOUTS_FETCHED,
    REQUEST_WORKOUT_CREATED,
    REQUEST_WORKOUTS_STARTED,
    REQUEST_WORKOUT_SESSION_CREATED,
    REQUEST_WORKOUT_SESSION_DELETED,
    REQUEST_WORKOUT_SESSION_UPDATED,
    REQUEST_WORKOUT_FAILED,
    REQUEST_WORKOUT_SESSION_VIEW_ACTION_FAILED,
 } from '../actions/actionTypes';

const initialState = {
    list: null,
    view: null,
    redirect: '/workouts',
    deleted: false,
    loading: false
}

const fetchSuccess = ( state, action ) => {
    return updateObject( state, {
        list: action.list,
        errors: action.errors,
    });
};

const setViewed = ( state, action ) => {
    return updateObject( state, {
        view: action.view,
        errors: action.errors,
    });
};

const renderComponent = ( state, action ) => {
    return  updateObject ( state, {
        redirect: action.redirect,
        view: action.view,
        loading: action.loading,
        list: action.list,
        shouldRedirect: action.shouldRedirect,
        errors: action.errors,
    });
}

const requestSuccess = ( state, action ) => {
    return updateObject ( state, {
        redirect: action.redirect,
        loading: action.loading,
        errors: action.errors,
        list: action.list,
        view: action.view,
        shouldRedirect: action.shouldRedirect,
    });
}

const requestFailed = ( state, action ) => {
    return updateObject( state, {
        errors: action.errors,
        loading: action.loading,
        view: action.view
    });
}

const requestViewActionFailed = ( state, action ) => {
    return updateObject( state, {
        errors: action.errors,
        loading: action.loading,
        view: action.view
    });
}


const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case WORKOUT_FETCH_SUCCESS:
            return fetchSuccess( state, action );
        case WORKOUT_VIEWED_SET:
            return setViewed( state, action );
        case RENDER_WORKOUT_COMPONENT:
            return renderComponent(state, action );
        case REQUEST_WORKOUTS_FETCHED:
            return requestSuccess( state, action );
        case REQUEST_WORKOUT_CREATED:
            return requestSuccess( state, action );
        case REQUEST_WORKOUTS_STARTED:
            return requestSuccess( state, action );
        case REQUEST_WORKOUT_SESSION_CREATED:
            return requestSuccess( state, action );
        case REQUEST_WORKOUT_SESSION_DELETED:
                return requestSuccess( state, action );
        case REQUEST_WORKOUT_SESSION_UPDATED:
            return requestSuccess( state, action );
        case REQUEST_WORKOUT_FAILED:
            return requestFailed( state, action );
        case REQUEST_WORKOUT_SESSION_VIEW_ACTION_FAILED:
            return requestViewActionFailed( state, action );
        default:
            return state;
    }
}

export default reducer;
