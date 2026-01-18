import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';

interface Console {
  id: number;
  name: string; 
  brand: string;
  img: string;
  isCollectible: number;
}

interface ConsoleFormProps {}

const ConsoleForm: FC<ConsoleFormProps> = () => {
    
    let [consoles, setConsoles] = useState<Console[]>([]);
    let [consoleFormValues, setConsoleFormValues] = useState({
        id: -1,
        name: '',
        brand: '',
        img: '',
        isCollectible: 0
    })

    useEffect(() => {
        console.log(`/api/consoles`)
        fetch(`/api/consoles`)
            .then((res) => res.json())
            .then((data) => {
                setConsoles(data)
            })
        .catch((err) => console.error(`Could not fetch consoles`, err))
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type='text' readOnly plaintext></Form.Control>

                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text'></Form.Control>

                    <Form.Label>Brand</Form.Label>
                    <Form.Select></Form.Select>

                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file'></Form.Control>

                    <Form.Label>isCollectible</Form.Label>
                    <Form.Check></Form.Check>
                </Col>
                <Col>
                    <h1>ConsoleForm</h1>
                    <Row>
                        {consoles.map((console) => (
                            <span>
                                <Image className='img-fluid' style={{ maxHeight: '30px'}} src={`/uploads/consoles/${console.brand.toLowerCase()}/${console.img}`}></Image>
                                {console.id} {console.name} {console.brand} {console.isCollectible}
                            </span>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ConsoleForm;