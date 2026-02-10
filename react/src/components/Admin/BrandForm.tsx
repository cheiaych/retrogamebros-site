import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';

import Brand from '../Brand/Brand';

interface BrandFormProps {}

const BrandForm: FC<BrandFormProps> = () => {

    let [brands, setBrands] = useState<Brand[]>([]);
    let [brandFormValues, setBrandFormValues] = useState({
        id: -1,
        name: '',
        img: '',
        isOther: 0
    })
    let [selectedBrand, setSelectedBrand] = useState<number>(-1);

    async function fetchBrands() {
        await fetch('/api/brands')
            .then((res) => res.json())
            .then((data) => {
                setBrands(data)
            })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
    }

    useEffect(() => {
        fetchBrands();
    }, [])

    function loadBrand (b:Brand) {
        setBrandFormValues({
            id: b.id,
            name: b.name,
            img: b.img,
            isOther: b.isOther
        });
    }

    function newBrand () {

    }

    async function saveBrand () {
        console.log(brandFormValues.name)

        const formData = new FormData();

        formData.append('name', brandFormValues.name);
        formData.append('img', brandFormValues.img);
        formData.append('isOther', String(brandFormValues.isOther));

        console.log(formData)
        await fetch(`/api/admin/brand/${brandFormValues.id}`, {
            method: 'PUT',
            body: formData
        })

        console.log('Fetching Brands');
        fetchBrands();
    }

    function deleteBrand () {

    }

    function printBrand () {
        console.log (brandFormValues)
    }

    return (
        <>
            <Row>
                <Col sm={6}>
                    <Container>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}><Form.Control value={brandFormValues.id} type='text' readOnly plaintext></Form.Control></Col> 
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control value={brandFormValues.name} 
                                    onChange={e => setBrandFormValues(b => ({
                                                ...b,
                                                name: e.target.value
                                            }))} 
                                    type='text'>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Other?</Form.Label>
                            <Col sm={10} className='align-self-center'>
                                <Form.Check 
                                    checked = {brandFormValues.isOther === 1 ? true : false}
                                    onChange = {e => setBrandFormValues(b => ({
                                        ...b,
                                        isOther: e.target.checked ? 1 : 0
                                    }))}
                                ></Form.Check>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='file' accept='image/*'></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Button onClick={newBrand} disabled>New Brand</Button>
                                <Button onClick={saveBrand}>Save Brand</Button>
                                <Button onClick={printBrand} disabled>Delete Brand</Button>
                            </Col>
                        </Form.Group>                                              
                    </Container>
                </Col>

                <Col size={4}>
                    <Container style={{maxHeight: '70vh', overflowY: 'auto'}}>
                        <Row>
                            <Col><b>Name</b></Col>
                            <Col><b>Other?</b></Col>
                            <Col><b>Image</b></Col>
                        </Row>
                        {brands.map((b) => (
                            <Row
                            key={b.id.toString()}
                            onClick={() => {
                                setSelectedBrand(b.id)
                                loadBrand(b)
                            }}
                            style={{backgroundColor: selectedBrand === b.id ? '#8d8d8d' : 'transparent'}}>
                                <Col>{b.name}</Col>
                                <Col>{b.isOther}</Col>
                                <Col>{b.img? (
                                    <Image className='img-fluid' style={{ maxHeight: '30px'}} src={`/uploads/brands/${b.img}`}></Image>
                                ) : (
                                    <></>
                                )}</Col>
                            </Row>
                        ))}
                    </Container>
                </Col>
            </Row>
        </>
    )
}

export default BrandForm;