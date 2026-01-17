import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Console from '../Console/Console';

interface ConsoleFormProps {}

const ConsoleForm: FC<ConsoleFormProps> = () => {

    let [consoles, setConsoles] = useState([]);
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
    })

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
                            <Console console={console}></Console>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ConsoleForm;