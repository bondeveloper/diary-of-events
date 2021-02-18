import React from 'react';

import classes from './Input.module.css';

const input = props => {
    let input = null;

    switch ( props.type ) {
        case 'input':
            input = <input 
                        className={classes.Element}
                        placeholder={props.config.placeholder}
                        type={props.config.type}
                        onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    );
};

export default input;