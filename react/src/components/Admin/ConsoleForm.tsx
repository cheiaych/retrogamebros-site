import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';

import Console from '../Console/Console';
import Brand from '../Brand/Brand';

interface ConsoleFormProps {}

const ConsoleForm: FC<ConsoleFormProps> = () => {
    
    let [consoles, setConsoles] = useState<Console[]>([]);
    let [consoleFormValues, setConsoleFormValues] = useState<Console>({
        id: -1,
        name: '',
        brand: '',
        img: '',
        isCollectible: 0
    });
    let [brands, setBrands] = useState<Brand[]>([]);
    let [selectedConsole, setSelectedConsole] = useState<number>(-1);

    useEffect(() => {
        console.log(`/api/consoles`)
        fetch(`/api/consoles`)
            .then((res) => res.json())
            .then((data) => {
                setConsoles(data)
            })
        .catch((err) => console.error(`Could not fetch consoles`, err))

        fetch('/api/brands')
            .then((res) => res.json())
            .then((data) => {
                setBrands(data)
            })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
    }, [])

    function loadConsole (c: Console) {
        setConsoleFormValues({
            id: c.id,
            name: c.name,
            brand: c.brand,
            img: `/uploads/consoles/${c.brand.toLowerCase()}/${c.img}`,
            isCollectible: c.isCollectible
        });
    }

    function newConsole () {

    }

    function saveConsole () {
        console.log (consoleFormValues)
    }

    function deleteConsole () {

    }

    function printConsole () {
        console.log (consoleFormValues)
    }

    return (
        <>
            <Row>
                <Col size={4}>
                    <Container>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}><Form.Control value={consoleFormValues.id} type='text' readOnly plaintext></Form.Control></Col> 
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}><Form.Control value={consoleFormValues.name} type='text'></Form.Control></Col>
                        </Form.Group>       

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Brand</Form.Label>
                            <Col sm={10}>
                                <Form.Select value={consoleFormValues.brand}
                                    onChange = {e => setConsoleFormValues(c => ({
                                            ...c,
                                            brand: e.target.value
                                        }))
                                    }>
                                    <option value=''>Select Brand...</option>
                                    {brands.map((b) => (
                                        <option value={b.name}>{b.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>  

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Collectible?</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    checked = {consoleFormValues.isCollectible === 1 ? true : false}
                                    onChange = {e => setConsoleFormValues(c => ({
                                        ...c,
                                        isCollectible: e.target.checked ? 1 : 0
                                    }))}
                                ></Form.Check>
                            </Col>
                        </Form.Group>  

                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='file'></Form.Control>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Button onClick={newConsole}>New Console</Button>
                                <Button onClick={saveConsole}>Save Console</Button>
                                {/*<Button onClick={printConsole}>Delete Console</Button>*/}
                            </Col>
                        </Form.Group>
                    </Container>
                </Col>

                <Col size={4}>
                    <Container style={{maxHeight: '70vh', overflowY: 'auto'}}>
                        {consoles.map((c) => (
                            <Row 
                            key={c.id.toString()} 
                            onClick={() => {
                                setSelectedConsole(c.id)
                                loadConsole(c)
                                }}
                            style={{backgroundColor: selectedConsole === c.id ? '#8d8d8d' : 'transparent'}}>
                                <Col>{c.name}</Col>
                                <Col>{c.brand}</Col>
                                <Col>{c.isCollectible}</Col>
                                <Col>{c.img? (
                                    <Image className='img-fluid' style={{ maxHeight: '30px'}} src={`/uploads/consoles/${c.brand.toLowerCase()}/${c.img}`}></Image>
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

export default ConsoleForm;