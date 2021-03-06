import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sessions from './Sessions/List/List';

import * as actions from '../../../../store/actions/index';
import classes from './View.module.css';



class WorkoutView extends Component {
    state = {
        view: this.props.view
    }

    renderCreateWorkoutSessionComponentHandler = data => {
        this.props.onRenderCreateWorkoutSessionComponent( data );
    }

    render () {
        const redirect = this.props.redirect ? <Redirect to={this.props.redirect} /> : null;
        const override = css`
                            display: block;
                            margin: 0 auto;
                            border-color: red;
                            `;

        const page = this.props.loading ? <RingLoader color='blue' loading='true' css={override} size={30} /> : (
            <Row>
                <Col xs={12}>
                    <FontAwesomeIcon
                        data-toggle="tooltip" data-placement="left" title="Create Session"
                        icon='plus-circle'
                        onClick={ () => this.renderCreateWorkoutSessionComponentHandler(this.props.workout)}
                        className={classes.CreateBtn} />
                </Col>
                <Col xs={12}>
                    <Sessions />
                </Col>
            </Row>
        )
        return (
            <Container fluid className={classes.View}>
                { redirect }
                <Row>
                    <Col xs={12}>
                        <h4>{this.props.workout ? this.props.workout.name : null}</h4>
                        <p>{this.props.workout ? this.props.workout.description : null}</p>
                    </Col>
                </Row>
                { page }
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        workout: state.workouts.view,
        redirect: state.workouts.redirect,
        loading: state.workouts.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderCreateWorkoutSessionComponent: data =>  dispatch( actions.renderCreateWorkoutSession( data ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( WorkoutView );
