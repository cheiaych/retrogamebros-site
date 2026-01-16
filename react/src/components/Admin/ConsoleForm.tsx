import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

interface ConsoleFormProps {}

const ConsoleForm: FC<ConsoleFormProps> = () => {

    let [consoleFormValues, setConsoleFormValues] = useState({
        id: -1,
        name: '',
        brand: '',
        img: '',
        isCollectible: 0
    })

    return (
        <>
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
        </>
    )
}

export default ConsoleForm;