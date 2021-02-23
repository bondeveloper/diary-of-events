import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Signin.module.css';
import Aux from '../../../hoc/Aux/Aux';
import * as actions from '../../../store/actions/index';

class Signin extends Component {
    state = {
        validated: false,
        showPassword: false
    }

    componentDidMount () {
        this.props.onSigninShow();
    }

    onSigninHandler = form => {
        this.setState({ validated: true });
        this.props.onSignin( form );

        this.props.history.push( this.props.redirect );
        return <Redirect to={ this.props.redirect} />;
    }
    onShowPasswordToggle = () => this.setState({ showPassword: !this.state.showPassword});

    render () {
        const showPasswordIcon = this.state.showPassword ? 'eye-slash' : 'eye';

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
        ): 'Signin';

        const schema = yup.object({
            email: yup.string().required('Email is required!').email('Please enter a valid Email!'),
            password: yup.string().required('Password is required!'),
        });

        const form = (
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
                        <InputGroup className='mb-2'>
                            <Form.Control
                                type={ this.state.showPassword ? 'text' : 'password' }
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={ showPasswordIcon } onClick={this.onShowPasswordToggle}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>

                    </Form.Group>
                    <div className={classes.Buttons}>
                        <Button variant='danger' type="submit">{ signinBtnChild }</Button>
                    </div>
                </Form>
              )}
            </Formik>
        );

        return (
            <Aux>
                { errors }
                { form }
            </Aux>
        );
    };
};

const mapStateToProps = state => {
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
