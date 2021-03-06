import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

import classes from './List.module.css';

import * as actions from '../../../../store/actions/index';
import Table from '../../../UI/Table/Table';

class WorkoutList extends Component {

    componentDidMount () {
        this.props.onFetchWorkouts( this.props.token );
    }

    viewWorkoutHandler = data => {
        this.props.onRenderViewComponent( data );
        this.props.history.push('workouts/'+data._id);
    }

    createWorkoutHandler = () => {
        this.props.onRenderCreateComponent();
        this.props.history.push('workouts/create');
    }

    deleteWorkoutHandler = ( pk ) => {
        this.props.onDeleteWorkout( {
            id: pk,
            token: this.props.token
        });

        this.props.onFetchWorkouts( this.props.token );
    }

    render () {
        const excludeFromTable = ['sessions', '__v', '_account', '_id'];

        const override = css`
                            display: block;
                            margin: 0 auto;
                            border-color: red;
                            `;

        const tableContent = this.props.loading ? <RingLoader color='blue' loading='true' css={override} size={30} /> : (
            <Table
                data={this.props.workouts}
                keyValue='_id'
                excludeFromTable={excludeFromTable}
                viewClicked={this.viewWorkoutHandler}
                deleteClicked={this.deleteWorkoutHandler}
            />
        );

        const redirect = this.props.shouldRedirect && this.props.redirect ? <Redirect to={ this.props.redirect } /> : null;

        const display = this.props.errors && this.props.errors.length > 0 ? (
            <Alert variant='danger'>
                {
                    this.props.errors.map( ( err, key ) => {
                        const error = 'path' in err && err.path.length > 0 && err.path[0] === 'repeat_password' ? 'Password must match!':   err.message;
                        return <span key={ key }>{ error } <br/></span>
                    })
                }
            </Alert>
        ): tableContent;

        return (
            <Container fluid className={classes.List}>
                { redirect }
                <Row>
                    <Col xs={12}>
                        <FontAwesomeIcon
                            data-toggle="tooltip" data-placement="left" title="Create Workout"
                            icon='plus-circle'
                            onClick={this.createWorkoutHandler} className={classes.CreateBtn}/>
                    </Col>
                    <Col xs={12}>
                        { display }
                    </Col>
                </Row>
            </Container>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null,
        token: state.signin.token,
        redirect: state.workouts.redirect,
        workouts: state.workouts.list,
        loading: state.workouts.loading,
        errors: state.workouts.errors,
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        onFetchWorkouts: token => dispatch( actions.fetchWorkouts( token ) ),
        onDeleteWorkout: data => dispatch( actions.deleteWorkout( data )),
        onRenderCreateComponent: () => dispatch( actions.renderCreateWorkout() ),
        onRenderViewComponent: data => dispatch( actions.renderViewWorkout( data ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( WorkoutList );
