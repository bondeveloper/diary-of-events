import { updateObject } from '../../shared/utility';
import { WORKOUT_FETCH_SUCCESS, WORKOUT_VIEWED_SET } from '../actions/actionTypes';

const initialState = {
    list: null,
    view: null
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
const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        case WORKOUT_FETCH_SUCCESS:
            return fetchSuccess( state, action );
        case WORKOUT_VIEWED_SET:
            return setViewed( state, action )

        default:
            return state;
    }
}

export default reducer;