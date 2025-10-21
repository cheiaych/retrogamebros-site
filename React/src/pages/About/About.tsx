import React from "react"
import styles from './about.module.css';

function About() {
    return (
        <>
            <div className={styles.background} style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(/assets/about/header.jpg)`}}>
                <div className={styles.blurOverlay}>
                    <div className={`${styles.title} text-center`}>
                        <h1 className={`${styles.titleName} fw-bold`}>About Us</h1>
                    </div>
                    <div>
                        <h1 className="display-3 fw-normal">Family Run Business</h1>
                        <p className={`${styles.titleP} fs-4 fw-normal`}>Our journey started with a small personal collection of games, and spiraled into a massive collection. My brother and I, played games growing up, and then we bought, sold, and traded our way up to having a full blown retro video game store. Growing up we played NES, Super Nintendo and Nintendo 64 regularly. NES tetris was one of our favourites, and then SNES Donkey Kong Country & Mortal Kombat II, and of course Super Mario World. Nintendo 64 later on became a true family favourite, growing up in a larger family, 4 player games became king, Mario Party, Mario Kart 64, and one of our most random favourites Destruction Derby. Now we personally collect a little bit of everything, including full size arcades, and pinball machines! At our store, we believe our passion is what sets us aside from other game stores, we truly care about our store and the experience people get from visiting us. Whether you are stopping by to shop, or just dropping by to chat about gaming and more, we are always happy to help out. Everyone gets treated like a friend here, no rush, and no pressure sales, just a friendly hello when you enter our shop! We also have a whole retro vibe going on in the store, we have CRT's playing retro 1990s/2000s commercials, and there are wall to wall games, retro console boxes, and promo display pieces everywhere.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About