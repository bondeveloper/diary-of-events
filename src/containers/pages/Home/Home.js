import React, { Component } from 'react';

import Signup from '../../../components/Auth/Signup/Signup';
import classes from './Home.module.css';


class Home extends Component {
    render () {
        return (
            <div className={classes.Home}>
                <div className={classes.Signup}>
                    <Signup />
                </div>
            </div>

        );
    };
};

export default Home;