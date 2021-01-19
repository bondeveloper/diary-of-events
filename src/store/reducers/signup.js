import { updateObject } from "../../shared/utility";


const signupSuccess = ( state, action ) => {
    return updateObject( state, { data: action.data, loading: action.loading })
};

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;