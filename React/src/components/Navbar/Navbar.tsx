import React, { FC, useState, useEffect } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import { link } from 'fs';

interface NavbarProps {}

interface Brand {
  id: number;
  name: string;
}

const TopNavbar: FC<NavbarProps> = () => {

  let [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
          const query = window.location.search
          console.log('Query: ' + query)
          fetch('/api/brands' + query)
              .then((res) => res.json())
              .then((data) => {
                  setBrands(data)
              })
              .catch((err) => console.error("Could not Fetch Brands: ", err))
      }, []);

  return (
    <Navbar>
      <Container className={styles.Navbar}>
        <Navbar.Brand className='fs-1' as={Link} to='/'>Retro Game Bros</Navbar.Brand>
        <Nav className='fs-3'>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/About'>About</Nav.Link>
          <NavDropdown title='Inventory'>
            {brands.map((brand) => (
              <NavDropdown.Item as={Link} to={`/products/${brand.name}`}>{brand.name}</NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
