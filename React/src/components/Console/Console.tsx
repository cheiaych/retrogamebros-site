import React, { FC } from 'react';
import styles from './Console.module.css';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Console {
  id: number;
  name: string; 
  brand: string;
  img: string;
}

interface ConsoleProps {
  console: Console;
}

const Console: FC<ConsoleProps> = ({console}) => (
  <Link to={`/products/${console.brand}/${console.name}`} style={{ textDecoration: 'none', color: 'black' }}>
    <Container className="text-center">
      {console.img ? (
        <Row>
          <Col>
            <Image height="200px" width="auto" src={`/assets/consoles/${console.brand.toLowerCase()}/${console.img}`}></Image>
          </Col>
        </Row>
      ) : (
        <Row>
          <div style={{ width: '200px', height: '200px' }}></div>
        </Row>
      )}
      <Row>
        <Col className="display-6 fw-normal pt-3">{console.name}</Col>
      </Row>
    </Container>
  </Link> 
);

export default Console