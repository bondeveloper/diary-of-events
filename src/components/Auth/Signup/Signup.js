import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import * as actions from '../../../store/actions/index';
import { formObjectToArray, mapKeyToValue } from '../../../shared/utility';
import { signupForm, formInputChanged} from '../../../shared/form-utility';

import classes from './Signup.module.css';
import { Form } from 'react-bootstrap';

class Signup extends Component {
    state = {
        form: signupForm
    }

    inputChangedHandler = (event, key) => {
        this.setState({ form: formInputChanged( this.state.form, event, key) });
    }

    onSignupHandler = ( event ) => {
        event.preventDefault();
        this.props.onSignup( mapKeyToValue( this.state.form ) );
    }

    render () {
        let form = formObjectToArray( this.state.form ).map( ele => {
            return (
                <Form.Group controlId={ ele.key } key={ ele.key }>
                    <Form.Label> { ele.settings.label }</Form.Label>
                    <Form.Control 
                        type={ ele.settings.type } 
                        placeholder={ ele.settings.config.placeholder }
                        onChange={ event => this.inputChangedHandler( event, ele.key)}/> />
                </Form.Group>
            )

        });

        return (
            <div className={classes.Signup}>
                <form>
                    {form}
                    <div className={classes.Buttons}>
                        <Button variant='danger' clicked={this.onSignupHandler}>Signup</Button>
                        <Button variant='secondary'>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: data => dispatch( actions.signup( data ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( Signup );