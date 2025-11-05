import { FC, useState, useEffect, FormEvent } from 'react';
import styles from './Navbar.module.css';

import { Nav, Navbar, NavDropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {

  useEffect(() => {

  }, []);

  return (
    <>
        <Container>
            <Row>
                <Col>
                    © Copyright retrogamebros  
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default Footer;
