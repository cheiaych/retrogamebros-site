import React from "react"
import styles from './about.module.css';
import { Col, Container, Row } from "react-bootstrap";

function About() {
    return (
        <>
            <div className={styles.background} style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(/assets/about/header.jpg)`}}>
                <div className={styles.blurOverlay}>
                    <Container className="py-5">
                        <Row className="text-center">
                            <h1 className="display-1 fw-bold">About Us</h1>
                        </Row>
                        <Row className=" text-center pt-5">
                            <Col>
                                <img src='/assets/about/about01.jpg' className="pb-3"></img>
                                <img src='/assets/about/about02.jpg'></img>
                            </Col>
                            <Col>
                                <h2 className="display-4 fw-bold pb-3 text-start">Family Run Business</h2>
                                <p className="fs-5 fw-normal text-start">Our journey started with a small personal collection of games, and spiraled into a massive collection. My brother and I, played games growing up, and then we bought, sold, and traded our way up to having a full blown retro video game store. Growing up we played NES, Super Nintendo and Nintendo 64 regularly. NES tetris was one of our favourites, and then SNES Donkey Kong Country & Mortal Kombat II, and of course Super Mario World. Nintendo 64 later on became a true family favourite, growing up in a larger family, 4 player games became king, Mario Party, Mario Kart 64, and one of our most random favourites Destruction Derby. Now we personally collect a little bit of everything, including full size arcades, and pinball machines! At our store, we believe our passion is what sets us aside from other game stores, we truly care about our store and the experience people get from visiting us. Whether you are stopping by to shop, or just dropping by to chat about gaming and more, we are always happy to help out. Everyone gets treated like a friend here, no rush, and no pressure sales, just a friendly hello when you enter our shop! We also have a whole retro vibe going on in the store, we have CRT's playing retro 1990s/2000s commercials, and there are wall to wall games, retro console boxes, and promo display pieces everywhere.</p>
                            </Col>
                        </Row>
                        <Row className="text-center pt-5">
                            <Col>
                                <h1 className="display-3 fw-normal text-start">Key Information</h1>
                                <ul className="fs-5 text-start">
                                    <li>We only operate in store, no online orders or sales</li>
                                    <li>We only sell original hardware, games & accessories</li>
                                    <li>All items can be tested in store prior to sale</li>
                                    <li>We specialize in retro video game sales (consoles, games)</li>
                                    <li>We also have collectibles & rare gems in store</li>
                                    <li>A large amount of our inventory can be browsed online, but to see everything stop by in person</li>
                                </ul>
                            </Col>
                            <Col>
                                <h1 className="display-3 fw-normal text-start">Trade In's</h1>
                                <ul className="fs-5 text-start">
                                    <li>We accept trade in's, large & small Collections, & individual games</li>
                                    <li>We will always be happy to take a look at what you have for trade</li>
                                    <li>You must be 18+, have ID, or have a parent/Guardian present</li>
                                    <li>You can also email, call, or reach out through social media for larger collections</li>
                                    <li>We can only offer a true value in person after seeing condition/testing</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default About