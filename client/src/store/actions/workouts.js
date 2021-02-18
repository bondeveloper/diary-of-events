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
    REQUEST_WORKOUT_SESSION_UPDATED
    } from './actionTypes';

export const fetchWorkoutsSuccessful = data => {
    return {
        type: WORKOUT_FETCH_SUCCESS,
        list: data
    }
}

const onRequestSuccess = ( component, type = RENDER_WORKOUT_COMPONENT, data = null, isList = false) => {
    let redirect = '';
    let view, list = null;
    let shouldRedirect = false;
    switch ( component ) {
        case 'workout':
            redirect = `/workouts/${data._id}`;
            shouldRedirect = true;
            break;
        case 'workouts':
            redirect = '/workouts';
            break;
        default:
            redirect = '/';
    }

    if ( isList ) list = data; else view = data;

    return {
        type: type,
        redirect: redirect,
        view: view,
        loading: false,
        list: list,
        shouldRedirect: shouldRedirect
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
        shouldRedirect: shouldRedirect
    }
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
            console.log(err);
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
        view: data,
        shouldRedirect: true
    } );
}

export const viewedWorkout = data => {
    return {
        type: WORKOUT_VIEWED_SET,
        view: data
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
            console.log(err);
        })
    }
}

export const updateWorkoutSession = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.patch(`/api/workouts/${data.id}/sessions/${data.sessionId}`, data.data, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            console.log(res.data.workout );
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_SESSION_UPDATED, res.data.workout  ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const deleteWorkoutSession = data => {
    return dispatch => {
        dispatch( requestStarted() );

        axios.delete(`/api/workouts/${data.id}/sessions/${data.sessionId}`, {
            headers: {
                'auth-token' : data.token
            }
        })
        .then( res => {
            dispatch( requestSuccess( 'workout', REQUEST_WORKOUT_SESSION_DELETED, res.data.workout ) )
        }).catch( err => {
            console.log(err);
        })
    }
}

export const renderCreateWorkoutSession = data => {
    return render( {
        redirect: `/workouts/${data._id}/sessions/create`,
        view: data,
    } );
}

export const cancelCreateWorkoutSession = data => {
    return render({
        redirect: `/workouts/${data._id}`,
        view: data,
        shouldRedirect: true
    })
}