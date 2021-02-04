import React from 'react';
import Nav from 'react-bootstrap/Nav';

const nav = props => {
    const links = props.auth ? (
        <Nav.Link href='/workouts'>Workouts</Nav.Link>
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