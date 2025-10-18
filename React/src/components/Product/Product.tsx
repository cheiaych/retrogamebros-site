import { FC } from 'react';
import styles from './Product.module.css';

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
}

interface ProductProps {
  product: Product;
}

const Product: FC<ProductProps> = ({product}) => (
  <div className={styles.Product}>
    <span className='name'>{product.name}</span> 
    <span className='condition'>{product.condition}</span> 
    <span className='inStock'>{product.inStock === 0 ? `$${product.price.toFixed(2)}` : 'Sold'}</span>
    {product.description.length > 0 && (<div className='description'>{product.description}</div>)}
  </div>
);

export default Product;
