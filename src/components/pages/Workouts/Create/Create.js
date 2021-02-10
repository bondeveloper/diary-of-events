import React, { Component } from 'react';

import { workoutForm, formInputChanged } from '../../../../shared/form-utility';
import { formObjectToArray, tranformPascalCaseToUnderscoreCase, mapKeyToValue } from '../../../../shared/utility';
import Aux from '../../../../hoc/Aux/Aux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Create.module.css';
import * as actions from '../../../../store/actions/index';

class CreateWorkout extends Component {
    state = {
        form: workoutForm,
        validated: false
    }

    inputChangedHandler = ( event, key ) => {
        this.setState({ form: formInputChanged( this.state.form, event, key ) });
    }

    onCreateWorkout = () => {
        const form = event.currentTarget;
        const jes = tranformPascalCaseToUnderscoreCase( mapKeyToValue( this.state.form ) )
        console.log(jes);
        console.log(eve)
        this.props.onCreateWorkout({
            data: tranformPascalCaseToUnderscoreCase( mapKeyToValue( this.state.form ) ),
            token: this.props.token 
        })
    }

   render () {
    
    let form = formObjectToArray( this.state.form ).map( ele => {
        let formElements = null;

        switch ( ele.settings.type ) {
            case 'input' :
                formElements = (
                    <Aux>
                        <Col xs="auto" className="my-1">
                            <Form.Label> { ele.settings.label } </Form.Label>
                        </Col>
                        <Col sm={6} className="my-1">
                            <Form.Label htmlFor={ele.key} srOnly>
                            { ele.settings.label }
                            </Form.Label>
                            <Form.Control 
                                type={ ele.settings.type }
                                id={ele.key}
                                placeholder={ ele.settings.config.placeholder }
                                onChange={ event => this.inputChangedHandler( event, ele.key ) }/>
                        </Col>
                    </Aux>
                );
                break;
            case 'select' :
                const optionsData = ele.settings.config.options;
                const options = Object.keys( optionsData ).map( key => {
                    return (
                        <option value={ key } key={key}> { optionsData[key] }</option>
                    )
                });
                formElements = (
                    <Aux>
                        <Col sm={4} className="my-1">
                            <Form.Label htmlFor={ele.key} srOnly>
                                unit
                            </Form.Label>
                            <Form.Control 
                                as="select" 
                                defaultValue="Choose..." 
                                id={ ele.key }
                                onChange={ event => this.inputChangedHandler( event, ele.key )} >
                                <option> { ele.settings.config.placeholder }...</option>
                                { options }
                            </Form.Control>
                        </Col>
                    </Aux>
                );
                break;
            default:
                console.log( ele.settings.type );
        }

        return (
            <Form.Row className="align-items-center" key={ ele.key }>
                { formElements }                 
            </Form.Row>
        );
    });

    return (
    <Container className={classes.Create}>
        <Form>
            <Redirect to={this.props.redirect} />
            { form }
            <Button variant='danger' onClick={this.onCreateWorkout}>
                Submit
            </Button>
        </Form>
    </Container>
    );
   }
}

const mapStateToProps = state => {
    return {
        token: state.signin.token,
        view: state.workouts.view,
        redirect: state.workouts.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateWorkout: data => dispatch( actions.createWorkout( data ))
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( CreateWorkout );