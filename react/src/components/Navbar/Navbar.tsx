import { FC, useState, useEffect, FormEvent } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Brand from '../Brand/Brand';

interface NavbarProps {}

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

  const regularBrands = brands.filter(b => b.isOther === 0);
  const otherBrands = brands.filter(b => b.isOther === 1);
  
  function searchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const name = formData.get('search') as String;
    const searchString = name.trim().replace(/ /g, '+')

    navigate(`/search?name=${searchString}`);
  }

  return (
    <Navbar collapseOnSelect expand='lg'>
      <Container className={styles.Navbar}>
        <Navbar.Brand className='fs-3' as={Link} to='/'>Retro Game Bros</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className='fs-5'>
            <Nav.Link as={Link} to='/' eventKey={1}>Home</Nav.Link>
            <Nav.Link as={Link} to='/About' eventKey={2}>About</Nav.Link>
            <NavDropdown title='Inventory'>
              {regularBrands.map((brand) => (
                <NavDropdown.Item as={Link} to={`/products/${brand.name}`} eventKey={4 + brand.id}>{brand.name}</NavDropdown.Item>
              ))}
              <NavDropdown title='Other Brands' drop="end">
                {otherBrands.map((brand) => (
                  <NavDropdown.Item as={Link} to={`/products/${brand.name}`} eventKey={4 + brand.id}>{brand.name}</NavDropdown.Item>
                ))}
              </NavDropdown>
            </NavDropdown>
            <Nav.Link as={Link} to='/Contact' eventKey={3}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form onSubmit={searchSubmit}>
          <Row className={styles.searchbar}>
            <Col>
              <InputGroup>
                <Form.Control
                name='search' 
                type='text' 
                autoComplete='off'
                placeholder='Search'
                className={styles.searchinput}>  
                </Form.Control>
                <Button type='submit' className={styles.searchbutton}>Search</Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>
        <Navbar.Toggle className=''/>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
