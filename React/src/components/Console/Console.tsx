import React, { FC } from 'react';
import styles from './Console.module.css';
import { Image } from 'react-bootstrap';
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
    <div className={`${styles.Console} text-center p-10`}>
      <div>
        <Image src={`../../assets/consoles/${console.img}`} height="200px"></Image>
      </div>
      <h3 className="display-6 fw-normal pt-3">{console.name}</h3>
    </div>
  </Link> 
);

export default Console