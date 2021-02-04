import axios from 'axios';
import { WORKOUT_FETCH_SUCCESS, WORKOUT_VIEWED_SET, WORKOUT_SESSION_CREATE_SUCCESSFUL } from './actionTypes';

export const fetchWorkoutsSuccessful = data => {
    return {
        type: WORKOUT_FETCH_SUCCESS,
        list: data
    }
}

export const postSuccessful = () => {
    return {
        type: WORKOUT_SESSION_CREATE_SUCCESSFUL
    }
}

export const fetchWorkouts = token => {
    return dispatch => {
        axios.get('/api/workouts/', {
            headers: {
                'auth-token' : token
            }
        })
        .then( res => {
            dispatch( fetchWorkoutsSuccessful( res.data.workouts ));
        })
        .catch( err => {

        });
    };
};

export const viewedWorkout = data => {
    return {
        type: WORKOUT_VIEWED_SET,
        view: data
    }
}

export const setViewedWorkout = data => {
    return dispatch => {
        dispatch( viewedWorkout( data ) )
    };
}

export const createWorkoutSession = data => {
    return dispatch => {
        axios.post('/api/workouts/'+data.id+'/sessions', data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            console.log( res.data );
            dispatch( postSuccessful() )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const updateWorkoutSession = data => {
    console.log(data);
    return dispatch => {
        axios.patch(`/api/workouts/${data.id}/sessions/${data.sessionId}`, data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            console.log( res.data );
            dispatch( postSuccessful() )
        }).catch( err => {
            console.log(err);
        })
    }
}