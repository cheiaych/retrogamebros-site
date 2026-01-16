import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';


interface BrandFormProps {}

const BrandForm: FC<BrandFormProps> = () => {

    let [brandFormValues, setBrandFormValues] = useState({
        id: -1,
        name: '',
        img: '',
        isOther: 0
    })

    return (
        <>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' readOnly plaintext></Form.Control>

            <Form.Label>Name</Form.Label>
            <Form.Control type='text'></Form.Control>

            <Form.Label>Image</Form.Label>
            <Form.Control type='file'></Form.Control>

            <Form.Label>isOther</Form.Label>
            <Form.Check></Form.Check>
        </>
    )
}

export default BrandForm;