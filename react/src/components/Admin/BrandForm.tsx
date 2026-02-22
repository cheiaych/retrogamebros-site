import { FC, useState, useEffect, FormEvent, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image, Table } from 'react-bootstrap';

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
    let [file, setFile] = useState <File | null>(null)
    const fileRef = useRef<HTMLInputElement | null>(null)

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

    function fileChange (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    function validBrand () {
        if (brandFormValues.name !== '') {
            return true;
        }
        else {
            return false;
        }
    }

    function loadBrand (b:Brand) {
        setFile(null);
        fileRef.current!.value = '';
        setBrandFormValues({
            id: b.id,
            name: b.name,
            img: b.img,
            isOther: b.isOther
        });
    }

    function newBrand () {
        setSelectedBrand(-1);
        setFile(null);
        fileRef.current!.value = '';
        setBrandFormValues({
            id: -1,
            name: '',
            img: '',
            isOther: 0
        });
    }

    async function saveBrand () {
        console.log(brandFormValues.name)

        const formData = new FormData();

        formData.append('name', brandFormValues.name);
        if (file) {
            formData.append('imageFile', file);
        };
        formData.append('isOther', String(brandFormValues.isOther));

        console.log(formData)

        if (brandFormValues.id === -1) {
                await fetch(`/api/admin/brand`, {
                method: 'POST',
                body: formData
            })
        }
        else {
            await fetch(`/api/admin/brand/${brandFormValues.id}`, {
                method: 'PUT',
                body: formData
            })
        }

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
            <Row className='mx-auto' style={{maxWidth: '60vw', justifyContent: 'center'}}>
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
                                <Form.Control type='file' accept='image/*' ref={fileRef} onChange={fileChange}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Button onClick={newBrand}>New Brand</Button>
                                <Button onClick={saveBrand} disabled={!validBrand()}>Save Brand</Button>
                                <Button onClick={printBrand} disabled>Delete Brand</Button>
                            </Col>
                        </Form.Group>                                              
                    </Container>
                </Col>

                <Col size={6} style={{maxHeight: '70vh', overflowY: 'auto'}}>
                    <Table>
                        <thead>
                            <tr>
                                <th><b>Brand</b></th>
                                <th><b>Other?</b></th>
                                <th><b>Image</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((b) => (
                            <tr 
                            key={b.id.toString()} 
                            onClick={() => {
                                setSelectedBrand(b.id)
                                loadBrand(b)
                            }}
                            style={{height: '40px', justifyContent: 'center'}}
                            className={selectedBrand === b.id ? 'table-active' : ''}>
                                <td>{b.name}</td>
                                <td>{b.isOther === 1 ? 'Yes' : 'No' }</td>
                                <td>{b.img? (
                                    <Image className='img-fluid' style={{ height: '30px'}} src={`/uploads/brands/${b.img}?${crypto.randomUUID()}`}></Image>
                                ) : (
                                    <div style={{ width: '30px', height: '30px' }}></div>
                                )}</td>
                            </tr>  
                        ))}
                        </tbody>
                    </Table>
                </Col>
                
                {/*<Col size={4}>
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
                </Col>*/}
            </Row>
        </>
    )
}

export default BrandForm;