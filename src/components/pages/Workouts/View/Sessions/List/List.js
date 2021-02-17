import React, { Component } from 'react';
import { Row, Spinner, Accordion, Col, Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';
import Aux from '../../../../../../hoc/Aux/Aux';

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

            const deleteBtn = this.props.loading ? (
               <Aux>
                   <Spinner
                   as="span"
                   animation="grow"
                   size="sm"
                   role="status"
                   aria-hidden="true"
                   />
                   Loading...
               </Aux>
           ): 'delete';

        const page = this.props.shouldRedirect && this.props.redirect ? (<Redirect to={this.props.redirect} />) :
        (
            <Col md='3' key={session._id}>
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
                               <li key='weight'>{ session.weight } ( { session.weight_unit } )</li>
                               <li key='time'>{ displayTimes }</li>
                               <li key='link'><Button variant='link' href={ session.publicUrl }>link</Button></li>
                           </ul>
                           <div className={classes.Buttons}>
                               { startEndBtn }
                               <Button variant='outline-danger' size='sm' onClick={ () => this.deleteSessionHandler( session._id ) }>{ deleteBtn }</Button>
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
