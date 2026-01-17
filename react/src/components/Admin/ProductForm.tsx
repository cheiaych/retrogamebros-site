import { FC, useState, useEffect, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = () => {

    let [productFormValues, setProductFormValues] = useState({
        id: -1,
        name: '',
        price: 0,
        brand: '',
        console: '',
        productType: '',
        description: '',
        conditions: '',
        inStock: 0,
        img: ''
    });

    useEffect(() => {
        
    })

    return (
        <>
            <div>
                <Form.Label>ID</Form.Label>
                <Form.Control type='text' readOnly plaintext></Form.Control>

                <Form.Label>Name</Form.Label>
                <Form.Control type='text'></Form.Control>

                <Form.Label>Price</Form.Label>
                <Form.Control type='text'></Form.Control>

                <Form.Label>Brand</Form.Label>
                <Form.Select></Form.Select>

                <Form.Label>Console</Form.Label>
                <Form.Select></Form.Select>

                <Form.Label>ProductType</Form.Label>
                <Form.Select></Form.Select>

                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={2}></Form.Control>

                <Form.Label>inStock</Form.Label>
                <Form.Check></Form.Check>

                <Form.Label>Image</Form.Label>
                <Form.Control type='file'></Form.Control>
            </div>
        </>
    );
}

export default ProductForm;