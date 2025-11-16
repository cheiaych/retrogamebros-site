import React, { FC } from 'react';
import styles from './Console.module.css';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Brand {
  id: number;
  name: string; 
  img: string;
  isOther: number;
}

interface BrandProps {
  brand: Brand;
}

const Brand: FC<BrandProps> = ({brand}) => (
  <Link to={`/products/${brand.name}`} style={{ textDecoration: 'none', color: 'black' }}>
    <Container className="text-center">
      {brand.img ? (
        <Row>
          <Col>
            <Image height="200px" width="auto" src={`/uploads/brands/${brand.img}`}></Image>
          </Col>
        </Row>
      ) : (
        <Row>
          <div style={{ width: '200px', height: '200px' }}></div>
        </Row>
      )}
      <Row>
        <Col className="display-6 fw-normal pt-3">{brand.name}</Col>
      </Row>
    </Container>
  </Link> 
);

export default Brand