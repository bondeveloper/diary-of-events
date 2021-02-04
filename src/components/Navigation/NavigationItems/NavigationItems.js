import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    const navigationItems = props.auth ? (
        <NavigationItem link='/workouts'>Workouts</NavigationItem>
    ) : (
        <NavigationItem link='/' exact>Home</NavigationItem>
    );

    return (
        <ul className={classes.NavigationItems}>      
            { navigationItems }
        </ul>
    );
    
}
export default navigationItems;