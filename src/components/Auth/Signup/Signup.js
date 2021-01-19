import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { updateObject, mapKeyToValue } from '../../../shared/utility';

import classes from './Signup.module.css';

class Signup extends Component {
    state = {
        form: {
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                label: 'Email'
            },
            password: {
                type: 'input',
                config: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                label: 'Password'
            }
        }
    }

    inputChangedHandler = (event, key) => {
        const updatedFormElement = updateObject(this.state.form[key], { value: event.target.value});
        const updatedForm = updateObject(this.state.form, { [key]: updatedFormElement });
        this.setState({ form: updatedForm });
    }

    onSignupHandler = ( event ) => {
        event.preventDefault();
        this.props.onSignup( mapKeyToValue( this.state.form ) );
    }

    render () {
        let formElements = [];
        for ( let key in this.state.form) {
            formElements.push({
                key: key,
                settings: this.state.form[key]
            })
        }

        let form = formElements.map( ele => {
            return <Input
                key={ele.key}
                type={ele.settings.type}
                config={ele.settings.config}
                value={ele.settings.value}
                label={ele.settings.label}
                changed={ event => this.inputChangedHandler( event, ele.key)}
                />

        });


        return (
            <div>
                <form>
                    {form}
                    <div className={classes.Buttons}>
                        <Button type='Success' clicked={this.onSignupHandler}>Signup</Button>
                        <Button type='Cancel'>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: data => dispatch( actions.signup( data ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps)( Signup );