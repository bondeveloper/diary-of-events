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
    sessionCreateHandler = pk => {
        this.props.onRenderCreateComponent( pk );
        this.props.history.push('/workouts/'+pk+'/sessions/create');
        // <Redirect to={ '/workouts/'+pk+'/sessions/create' } />
    }
    render () {
        return(
            <Container fluid className={classes.View}>
                <Redirect to={ this.props.redirect } />
                <Row>
                    <Col xs='12'>
                        <h4>{this.props.workout.name}</h4>
                        <p>{this.props.workout.description}</p>    
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                    <FontAwesomeIcon 
                        data-toggle="tooltip" data-placement="left" title="Create Session"
                        icon='plus-circle'
                        onClick={ () => this.sessionCreateHandler(this.props.workout._id)}
                        className={classes.CreateBtn} />
                    </Col>
                    <Col xs='12'>
                        <Sessions sessions={this.props.workout.sessions} id={this.props.match.params.id}/>
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
        onRenderCreateComponent: pk =>  dispatch( actions.renderCreateWorkoutSession( pk ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( WorkoutView );