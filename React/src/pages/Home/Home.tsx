import React from "react";
import styles from './home.module.css';
import { Col, Container, Row } from "react-bootstrap";

function Home() {

    return (
        <>
            <div className={styles.background} style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url(/assets/home/header.jpg)`}}>
                <div className={styles.blurOverlay}>
                    <Container className="py-5">
                        <Row className="text-center">
                            <h1 className="display-3 fw-bold">Retro Game Bros</h1>
                            <h2 className="display-5 fw-bold pt-3">Buy-Sell-Trade</h2>
                            <h2 className="display-5 fw-bold">Retro to Next Gen</h2>
                            <p className="fs-3 fw-normal text-justify pt-3">Stop by and experience a blast from the past with Retro Game Bros!<br></br>One of the highest rated game stores in Toronto!<br></br>We strive to provide a large variety of games, at competitive prices!</p>
                        </Row>
                        <Row className="text-center pt-5">
                            <Col className="pr-3">
                                <img src='/assets/home/collage01.jpg'></img>
                                <div className="px-5">
                                    <h3 className="display-5 fw-normal text-start pt-3">What we sell</h3>
                                    <p className="fs-5 fw-normal text-start">We specialize in everything retro, and all the way up to next gen. Whether it be classics like NES, SNES, SEGA, N64, XBOX, and Playstation, we got a wide variety. We carry retro games, systems, and accessories across all platforms. You can browse our inventory online and call ahead to confirm availability as well. We are old school just like our games, so we only sell in store (not online), come stop by and check out our selection in person!</p>
                                </div>
                            </Col>
                            <Col className="pl-3">
                                <img src='/assets/home/collage02.jpg'></img>
                                <div className="px-5">
                                    <h3 className="display-5 fw-normal text-start pt-3">How we operate</h3>
                                    <p className="fs-5 fw-normal text-start">In our specialized store, we sell retro consoles, games and accessories. We personally test every single item in our store, and can demonstrate it working prior to sale. We understand when buying retro games and consoles, everyone wants to make sure the item is in good working condition. That is why we do not offer online sales/orders, we choose to provide an in store experience only. We are retro just like our products, so stop by, check them out, and test them before making your purchase.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Home