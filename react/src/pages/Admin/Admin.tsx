import React, { FC, useState, useEffect, FormEvent } from 'react';
import { postItem, getItems } from '../../DB'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

import ProductForm from "../../components/Admin/ProductForm";
import BrandForm from '../../components/Admin/BrandForm';
import ConsoleForm from '../../components/Admin/ConsoleForm';

function Admin () {

    const [authorized, setAuthorized] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/admin/check')
        .then(res => {
            if (res.ok) {
                setAuthorized(true)
            }
            else {
                setShowLogin(true)
            }
        })
    }, []);

    async function adminLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const password = formData.get('password') as String;

        const res = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            setAuthorized(true);
            setShowLogin(false);
            formData.set('password', '') ;
        }
        else {
            setError('Incorrect Password');
        }
    }

    return (
        <>
            {showLogin && (
                <div>
                    <div>
                        <h2>Admin Access</h2>
                        <Form onSubmit={adminLogin}>
                            <Row>
                                <Col>
                                <InputGroup>
                                    <Form.Control
                                    name='password' 
                                    type='password' 
                                    autoComplete='off'
                                    placeholder='Password'
                                    >  
                                    </Form.Control>
                                    <Button type='submit'>Search</Button>
                                </InputGroup>
                                </Col>
                            </Row>
                        </Form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
            {authorized && (
                <div className="Admin">
                    <BrandForm></BrandForm>
                </div>
            )}
        </>
    );
}

export default Admin