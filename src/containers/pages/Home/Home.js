import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

import Signup from '../../../components/Auth/Signup/Signup';
import Signin from '../../../components/Auth/Signin/Signin';
import classes from './Home.module.css';


class Home extends Component {


    showSigninHandler = ( event ) => {
        event.preventDefault();
        this.props.onShowSignin( this.props.hideSignup );
    }
    render () {
        const auth = this.props.hideSignup ? <Signin /> : <Signup /> ;
        const text = this.props.hideSignup ? "Don't have an account yet?" : "Already have an account?" ;
        return (
            <div className={classes.Home}>
                <div className={classes.Auth}>
                    { auth }
                    <div className={classes.ShowSignin}>
                        <a href="" onClick={this.showSigninHandler}>{ text }</a>
                    </div>
                </div>
            </div>

        );
    };
};

const mapStateToProps = state => {
    return {
        hideSignup: state.signup.hide,
        isAuth: state.signin.token !== null,
        redirect: state.signin.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowSignin: currentState => dispatch( actions.showSignup( currentState ) ),
        onCheckAuth: () => dispatch( actions.checkSignedIn() ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );
