import React, { Component } from 'react';

import Aux from '../../../../hoc/Aux/Aux';
import { Container, Row, Form, Button, Spinner} from 'react-bootstrap';
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
                            <Form.Group controlId="name" as={Row}>
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
                            <Form.Group controlId="description" as={Row}>
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
                <Row className='justify-content-center'>
                    { form }
                </Row>
            </Container>
        );


    }
}

const mapStateToProps = state => {
    return {
        token: state.signin.token,
        view: state.workouts.view,
        redirect: state.workouts.redirect,
        loading: state.workouts.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateWorkout: data => dispatch( actions.createWorkout( data ))
        // onCancelCreateWorkout: data => dispatch( actions.cancelCreateWorkout() ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( CreateWorkout );
