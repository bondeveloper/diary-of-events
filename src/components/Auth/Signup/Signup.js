import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import * as actions from '../../../store/actions/index';

import classes from './Signup.module.css';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';

class Signup extends Component {
    state = {
        validated: false
    }

    onSignupHandler =  form => {
        this.setState({ validated: true });
        this.props.onSignup( form );

        this.props.history.push( this.props.redirect );
        return <Redirect to={ this.props.redirect} />;
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

        const schema = yup.object({
            email: yup.string().required('Email is required!').email('Please enter a valid Email!'),
            password: yup.string().required('Password is required!'),
            repeat_password: yup.string().required('Please confirm password!').oneOf([yup.ref('password'), null], 'Passwords must match!'),
        });

        return (
            <Formik
                validationSchema={schema}
                onSubmit={this.onSignupHandler}
                initialValues={{
                    email: '',
                    password: '',
                    repeat_password: ''
                }}
            >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="repeat_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="confirm password"
                        name="repeat_password"
                        value={values.repeat_password}
                        onChange={handleChange}
                        isInvalid={!!errors.repeat_password}
                    />
                      <Form.Control.Feedback type="invalid">
                        {errors.repeat_password}
                      </Form.Control.Feedback>
                </Form.Group>
                <div className={classes.Buttons}>
                    <Button variant='danger' type="submit">{ signupBtnChild }</Button>
                    <Button variant='secondary' disabled={this.props.loading} onClick={this.onCancelSignupHandler}>Cancel</Button>
                </div>
            </Form>
          )}
        </Formik>);
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null,
        errors: state.signup.errors,
        redirect: state.signup.redirect,
        loading: state.signup.loading,
        toast: state.signup.toast
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: data => dispatch( actions.signup( data ) ),
        onCancelSignup: () => dispatch ( actions.signupCancel () ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( Signup );
