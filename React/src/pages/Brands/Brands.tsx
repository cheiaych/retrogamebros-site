import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Brand from "../../components/Brand/Brand";
import { Col, Container, Row } from "react-bootstrap";

function Brands() {

    let { brand } = useParams();
    let [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        fetch('/api/brands')
            .then((res) => res.json())
            .then((data) => {
                setBrands(data)
                //console.log(data)
            })
            .catch((err) => console.error(`Could not fetch consoles for ${brand}: `, err))
    }, [brand]);

    const regularBrands = brands.filter(b => b.isOther === 0);
    const otherBrands = brands.filter(b => b.isOther === 1);

    return (
        <>
            <Container className="py-5">
                <Row className="text-center">
                    <h1 className="display-1 fw-bold">Brands</h1>
                </Row>
                <Row xs={3} className="g-3">
                    {regularBrands.map((brand) => (
                    <Col className="py-5">
                        <Brand brand={brand}/>
                    </Col>   
                    ))}
                </Row>
            </Container>
        </>   
    )
}

export default Brands