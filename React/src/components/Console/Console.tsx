import React, { FC } from 'react';
import styles from './Console.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
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
  <Link to={`/products/${console.brand}/${console.name}`}>
    <div className={styles.Console}>
      <div>
        <img src={`../../assets/consoles/${console.img}`}></img>
      </div>
      <div className='name'>{console.name}</div> 
    </div>
  </Link> 
);

export default Console