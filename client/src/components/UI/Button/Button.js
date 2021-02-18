import React from 'react';
import classes from './Button.module.css';
import Button from 'react-bootstrap/Button';

const button = props => {
    switch ( props.type ) {
        case 'Success' :

    }
    return (
        <Button variant='danger'         
            onClick={props.clicked}>
            {props.children}
        </Button>
    )
}

export default button;