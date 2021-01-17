import React from 'react';

import classes from './Toolbar.module.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';

const toolbar = props => (
    
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggled}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
