import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import * as actions from '../../../store/actions/index';

class Signout extends Component {
    componentDidMount () {
        this.props.onSignout();
        console.log(this.props.redirect);

    }

    render () {
        console.log(123123123);
        this.props.history.push('/');
        return <Redirect to='/' />;
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        redirect: state.signin.redirect,
        isAuth: state.signin.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignout: () => dispatch( actions.signout() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) ( Signout );;
