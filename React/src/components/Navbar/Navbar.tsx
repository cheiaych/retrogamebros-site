import { FC, useState, useEffect, FormEvent } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {}

interface Brand {
  id: number;
  name: string;
  img: string;
  other: number;
}

const TopNavbar: FC<NavbarProps> = () => {

  const navigate = useNavigate();
  let [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch('/api/brands')
        .then((res) => res.json())
        .then((data) => {
            setBrands(data)
        })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
  }, []);
  
  function searchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get('search') as String;
    const searchString = name.trim().replace(/ /g, '+')

    navigate(`/search?name=${searchString}`);
  }

  return (
    <Navbar>
      <Container className={styles.Navbar}>
        <Navbar.Brand className='fs-1' as={Link} to='/'>Retro Game Bros</Navbar.Brand>
        <Nav variant='underline' className='fs-3'>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/About'>About</Nav.Link>
          <NavDropdown title='Inventory'>
            {brands.map((brand) => (
              <NavDropdown.Item as={Link} to={`/products/${brand.name}`}>{brand.name}</NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
        </Nav>
        <Form
        onSubmit={searchSubmit}>
          <Row>
            <Col>
              <Form.Control
              name='search' 
              type='text' 
              autoComplete='off'
              placeholder='Search'>  
              </Form.Control>
            </Col>
            <Col>
              <Button type='submit'>Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
