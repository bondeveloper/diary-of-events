import React from 'react';

import classes from './SideDrawer.module.css';

import Aux from '../../../hoc/Aux/Aux';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../Logo/Logo';

const sideDrawer = props => {

    let styles = [classes.SideDrawer, classes.Close];
    if (props.open) {
        styles = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={styles.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems auth={props.auth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
