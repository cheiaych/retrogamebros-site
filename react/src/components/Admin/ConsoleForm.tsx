import { FC, useState, useEffect, FormEvent, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Image, Table } from 'react-bootstrap';

import Console from '../Console/Console';
import Brand from '../Brand/Brand';

interface ConsoleFormProps {}

const ConsoleForm: FC<ConsoleFormProps> = () => {
    
    let [consoles, setConsoles] = useState<Console[]>([]);
    let [consoleFormValues, setConsoleFormValues] = useState<Console>({
        id: -1,
        name: '',
        brand: '',
        brandId: -1,
        img: '',
        isCollectible: 0
    });
    let [brands, setBrands] = useState<Brand[]>([]);
    let [selectedConsole, setSelectedConsole] = useState<number>(-1);
    let [file, setFile] = useState <File | null>(null)
    const fileRef = useRef<HTMLInputElement | null>(null)

    async function fetchConsoles() {
        console.log(`/api/consoles`)
        await fetch(`/api/consoles`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setConsoles(data)
            })
        .catch((err) => console.error(`Could not fetch consoles`, err))
    }

    async function fetchBrands() {
        await fetch('/api/brands')
            .then((res) => res.json())
            .then((data) => {
                setBrands(data)
            })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
    }

    useEffect(() => {
        fetchConsoles();
        fetchBrands();
    }, [])

    function fileChange (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    function validConsole () {
        if (consoleFormValues.name !== '' && consoleFormValues.brandId !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function loadConsole (c: Console) {
        setFile(null);
        fileRef.current!.value = '';
        setConsoleFormValues({
            id: c.id,
            name: c.name,
            brand: c.brand,
            brandId: c.brandId,
            img: c.img,
            isCollectible: c.isCollectible
        });
    }

    function newConsole () {
        setSelectedConsole(-1);
        setFile(null);
        fileRef.current!.value = '';
        setConsoleFormValues({
            id: -1,
            name: '',
            brand: '',
            brandId: -1,
            img: '',
            isCollectible: 0
        });
    }

    async function saveConsole () {
        console.log(consoleFormValues.name)

        const formData = new FormData();

        formData.append('name', consoleFormValues.name);
        formData.append('brand', String(consoleFormValues.brandId));
        
        if (file) {
            formData.append('imageFile', file);
        };
        formData.append('isCollectible', String(consoleFormValues.isCollectible));

        console.log (formData)
        if (consoleFormValues.id === -1) {
            await fetch(`/api/admin/console`, {
                method: 'POST',
                body: formData
            });
        }
        else {
            await fetch(`/api/admin/console/${consoleFormValues.id}`, {
                method: 'PUT',
                body: formData
            });
        }

        console.log('Fetching consoles')
        fetchConsoles();
    }

    function deleteConsole () {

    }

    function printConsole () {
        console.log (consoleFormValues)
    }

    return (
        <>
            <Row className='mx-auto' style={{maxWidth: '60vw', justifyContent: 'center'}}>
                <Col sm={6}>
                    <Container>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}><Form.Control value={consoleFormValues.id} type='text' readOnly plaintext></Form.Control></Col> 
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control value={consoleFormValues.name} 
                                    onChange={e => setConsoleFormValues(c => ({
                                                ...c,
                                                name: e.target.value
                                            }))} 
                                    type='text'>
                                </Form.Control>
                            </Col>
                        </Form.Group>       

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Brand</Form.Label>
                            <Col sm={10}>
                                <Form.Select value={consoleFormValues.brandId}
                                    onChange = {e => setConsoleFormValues(c => ({
                                            ...c,
                                            brandId: parseInt(e.target.value)
                                        }))
                                    }>
                                    <option value=''>Select Brand...</option>
                                    {brands.map((b) => (
                                        <option value={b.id}>{b.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>  

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Collectible?</Form.Label>
                            <Col sm={10} className='align-self-center'>
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
                                <Form.Control type='file' accept='image/*' ref={fileRef} onChange={fileChange}></Form.Control>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Col sm={10}>
                                <Button onClick={newConsole}>New Console</Button>
                                <Button onClick={saveConsole} disabled={!validConsole()}>Save Console</Button>
                                <Button onClick={printConsole} disabled>Delete Console</Button>
                            </Col>
                        </Form.Group>
                    </Container>
                </Col>

                <Col size={6} style={{maxHeight: '70vh', overflowY: 'auto'}}>
                    <Table>
                        <thead>
                            <tr>
                                <th><b>Console</b></th>
                                <th><b>Brand</b></th>
                                <th><b>Collectible?</b></th>
                                <th><b>Image</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoles.map((c) => (
                            <tr 
                            key={c.id.toString()} 
                            onClick={() => {
                                setSelectedConsole(c.id)
                                loadConsole(c)
                            }}
                            style={{height: '40px', justifyContent: 'center'}}
                            className={selectedConsole === c.id ? 'table-active' : ''}>
                                <td>{c.name}</td>
                                <td>{c.brand}</td>
                                <td>{c.isCollectible === 1 ? 'Yes' : 'No' }</td>
                                <td>{c.img? (
                                    <Image className='img-fluid' style={{ height: '30px'}} src={`/uploads/consoles/${c.img}?${crypto.randomUUID()}`}></Image>
                                ) : (
                                    <div style={{ width: '30px', height: '30px' }}></div>
                                )}</td>
                            </tr>  
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default ConsoleForm;