import React, { FC } from 'react';
import styles from './Console.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Console {
  id: number;
  name: string; 
  brand: string;
}

interface ConsoleProps {
  console: Console;
}

const Console: FC<ConsoleProps> = ({console}) => (
  <Link to={`/products/${console.brand}/${console.name}`}>
    <div className={styles.Console}>
      <span className='name'>{console.name}</span> 
    </div>
  </Link> 
);

export default Console