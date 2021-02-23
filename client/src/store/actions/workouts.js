import axios from 'axios';

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
    REQUEST_WORKOUT_SESSION_VIEW_ACTION_FAILED
    } from './actionTypes';

export const fetchWorkoutsSuccessful = data => {
    return {
        type: WORKOUT_FETCH_SUCCESS,
        list: data
    }
}

const renderWorkoutComponentStarted = () => {
    return {
        type: RENDER_WORKOUT_COMPONENT,
        loading: true,
        redirect: '/workouts'
    }
}

const requestStarted = () => {
    return {
        loading: true,
        type: REQUEST_WORKOUTS_STARTED,
        errors: [],
    }
}

const requestSuccess = ( component, type = RENDER_WORKOUT_COMPONENT, data = null ) => {
    let redirect = '';
    let view, list = null;
    let shouldRedirect = false;
    switch ( component ) {
        case 'workout':
            redirect = `/workouts/${data._id}`;
            view = data;
            shouldRedirect = true;
            break;
        case 'workouts':
            redirect = '/workouts';
            list = data;
            break;
        default:
            redirect = '/';
    }

    return {
        type: type,
        redirect: redirect,
        view: view,
        loading: false,
        list: list,
        shouldRedirect: shouldRedirect,
        errors: [],
    }
}

const requestFailed = err => {
    let errors = [];
    switch( err.status ) {
        case 400:
            errors = err.data.errors;
            break;
        case 500:
            errors.push({ message: err.statusText})
            errors = errors;
    }
    return {
        type: REQUEST_WORKOUT_FAILED,
        errors: errors,
        redirect: '/workouts',
        loading: false
    };
}

const workoutSessionViewActionFailed = data => {
    const setFailed = requestFailed( data.error );

    return {
        ...setFailed,
        type: REQUEST_WORKOUT_SESSION_VIEW_ACTION_FAILED,
        view: data.view
    };
}

const render = data => {
    const { redirect, view, shouldRedirect } = {...data};
    return dispatch => {
        dispatch({
            type: RENDER_WORKOUT_COMPONENT,
            redirect: redirect,
            view: view,
            shouldRedirect: shouldRedirect
        });
    }
}

// workouts

export const fetchWorkouts = token => {
    return dispatch => {
        dispatch( renderWorkoutComponentStarted() );

        axios.get('/api/workouts/', {
            headers: {
                'auth-token' : token
            }
        })
        .then( res => {
            dispatch( requestSuccess( 'workouts', REQUEST_WORKOUTS_FETCHED, res.data.workouts, true));
        })
        .catch( err => {
            dispatch( requestFailed( err.response ) );
        });
    };
};

export const createWorkout = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.post('/api/workouts', data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_CREATED, res.data.workout ) )
        }).catch( err => {
            dispatch( requestFailed( err.response ) );
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
            dispatch( requestSuccess( 'workouts', res.data ) )
        }).catch( err => {
            dispatch( requestFailed( err.response ) );
        })
    }
}

export const renderCreateWorkout = () => {
    return render( { redirect: '/workouts/create' } );
}

export const renderViewWorkout = data => {
    return render( {
        redirect: `/workouts/${ data._id }`,
        view: data,
        shouldRedirect: true,
        errors: [],
    } );
}

export const viewedWorkout = data => {
    return {
        type: WORKOUT_VIEWED_SET,
        view: data,
        errors: [],
    }
}

// workout sessions

export const setViewedWorkout = data => {
    return dispatch => {
        dispatch( viewedWorkout( data ) )
    };
}

export const createWorkoutSession = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.post('/api/workouts/'+data.id+'/sessions', data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_SESSION_CREATED, res.data.workout ) );
        }).catch( err => {
            dispatch( requestFailed( err.response ) );
        })
    }
}

export const updateWorkoutSession = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.patch(`/api/workouts/${data.view._id}/sessions/${data.sessionId}`, data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            console.log(res.data.workout );
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_SESSION_UPDATED, res.data.workout  ) )
        }).catch( err => {
            dispatch( workoutSessionViewActionFailed( {
                error: err.response,
                view: data.view
            } ) );
        })
    }
}

export const deleteWorkoutSession = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.delete(`/api/workouts/${data.view._id}/sessions/${data.sessionId}`, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_SESSION_DELETED, res.data.workout ) )
        }).catch( err => {
            dispatch( workoutSessionViewActionFailed( {
                error: err.response,
                view: data.view
            } ) );
        })
    }
}

export const renderCreateWorkoutSession = data => {
    return render( {
        redirect: `/workouts/${data._id}/sessions/create`,
        view: data,
        errors: [],
    } );
}

export const cancelCreateWorkoutSession = data => {
    return render({
        redirect: `/workouts/${data._id}`,
        view: data,
        shouldRedirect: true,
        errors: [],
    })
}
