import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Layout extends Component {
    state = {
        showDrawer: false
    }

    drawerToggledHandler = () => {
        this.setState( prevState => {
            return { showDrawer:  !prevState.showDrawer }
        });
    }

    drawerClosedHandler = () => {
        this.setState( { showDrawer:  false });
    }

    render () {
        return (
            <Aux>
                <Navbar drawerToggled={this.drawerToggledHandler} auth={this.props.auth} />
                <SideDrawer open={this.state.showDrawer} closed={this.drawerClosedHandler} auth={this.props.auth}/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.signin.token !== null
    }
}

export default connect( mapStateToProps ) ( Layout );