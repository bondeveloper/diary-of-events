import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

import classes from './View.module.css';

import Sessions from './Sessions/List/List';

class WorkoutView extends Component {
    sessionCreateHandler = pk => {
        this.props.history.push('/workouts/'+pk+'/sessions/create');
        <Redirect to={ '/workouts/'+pk+'/sessions/create' } />
    }
    render () {
        
       
    
        return(
            <Container className={classes.View} fluid>
                <Row>
                    <Col sm='12'>
                        <h4>{this.props.workout.name}</h4>
                        <span>{this.props.workout.description}</span>    
                    </Col>
                    <Col sm='12'>
                        <Button variant='primary' onClick={ () => this.sessionCreateHandler(this.props.workout._id)}> &#43; session</Button>
                    </Col>
                </Row>
                <Row><Sessions sessions={this.props.workout.sessions} id={this.props.match.params.id}/></Row>
            </Container>
         );
    }
};

const mapStateToProps = state => {
    return {
        workout: state.workouts.view
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onCreateSession: dispatch( actions.createSession() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( WorkoutView );