import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Console from "../../components/Console/Console";
import { Col, Container, Row } from "react-bootstrap";

function Consoles() {

    let { brand } = useParams();
    let [consoles, setConsoles] = useState([]);

    useEffect(() => {
        console.log(`/api/${brand}`)
        fetch(`/api/${brand}`)
            .then((res) => res.json())
            .then((data) => {
                setConsoles(data)
                //console.log(data)
            })
            .catch((err) => console.error(`Could not fetch consoles for ${brand}: `, err))
    }, [brand]);

    return (
        <>
            <Container className="py-5">
                <Row className="text-center">
                    <h1 className="display-3 fw-bold">{brand}</h1>
                </Row>
                <Row md={3} sm={1} xs={1} className="g-3">
                    {consoles.map((console) => (
                    <Col className="py-5">
                        <Console console={console}/>
                    </Col>   
                    ))}
                </Row>
            </Container>
        </>   
    )
}

export default Consoles