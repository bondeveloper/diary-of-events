import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    viewHandler = data => {
        this.props.onSetViewed( data );

        this.props.history.push('workouts/'+data._id);
        return <Redirect to={'workouts/'+data._id} />
    }

    createHandler = data => {
        console.log(data);
    }
    
    render () {
        const excludeFromTable = ['sessions', '__v', '_account', '_id'];

        return (
            <div className={classes.List}>
                <Redirect to={this.props.redirect} />
                <Table data={this.props.workouts} keyValue='_id' excludeFromTable={excludeFromTable} viewClicked={this.viewHandler} />
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
        onSetViewed: workout => dispatch( actions.setViewedWorkout( workout ))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( WorkoutList );