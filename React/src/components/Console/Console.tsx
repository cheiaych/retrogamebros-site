import React, { FC } from 'react';
import styles from './Console.module.css';

interface Console {
  id: number;
  name: string; 
  brand: string;
}

interface ConsoleProps {
  console: Console;
}

const Console: FC<ConsoleProps> = ({console}) => (
  <div className={styles.Console}>
    <span className='name'>{console.name}</span> 
  </div>
);

export default Console