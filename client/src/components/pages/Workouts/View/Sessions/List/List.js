import React, { Component } from 'react';
import { Container, Row, Accordion, Col, Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as actions from '../../../../../../store/actions/index';
import classes from './List.module.css';

class WorkoutSessionList extends Component {

    updateTimesHandler = ( sessionId, key ) => {
        this.props.onUpdateWorkoutSession( {
            id: this.props.view._id,
            token: this.props.token,
            sessionId: sessionId,
            data: {
                [ key ]: moment()
            }
        } );
    }
    deleteSessionHandler = sessionId => {
        this.props.onDeleteWorkoutSession({
            sessionId: sessionId,
            id: this.props.view._id,
            token: this.props.token
        });
    }

    render () {
        const sessionData = this.props.view ? ( this.props.view.sessions.map ( session => {
            let displayTimes, startEndBtn = null;
            if ( session.start && session.end  ) {
                displayTimes = ` ${ moment( session.start ).format('DD/MM/YY HH:mm')} - ${ moment( session.end ).format('DD/MM/YY HH:mm') }`;
            }else if ( session.start && !session.end  ) {
                displayTimes = ` ${ moment( session.start ).format('DD/MM/YY HH:mm') }  `;
                startEndBtn = <FontAwesomeIcon icon='stop-circle' size='1x' className={classes.StopBtnIcon} onClick={ () => this.updateTimesHandler( session._id, 'end' ) }/>
            }else {
                displayTimes = 'Session not started';
                startEndBtn = <FontAwesomeIcon icon='play-circle' size='1x' className={classes.StartBtnIcon} onClick={ () => this.updateTimesHandler( session._id, 'start' ) }/>
            }

        const page = this.props.shouldRedirect && this.props.redirect ? (<Redirect to={this.props.redirect} />) :
        (
            <Col sm={6} lg={3} key={ session._id }>
                <Accordion defaultActiveKey={ session._id } xs={6} className={classes.Accordion}>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={ session._id}>
                        {moment( session.created_at ).format('MMM Do YYYY')}
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={ session._id}>
                        <Card.Body>
                            <ul>
                                <li key='weight'>{ session.weight } ( { session.weight_unit } )</li>
                                <li key='time'>{ displayTimes }</li>
                                <li key='link'><Button variant='link' href={ session.publicUrl }>link</Button></li>
                            </ul>
                            <div className={classes.Buttons}>
                                { startEndBtn }
                                <FontAwesomeIcon icon='trash-alt' size='1x' className={classes.DeleteBtnIcon} onClick={ () => this.deleteSessionHandler( session._id ) }/>
                            </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        )
            return page;
        }) ) : null;

        return (

            <Container fluid>
                <Row>
                    { sessionData }
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = state => {
    return {
        token: state.signin.token,
        view: state.workouts.view,
        loading: state.workouts.loading,
        shouldRedirect: state.workouts.shouldRedirect,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdateWorkoutSession: data => dispatch( actions.updateWorkoutSession( data ) ),
        onDeleteWorkoutSession: data => dispatch( actions.deleteWorkoutSession( data ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) ( WorkoutSessionList );
