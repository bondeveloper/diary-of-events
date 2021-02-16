import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import * as actions from '../../../store/actions/index';

class Signout extends Component {
    componentDidMount () {
        this.props.onSignout();
    }

    render () {
        return <Redirect to='/' />;
    }
}

const mapStateToProps = state => {
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
