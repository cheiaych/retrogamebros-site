import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';

interface Brand {
  id: number;
  name: string; 
  img: string;
  isOther: number;
}

interface BrandFormProps {}

const BrandForm: FC<BrandFormProps> = () => {

    let [brands, setBrands] = useState<Brand[]>([]);
    let [brandFormValues, setBrandFormValues] = useState({
        id: -1,
        name: '',
        img: '',
        isOther: 0
    })

    useEffect(() => {
        fetch('/api/brands')
        .then((res) => res.json())
        .then((data) => {
            setBrands(data)
        })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type='text' readOnly plaintext></Form.Control>

                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text'></Form.Control>

                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file'></Form.Control>

                    <Form.Label>isOther</Form.Label>
                    <Form.Check></Form.Check>
                </Col>
                <Col>
                    <Row>
                        {brands.map((brand) => (
                            <span>
                                <Image className='img-fluid' style={{ maxHeight: '30px'}} src={`/uploads/brands/${brand.img}`}></Image>
                                {brand.id} {brand.name} {brand.isOther}
                            </span> 
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default BrandForm;