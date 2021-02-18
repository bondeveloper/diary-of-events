import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Aux from '../../../../hoc/Aux/Aux';

const nav = props => {
    const links = props.auth ? (
        <Aux>
            <Nav.Link href='/'>Workouts</Nav.Link>
            <Nav.Link href='/signout'>signout</Nav.Link>
        </Aux>
    ) : (
        <Nav.Link href='/' exact='true'>Home</Nav.Link>
    );
    return (
        <Nav className="ml-auto">
            { links }
        </Nav>
    );
}

export default nav;
