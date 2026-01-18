import React, { FC } from 'react';
import styles from './Console.module.css';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Console {
  id: number;
  name: string; 
  brand: string;
  img: string;
  isCollectible: number;
}

interface ConsoleProps {
  console: Console;
}

const Console: FC<ConsoleProps> = ({console}) => (
  <Link to={`/products/${console.brand}/${console.name}`} style={{ textDecoration: 'none', color: 'black' }}>
    <Container className="text-center">
      <Row>
        <Col className="display-6 fw-normal pt-3">{console.name}</Col>
      </Row>
      {console.img ? (
        <Row className='pt-3 pb-4'>
          <Col className='text-center'>
            <Image className='img-fluid' style={{ maxHeight: '30vh'}} src={`/uploads/consoles/${console.brand.toLowerCase()}/${console.img}`}></Image>
          </Col>
        </Row>
      ) : (
        <Row>
          <div style={{ width: '200px', height: '200px' }}></div>
        </Row>
      )}
    </Container>
  </Link> 
);

export default Console