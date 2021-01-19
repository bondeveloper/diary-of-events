import React, { Component } from 'react';
import Aux from '../Aux/Aux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggled={this.drawerToggledHandler}/>
                <SideDrawer open={this.state.showDrawer} closed={this.drawerClosedHandler}/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

export default Layout