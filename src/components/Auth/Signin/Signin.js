import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import classes from './Signin.module.css';

import { signinForm, formInputChanged} from '../../../shared/form-utility';
import { formObjectToArray, mapKeyToValue } from '../../../shared/utility';

import * as actions from '../../../store/actions/index';

class Signin extends Component {
    state = {
        form: signinForm
    }

    componentDidMount () {
        // this.props.isAuth ? this.props.history.push(this.props.redirect) : null;
        if ( this.props.isAuth ) {
            this.props.history.push(this.props.redirect);
        }
    }

    inputChangedHandler = ( event, key ) => {
        this.setState({ form: formInputChanged( this.state.form, event, key) });
    }

    onSigninHandler = ( event ) => {
        event.preventDefault();
        this.props.onSignin( mapKeyToValue( this.state.form ));
    }

    render () {
        const errors = this.props.errors && this.props.errors.length > 0 ? (
            <Alert variant='danger'>
                {
                    this.props.errors.map( ( err, key ) => <span key={ key }>{ err.message } <br/></span>)
                }
            </Alert>
        ): null;
        let form = formObjectToArray( this.state.form ).map( ele => {
            return (
                <Form.Group controlId={ele.key} key={ele.key}>
                    <Form.Label>{ ele.settings.label }</Form.Label>
                    <Form.Control
                        type={ ele.settings.config.type } 
                        placeholder={ ele.settings.config.placeholder} 
                        onChange={ event => this.inputChangedHandler( event, ele.key)}/>
                </Form.Group>
            );

        });

        let redirect = this.props.isAuth ? <Redirect to={this.props.redirect} /> : null;

        return (
            <div className={classes.Signin}>
                {errors}
                <Form className={classes.Form}>          
                    {redirect}
                    {form}
                    <div className={classes.Buttons}>
                        <Button variant='danger' onClick={this.onSigninHandler}>Signin</Button>
                        <Button variant='secondary'>Cancel</Button>
                    </div>
                </Form>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null,
        redirect: state.signin.redirect,
        errors: state.signin.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignin : data => dispatch( actions.signin ( data ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps) ( Signin );