import React, { FC } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

interface NavbarProps {}

const TopNavbar: FC<NavbarProps> = () => (
  <Navbar>
    <Container className={styles.Navbar}>
      <Navbar.Brand className='fs-1' href='/'>Retro Game Bros</Navbar.Brand>
      <Nav className='fs-3'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/About'>About</Nav.Link>
        <NavDropdown title='Inventory'>
          <NavDropdown.Item>Nintendo</NavDropdown.Item>
          <NavDropdown.Item>Xbox</NavDropdown.Item>
          <NavDropdown.Item>Sony</NavDropdown.Item>
          <NavDropdown.Item>Sega</NavDropdown.Item>
          <NavDropdown.Item>Other Systems</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/Contact'>Contact</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default TopNavbar;
