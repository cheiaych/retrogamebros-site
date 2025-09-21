import React, { FC, useState, useEffect } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

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
      <Navbar.Brand className='fs-1' href='/'>Retro Game Bros</Navbar.Brand>
      <Nav className='fs-3'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/About'>About</Nav.Link>
        <NavDropdown title='Inventory'>
          {brands.map((brand) => (
            <NavDropdown.Item>{brand.name}</NavDropdown.Item>
          ))}
        </NavDropdown>
        <Nav.Link href='/Contact'>Contact</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};

export default TopNavbar;
