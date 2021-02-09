import { updateObject } from '../../shared/utility';
import { 
    WORKOUT_FETCH_SUCCESS, 
    WORKOUT_VIEWED_SET,
    WORKOUT_CREATE_SUCCESSFUL,
    RENDER_COMPONENT
 } from '../actions/actionTypes';

const initialState = {
    list: null,
    view: null,
    redirect: '/workouts',
    deleted: false
}

const fetchSuccess = ( state, action ) => {
    return updateObject( state, {
        list: action.list
    });
};

const setViewed = ( state, action ) => {
    return updateObject( state, {
        view: action.view
    });
};

const createSuccess = ( state, action ) => {
    return updateObject( state, {
        view: action.view
    });
};

const renderComponent = ( state, action ) => {
    return  updateObject ( state, {
        redirect: action.redirect,
        view: action.view,
        loading: action.loading,
        list: action.list
    });
}

const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        case WORKOUT_FETCH_SUCCESS:
            return fetchSuccess( state, action );
        case WORKOUT_VIEWED_SET:
            return setViewed( state, action );
        case WORKOUT_CREATE_SUCCESSFUL:
            return renderComponent ( state, action );
        case RENDER_COMPONENT:
            return renderComponent(state, action );
        default:
            return state;
    }
}

export default reducer;