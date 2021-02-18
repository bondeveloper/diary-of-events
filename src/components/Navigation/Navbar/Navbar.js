import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from '../Navbar/Nav/Nav';

import classes from './Navbar.module.css';

const navbar = props => (
    <Navbar bg="light" variant="light" expand="sm" collapseOnSelect>
        <Navbar.Brand href="/">
            <img
                src="/favicon.ico"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav auth={props.auth}/>
      </Navbar.Collapse>
    </Navbar>
);

export default navbar;
