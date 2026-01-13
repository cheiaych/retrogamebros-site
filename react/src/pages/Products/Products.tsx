import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Product from "../../components/Product/Product";
import styles from './Products.module.css'
import { Col, Container, Row } from "react-bootstrap";

function Products() {

    let { brand, con } = useParams();
    let [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/${brand}/${con}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                console.log(products)
            })
            .catch((err) => console.error(`Could not fetch games for ${con}: `, err))
    }, [brand, con]);

    const productGroups = {
        Accessories: [],
        Consoles: [],
        Controllers: [],
        Games: [],
        Others: []
    };

    const sectionOrder = ['Consoles', 'Controllers', 'Accessories', 'Games', 'Others']

    products.forEach( p => {
        console.log(p['productType']);
        switch ((p['productType'] as String).toLowerCase()) {
            case 'accessory':
                productGroups['Accessories'].push(p);
                break;
            case 'console':
                productGroups['Consoles'].push(p);
                break;
            case 'controller':
                productGroups['Controllers'].push(p);
                break;
            case 'game':
                productGroups['Games'].push(p);
                break;
            default:
                productGroups['Others'].push(p);
                break;
        }
    })

    return (
        <>
            <div className={styles.background} style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1)), url()`}}>
                    <div className={styles.blurOverlay}>
                        <Container className="py-5">
                            <Row className="text-center">
                                <h1 className="display-3 fw-bold">{con}</h1>
                            </Row>
                            {
                                sectionOrder.map(section => {
                                    const items = (productGroups as any)[section];
                                    if (items.length < 1) {
                                        return null;
                                    }

                                    return (
                                    <>
                                        <Row className="text-center py-3">
                                            <h3 className="display-5 fw-normal pt-3">{section}</h3>
                                        </Row>
                                        <Container>
                                            <Row md={2} sm={1} xs={1} className="g-5 justify-content-start">
                                                {items.map((i: Product) => (<Col><Product product={i}/></Col>))}
                                            </Row>
                                        </Container>
                                    </>    
                                    )
                                })
                            }
                        </Container>
                </div>
            </div>
        </>
    )
}

export default Products