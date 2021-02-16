import React, { Component } from 'react';

import Aux from '../../../../hoc/Aux/Aux';
import { Col, Form, Button, Spinner} from 'react-bootstrap';
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
    //
    // componentDidUpdate (prevProps) {
    //     console.log(prevProps);
    //     console.log(this.props);
    //     if ( ( prevProps.view === null ||  prevProps.view === undefined ) && this.props.view !== null) {
    //         console.log(333);
    //         this.props.history.push( this.props.redirect )
    //         return <Redirect to={ this.props.redirect} from='/workouts/create' />
    //     }
    // }

    onCreateWorkoutHandler = form => {
        this.setState({ validated: true });
        this.props.onCreateWorkout({
            data: form,
            token: this.props.token
        });
        // console.log(this.props.redirect);
        // this.props.history.push( this.props.redirect );
        // return <Redirect to={ this.props.redirect} />;
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
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Col} controlId="name">
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
                            <Form.Group as={Col} controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
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
                                <Button variant='secondary' disabled={this.props.loading}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )
        return form;


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
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( CreateWorkout );
