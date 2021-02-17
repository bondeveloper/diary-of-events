import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { renderTooltip } from '../../../UI/Tooltip/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from '../../../UI/Tooltip/Tooltip';
import * as actions from '../../../../store/actions/index';

import classes from './View.module.css';

import Sessions from './Sessions/List/List';

class WorkoutView extends Component {
    state = {
        view: this.props.view
    }

    renderCreateWorkoutSessionComponentHandler = data => {
        this.props.onRenderCreateWorkoutSessionComponent( data );
    }

    render () {
        const redirect = this.props.redirect ? <Redirect to={this.props.redirect} /> : null;
        return (
            <Container fluid className={classes.View}>
                { redirect }
                <Row>
                    <Col xs='12'>
                        <h4>{this.props.workout ? this.props.workout.name : null}</h4>
                        <p>{this.props.workout ? this.props.workout.description : null}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                    <FontAwesomeIcon
                        data-toggle="tooltip" data-placement="left" title="Create Session"
                        icon='plus-circle'
                        onClick={ () => this.renderCreateWorkoutSessionComponentHandler(this.props.workout)}
                        className={classes.CreateBtn} />
                    </Col>
                    <Col xs='12'>
                        <Sessions />
                    </Col>
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        workout: state.workouts.view,
        redirect: state.workouts.redirect,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRenderCreateWorkoutSessionComponent: data =>  dispatch( actions.renderCreateWorkoutSession( data ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( WorkoutView );
