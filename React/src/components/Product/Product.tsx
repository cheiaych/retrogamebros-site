import { FC } from 'react';
import styles from './Product.module.css';
import { Col, Container, Row, Image } from "react-bootstrap";

interface Product {
  id: number;
  name: string; 
  price: number; 
  brand: string;
  console: string; 
  productType: string; 
  description: string; 
  condition: string; 
  inStock: number;
  img: string;
}

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({product}) => (
  <Container className="text-start">
    <Row className="text-start">
      <Col lg={8} className="fs-4 fw-normal">{product.name}</Col>
      <Col xs={2} className="fs-5 fw-normal">{product.condition}</Col>
      <Col xs={2} className="fs-5 fw-normal">{(product.inStock === 0 || product.price <= 0) ? (<span className="text-danger">Sold</span>) : (`$${product.price.toFixed(2)}`) }</Col>
    </Row>
    <Row className="text-start">
      {product.description.length > 0 && (<div className='description'>{product.description}</div>)}
    </Row>
    {product.img && (
      <Row className='pt-3 pb-5'>
        <Col className='text-center'>
          <Image className='img-fluid' style={{ maxHeight: '40vh'}} src={`/uploads/products/${product.brand.toLowerCase()}/${product.img}`}></Image>
        </Col>
      </Row>)}
  </Container>
);

export default Product;
