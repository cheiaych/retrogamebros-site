import React from "react";
import styles from './home.module.css';

function Home() {
    return (
        <div className={styles.header}>
            <div className={styles.headerBackground}></div>
            <div className={`${styles.title} text-center`}>
                <h1 className={`${styles.titleName} fw-bold`}>Retro Game Bros</h1>
                <h1 className="display-3 fw-normal">Buy-Sell-Trade</h1>
                <h1 className="display-3 fw-normal">Retro to Next Gen</h1>
                <p className={`${styles.titleP} fs-4 fw-normal`}>Stop by and experience a blast from the past with Retro Game Bros!<br></br>One of the highest rated game stores in Toronto! We strive to provide a large variety of games, at competitive prices!</p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Home