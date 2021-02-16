import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';

import classes from './List.module.css';

class WorkoutSessionList extends Component {

    updateTimesHandler = ( sessionId, key ) => {
        this.props.onUpdateWorkoutSession( {
            id: this.props.id,
            token: this.props.token,
            sessionId: sessionId,
            data: {
                [ key ]: moment()
            }
        } );
    }
    deleteSessionHandler = ( sessionId ) => {
        this.props.onDeleteWorkoutSession({
            sessionId: sessionId,
            id: this.props.id,
            token: this.props.token
        });
    }

    render () {
        const sessionData = this.props.sessions.map ( session => {
            let displayTimes, startEndBtn = null;
            if ( session.start && session.end  ) {
                displayTimes = ` ${ moment( session.start ).format(' HH:mm:ss')} - ${ moment( session.end ).format(' HH:mm:ss') }`;
            }else if ( session.start && !session.end  ) {
                displayTimes = ` in progress since  ${ moment( session.start ).format('MMM DD yyyy HH:mm:ss') }  `;
                startEndBtn = <Button variant='outline-warning' onClick={ () => this.updateTimesHandler( session._id, 'end' ) }>end</Button>
            }else {
                displayTimes = 'Session not started';
                startEndBtn = <Button variant='outline-primary' size='sm' onClick={ () => this.updateTimesHandler( session._id, 'start' ) }>start</Button>
            }
            const startBtn = !session.start ? <Button variant='outline-primary' size='sm'>start</Button> : null;
            const endBtn = !session.end ? <Button variant='outline-danger' size='sm'>end</Button> : null;
            return ( <Col md='3' key={session._id}>
                        <Accordion defaultActiveKey={ session._id }>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={ session._id}>
                                {moment( session.created_at ).format('MMM Do YYYY')}
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={ session._id}>
                                <Card.Body>
                                    <ul>
                                        <li>{ session.weight } ( { session.weight_unit } )</li>
                                        <li>{ displayTimes }</li>
                                        <li><Button variant='link' href={ session.publicUrl }>link</Button></li>
                                    </ul>
                                    { startEndBtn }
                                    <Button variant='outline-danger' size='sm' onClick={ () => this.deleteSessionHandler( session._id ) }>delete</Button>

                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                );
        });

        return (
            <Row>
                <div className={classes.Sessions}>
                    { sessionData }
                </div>
            </Row>
        );
    }
};
const mapStateToProps = state => {
    return {
        token: state.signin.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdateWorkoutSession: data => dispatch( actions.updateWorkoutSession( data ) ),
        onDeleteWorkoutSession: data => dispatch( actions.deleteWorkoutSession( data ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) ( WorkoutSessionList );
