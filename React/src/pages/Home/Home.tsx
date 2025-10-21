import React from "react";
import styles from './home.module.css';

function Home() {

    return (
        <>
            <div className={styles.background} style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(/assets/home/header.jpg)`}}>
                <div className={styles.blurOverlay}>
                    <div className={`${styles.title} text-center`}>
                        <h1 className={`${styles.titleName} fw-bold`}>Retro Game Bros</h1>
                        <h1 className="display-3 fw-normal">Buy-Sell-Trade</h1>
                        <h1 className="display-3 fw-normal">Retro to Next Gen</h1>
                        <p className={`${styles.titleP} fs-4 fw-normal`}>Stop by and experience a blast from the past with Retro Game Bros!<br></br>One of the highest rated game stores in Toronto! We strive to provide a large variety of games, at competitive prices!</p>
                    </div>
                    <div className={`${styles.body} text-center`}>
                        <div>
                            <img src='/assets/home/collage01.jpg'></img>
                            <h1 className="display-3 fw-normal">What we sell</h1>
                            <p className="display-4 fw-normal">We specialize in everything retro, and all the way up to next gen. Whether it be classics like NES, SNES, SEGA, N64, XBOX, and Playstation, we got a wide variety. We carry retro games, systems, and accessories across all platforms. You can browse our inventory online and call ahead to confirm availability as well. We are old school just like our games, so we only sell in store (not online), come stop by and check out our selection in person!</p>
                        </div>
                        <div>
                            <img src='/assets/home/collage02.jpg'></img>
                            <h1 className="display-3 fw-normal">How we operate</h1>
                            <p className="display-4 fw-normal">In our specialized store, we sell retro consoles, games and accessories. We personally test every single item in our store, and can demonstrate it working prior to sale. We understand when buying retro games and consoles, everyone wants to make sure the item is in good working condition. That is why we do not offer online sales/orders, we choose to provide an in store experience only. We are retro just like our products, so stop by, check them out, and test them before making your purchase.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home