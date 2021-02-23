import React, { Component } from 'react';

import Aux from '../../../../hoc/Aux/Aux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import classes from './Create.module.css';
import * as actions from '../../../../store/actions/index';

class CreateWorkout extends Component {
    state = {
        validated: false
    }

    onCreateWorkoutHandler = form => {
        this.setState({ validated: true });
        this.props.onCreateWorkout({
            data: form,
            token: this.props.token
        });
    }
    onCancelCreateWorkoutHandler = () => {
        this.props.history.push('/workouts');
        return <Redirect to='/workouts' />;
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

        const btnChild = this.props.loading ? (
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
        ): 'submit';

        const schema = yup.object({
            name: yup.string().required(),
            description: yup.string().required(),
        });

        const form = this.props.view ? (<Redirect to={this.props.redirect} />) : (
                <Formik
                    validationSchema={schema}
                    onSubmit={this.onCreateWorkoutHandler}
                    onReset={this.onCancelCreateWorkoutHandler}
                    initialValues={{
                        name: '',
                        description: ''
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
                        handleReset,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <Form.Group controlId="name" as={Col}>
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="description" as={Col}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    isInvalid={!!errors.description}
                                />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                  </Form.Control.Feedback>
                            </Form.Group>
                            <div className={classes.Buttons}>
                                <Button variant='danger' type="submit">{ btnChild }</Button>
                                <Button variant='secondary' type="reset" disabled={this.props.loading} >Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )
        return (
            <Container fluid className={classes.Create}>
                { errors }
                { form }
            </Container>
        );


    }
}

const mapStateToProps = state => {
    return {
        token: state.signin.token,
        view: state.workouts.view,
        redirect: state.workouts.redirect,
        loading: state.workouts.loading,
        errors: state.workouts.errors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateWorkout: data => dispatch( actions.createWorkout( data ))
        // onCancelCreateWorkout: data => dispatch( actions.cancelCreateWorkout() ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( CreateWorkout );
