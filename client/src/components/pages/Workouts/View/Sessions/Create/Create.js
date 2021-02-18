import React, { Component } from 'react';
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import classes from './Create.module.css';
import * as actions from '../../../../../../store/actions/index';

import Aux from '../../../../../../hoc/Aux/Aux';

class WorkoutSessionCreate extends Component {
    state = {
        validated: false,
    }

    onCreateWorkoutSessionHandler = form => {
        this.setState({ validated: true });
        this.props.onCreateWorkoutSession({
            data: form,
            id: this.props.match.params.id,
            token: this.props.token
        });
    }

    onCancelCreateWorkoutSessionHandler = view => {
        this.props.onCancelCreateWorkoutSession( view );
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
            weight: yup.number().required('Weight is required.'),
            weight_unit: yup.string().required('Unit for weight is required.'),
            waist: yup.number().required('Waist is required.'),
            waist_unit: yup.string().required('Unit for waist is required.'),
        });

        const form = this.props.shouldRedirect && this.props.redirect ? (<Redirect to={this.props.redirect} />) : (

                <Formik
                    validationSchema={schema}
                    onSubmit={this.onCreateWorkoutSessionHandler}
                    onReset={() => this.onCancelCreateWorkoutSessionHandler( this.props.view )}
                    initialValues={{
                        weight: '',
                        weight_unit: '',
                        waist: '',
                        waist_unit: ''
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
                            <Form.Group as={Row} controlId="weight">
                                <Form.Group as={Col} sm={8} controlId="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Weight"
                                        name="weight"
                                        value={values.weight}
                                        onChange={handleChange}
                                        isInvalid={!!errors.weight}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.weight}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm={4} controlId="weight_unit">
                                    <Form.Label className={classes.EmptyLabel}></Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        isInvalid={!!errors.weight_unit}
                                    >
                                        <option value='' >---</option>
                                        <option value='lbs'>lbs</option>
                                        <option value='kg'>kg</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.weight_unit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group as={Row} controlId="waist">
                                <Form.Group as={Col} sm={8} controlId="waist">
                                    <Form.Label>Waist</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Waist"
                                        name="waist"
                                        value={values.waist}
                                        onChange={handleChange}
                                        isInvalid={!!errors.waist}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.waist}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm={4} controlId="waist_unit">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={handleChange}
                                        isInvalid={!!errors.waist_unit}
                                    >
                                        <option value=''>...</option>
                                        <option value='inch'>inch</option>
                                        <option value='cm'>cm</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.waist_unit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                            <div className={classes.Buttons}>
                                <Button variant='danger' type="submit">{ btnChild }</Button>
                                <Button variant='secondary' type="reset" disabled={this.props.loading}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )
        return (
            <Container fluid className={classes.Create}>
                <Row className='justify-content-center' sm>
                    { form }
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        token: state.signin.token,
        redirect: state.workouts.redirect,
        loading: state.workouts.loading,
        view: state.workouts.view,
        shouldRedirect: state.workouts.shouldRedirect,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateWorkoutSession: data => dispatch( actions.createWorkoutSession( data )),
        onCancelCreateWorkoutSession: data => dispatch( actions.cancelCreateWorkoutSession( data ) ),
    };
};


export default connect( mapStateToProps , mapDispatchToProps) ( WorkoutSessionCreate );
