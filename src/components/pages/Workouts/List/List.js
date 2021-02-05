import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import classes from './List.module.css';

import * as actions from '../../../../store/actions/index';
import Table from '../../../UI/Table/Table';

class WorkoutList extends Component {

    componentDidMount () {
        if ( this.props.isAuth ) {
            this.props.history.push(this.props.redirect)
            this.props.onFetchWorkouts( this.props.token );
        }
    }

    viewWorkoutHandler = data => {
        this.props.onSetViewed( data );

        this.props.history.push('workouts/'+data._id);
        return <Redirect to={'workouts/'+data._id} />
    }

    createWorkoutHandler = () => {
        this.props.history.push('workouts/create');
        return <Redirect to={'workouts/create'} />
    }

    deleteWorkoutHandler = ( pk ) => {
        this.props.onDeleteWorkout( {
            id: pk,
            token: this.props.token
        });
    }
    
    render () {
        const excludeFromTable = ['sessions', '__v', '_account', '_id'];

        return (
            <div className={classes.List}>
                <Redirect to={this.props.redirect} />
                <Button variant='primary' onClick={this.createWorkoutHandler}>&#43; workout</Button>
                <Table 
                    data={this.props.workouts} 
                    keyValue='_id' 
                    excludeFromTable={excludeFromTable}
                    viewClicked={this.viewWorkoutHandler} 
                    deleteClicked={this.deleteWorkoutHandler} 
                    />
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null,
        token: state.signin.token,
        redirect: state.signin.redirect,
        workouts: state.workouts.list
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        onFetchWorkouts: token => dispatch( actions.fetchWorkouts( token ) ),
        onSetViewed: workout => dispatch( actions.setViewedWorkout( workout ) ),
        onDeleteWorkout: data => dispatch( actions.deleteWorkout( data ))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( WorkoutList );