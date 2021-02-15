import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import * as actions from '../../../store/actions/index';
import { formObjectToArray, mapKeyToValue } from '../../../shared/utility';
import { signupForm, formInputChanged} from '../../../shared/form-utility';

import classes from './Signup.module.css';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';

class Signup extends Component {
    state = {
        form: signupForm
    }

    inputChangedHandler = (event, key) => {
        this.setState({ form: formInputChanged( this.state.form, event, key) });
    }

    onSignupHandler = async () => {
        await this.props.onSignup( mapKeyToValue( this.state.form ) );
        if ( this.props.errors && this.props.errors.length < 1 && this.props.redirect ) {
            <Redirect to={this.props.redirect} />
        };
    }

    onCancelSignupHandler = () => {
        this.props.onCancelSignup();
    }

    render () {
        const errors = this.props.errors && this.props.errors.length > 0 ? (
            <Alert variant='danger'>
                {
                    this.props.errors.map( ( err, key ) => {
                        const error = 'path' in err && err.path.length > 0 && err.path[0] === 'repeat_password' ? 'Password must match!':   err.message;
                        return <span key={ key }>{ error } <br/></span>
                    })
                }
            </Alert>
        ): null;

        let form = formObjectToArray( this.state.form ).map( ele => {
            return (
                <Form.Group controlId={ ele.key } key={ ele.key }>
                    <Form.Label> { ele.settings.label }</Form.Label>
                    <Form.Control 
                        type={ ele.settings.config.type } 
                        placeholder={ ele.settings.config.placeholder }
                        onChange={ event => this.inputChangedHandler( event, ele.key)}/>
                </Form.Group>
            )

        });

        const signupBtnChild = this.props.loading ? (
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
        ): 'Signup';

        return (
            <div className={classes.Signup}>
                { errors }
                <Form>
                    {form}
                    <div className={classes.Buttons}>
                        <Button variant='danger' onClick={this.onSignupHandler}>{ signupBtnChild }</Button>
                        <Button variant='secondary' disabled={this.props.loading} onClick={this.onCancelSignupHandler}>Cancel</Button>
                    </div>
                </Form>
            </div>
        );
    }
};

const mapStateToProps = state => {
    console.log(state);
    return {
        isAuth: state.signin.token !== null,
        errors: state.signup.errors,
        redirect: state.signup.redirect,
        loading: state.signup.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: data => dispatch( actions.signup( data ) ),
        onCancelSignup: () => dispatch ( actions.signupCancel () ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( Signup );