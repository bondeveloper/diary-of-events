import axios from 'axios';
import { useAsync } from 'react-async';

import { 
    WORKOUT_FETCH_SUCCESS,
    WORKOUT_VIEWED_SET,
    WORKOUT_SESSION_UPDATE_SUCCESSFUL,
    RENDER_WORKOUT_COMPONENT
    } from './actionTypes';

export const fetchWorkoutsSuccessful = data => {
    return {
        type: WORKOUT_FETCH_SUCCESS,
        list: data
    }
}

const onRequestSuccess = ( component, data = null, isList = false, type = RENDER_WORKOUT_COMPONENT ) => {
    let redirect = '';
    let view, list = null;
    switch ( component ) {
        case 'workout':
            redirect = `/workouts/${data._id}`;
            break;
        case 'workouts':
            redirect = '/workouts';
            break;
    }

    if ( isList ) list = data; else view = data;

    return {
        type: type,
        redirect: redirect,
        view: view,
        loading: false,
        list: list
    }
}

const onRequestStarted = () => {
    return {
        type: RENDER_WORKOUT_COMPONENT,
        loading: true,
        redirect: '/workouts'
    }
}


const render = data => {
    const { redirect, view } = {...data};
    return dispatch => {
        dispatch({
            type: RENDER_WORKOUT_COMPONENT,
            redirect: redirect,
            view: view,
            
        })
    }
}

export const fetchWorkouts = token => {
    return dispatch => {

        dispatch( onRequestStarted() );

        axios.get('/api/workouts/', {
            headers: {
                'auth-token' : token
            }
        })
        .then( res => {
            dispatch( onRequestSuccess( 'workouts', res.data.workouts, true));
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
            dispatch( onRequestSuccess( 'workout', res.data.workout ) )
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
            dispatch( onRequestSuccess( WORKOUT_SESSION_UPDATE_SUCCESSFUL ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const deleteWorkoutSession = data => {
    return dispatch => {
        axios.delete(`/api/workouts/${data.id}/sessions/${data.sessionId}`, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( onRequestSuccess( 'workouts', res.data ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const createWorkout = data => {
    return dispatch => {
        axios.post('/api/workouts', data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( onRequestSuccess( 'workout', res.data.workout ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const deleteWorkout = data => {
    return dispatch => {
        axios.delete(`/api/workouts/${data.id}`, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            console.log( res.data );
            dispatch( onRequestSuccess( 'workouts', res.data ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const renderCreateWorkout = () => {
    return render( { redirect: '/workouts/create' } );
}
export const renderViewWorkout = data => {
    return render( {
        redirect: `/workouts/${ data._id }`,
        view: data
    } );
}

export const renderCreateWorkoutSession = ( pk ) => {
    return render( { redirect: `/workouts/${pk}/sessions/create` } );    
}