import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Alert, Button, Spinner, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import classes from './Signin.module.css';

import { formInputChanged} from '../../../shared/form-utility';
import { formObjectToArray, mapKeyToValue } from '../../../shared/utility';
import Aux from '../../../hoc/Aux/Aux';

import * as actions from '../../../store/actions/index';

class Signin extends Component {
    state = {
        validated: false
    }

    componentDidMount () {
        this.props.onCheckAuth();
        console.log(this.props.isAuth);
        if ( this.props.isAuth ) {
            this.props.history.push(this.props.redirect);
            return  <Redirect to={ this.props.redirect} />;
        }
        this.props.onSigninShow();
    }

    inputChangedHandler = ( event, key ) => {
        this.setState({ form: formInputChanged( this.state.form, event, key) });
    }

    onSigninHandler = form => {
        this.setState({ validated: true });
        this.props.onSignin( form );
        this.props.history.push( this.props.redirect );
        return <Redirect to={ this.props.redirect} />;
    }

    render () {
        const errors = this.props.errors && this.props.errors.length > 0 ? (
            <Alert variant='danger'>
                {
                    this.props.errors.map( ( err, key ) => <span key={ key }>{ err.message } <br/></span>)
                }
            </Alert>
        ): null;

        let redirect = this.props.isAuth ? <Redirect to={this.props.redirect} /> : null;

        const signinBtnChild = this.props.loading ? (
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
            email: yup.string().required().email(),
            password: yup.string().required(),
        });

        return (
        <Formik
            validationSchema={schema}
            onSubmit={this.onSigninHandler}
            initialValues={{
                email: '',
                password: ''
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
            <div className={classes.Buttons}>
                <Button variant='danger' type="submit">{ signinBtnChild }</Button>
                {/* <Button variant='secondary' disabled={this.props.loading}>Cancel</Button> */}
            </div>
        </Form>
      )}
    </Formik>);
    };
};

const mapStateToProps = state => {
    console.log( state );
    return {
        isAuth: state.signin.token !== null,
        redirect: state.signin.redirect,
        errors: state.signin.errors,
        loading: state.signin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignin : data => dispatch( actions.signin ( data ) ),
        onSigninShow: () => dispatch( actions.showSignin() ),
        onCheckAuth: () => dispatch( actions.checkSignedIn() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps) ( Signin );
