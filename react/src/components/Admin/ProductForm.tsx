import { FC, useState, useEffect, FormEvent, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Table, Image } from 'react-bootstrap';

import Product from '../Product/Product';
import Brand from '../Brand/Brand';
import Console from '../Console/Console';

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = () => {

    let [products, setProducts] = useState<Product[]>([]);
    let [productFormValues, setProductFormValues] = useState<Product>({
        id: -1,
        name: '',
        price: 0,
        brand: '',
        brandId: -1,
        console: '',
        consoleId: -1,
        productType: '',
        description: '',
        condition: '',
        inStock: 0,
        img: ''
    });
    let [brands, setBrands] = useState<Brand[]>([]);
    let [consoles, setConsoles] = useState<Console[]>([]);
    let [selectedProduct, setSelectedProduct] = useState<number>(-1);
    let [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    let [query, setQuery] = useState("");

    async function fetchProducts() {
        console.log(`/api/search?name=${query}`);
        await fetch(`/api/search?name=${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
        .catch((err) => console.error(`Could not fetch products`, err));
    }

    async function fetchBrands() {
        await fetch('/api/brands')
            .then((res) => res.json())
            .then((data) => {
                setBrands(data)
            })
        .catch((err) => console.error("Could not Fetch Brands: ", err))
    }

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

    useEffect(() => {
        console.log('Fetching Products')
        fetchProducts();
        fetchConsoles();
        fetchBrands();
    }, [])

    function fileChange (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    function validProduct () {
        if (productFormValues.name !== '' && productFormValues.brandId !== -1 && productFormValues.consoleId !== -1 && productFormValues.productType !== '' && productFormValues.condition !== '') {
            return true;
        }
        else {
            return false;
        }
    }

    function loadProduct (p: Product) {
        setFile(null);
        fileRef.current!.value = '';
        setProductFormValues({
            id: p.id,
            name: p.name,
            price: p.price,
            brand: p.brand,
            brandId: p.brandId,
            console: p.console,
            consoleId: p.consoleId,
            productType: p.productType,
            description: p.description,
            condition: p.condition,
            inStock: p.inStock,
            img: p.img
        });
    }

    function newProduct () {
        setFile(null);
        fileRef.current!.value = '';
        setProductFormValues({
            id: -1,
            name: '',
            price: 0.00,
            brand: '',
            brandId: -1,
            console: '',
            consoleId: -1,
            productType: '',
            description: '',
            condition: '',
            inStock: 0,
            img: ''
        });
    }

    async function saveProduct() {
        console.log(productFormValues.name);

        const formData = new FormData();

        formData.append('name', productFormValues.name);
        formData.append('price', String(productFormValues.price));
        formData.append('brand', String(productFormValues.brandId));
        formData.append('console', String(productFormValues.consoleId));
        formData.append('productType', productFormValues.productType);
        formData.append('description', productFormValues.description);
        formData.append('condition', productFormValues.condition);
        formData.append('inStock', String(productFormValues.inStock));
        if (file) {
            formData.append('imageFile', file);
        }

        console.log(formData);
        if (productFormValues.id === -1) {
            await fetch(`/api/admin/product`, {
                method: 'POST',
                body: formData
            });
        }
        else {
            await fetch(`/api/admin/product/${productFormValues.id}`, {
                method: 'PUT',
                body: formData
            });        
        }

        console.log('Fetching products');
        fetchProducts();
    }

    function deleteProduct() {

    }

    function printProduct () {
        console.log (productFormValues)
    }

    const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value)
        
    }

    useEffect(() => {
        console.log(query)
        if (query.length > 3) {
            fetchProducts();
        }
    }, [query])

    return (
        <>
            <Row className='mx-auto' style={{maxWidth: '90vw', justifyContent: 'center'}}>
                <Col sm={3}>
                    <Container>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>ID</Form.Label>
                            <Col sm={9}><Form.Control value={productFormValues.id} type='text' readOnly plaintext></Form.Control></Col> 
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control value={productFormValues.name} 
                                    onChange={e => setProductFormValues(p => ({
                                                ...p,
                                                name: e.target.value
                                            }))} 
                                    type='text'>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Price</Form.Label>
                            <Col sm={9}>
                                <Form.Control value={productFormValues.price} 
                                    onChange={e => setProductFormValues(p => ({
                                                ...p,
                                                price: parseFloat(e.target.value)
                                            }))} 
                                    type='number'
                                    step='0.01'>
                                </Form.Control>
                            </Col>
                        </Form.Group>     

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Brand</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={productFormValues.brandId}
                                    onChange = {e => setProductFormValues(p => ({
                                            ...p,
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
                            <Form.Label column sm={3}>Console</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={productFormValues.consoleId}
                                    onChange = {e => setProductFormValues(p => ({
                                            ...p,
                                            consoleId: parseInt(e.target.value)
                                        }))
                                    }>
                                    <option value=''>Select Console...</option>
                                    {consoles.map((c) => (
                                        <option value={c.id}>{c.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Category</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={productFormValues.productType}
                                    onChange = {e => setProductFormValues(p => ({
                                            ...p,
                                            productType: e.target.value
                                        }))
                                    }>
                                    <option value=''>Select Category...</option>
                                    <option value='Accessory'>Accessory</option>
                                    <option value='Console'>Console</option>
                                    <option value='Controller'>Controller</option>
                                    <option value='Game'>Game</option>
                                    <option value='Other'>Other</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Condition</Form.Label>
                            <Col sm={9}>
                                <Form.Select value={productFormValues.condition}
                                    onChange = {e => setProductFormValues(p => ({
                                            ...p,
                                            condition: e.target.value
                                        }))
                                    }>
                                    <option value=''>Select Condition...</option>
                                    <option value='New'>New</option>
                                    <option value='Used'>Used</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>In Stock?</Form.Label>
                            <Col sm={9} className='align-self-center'>
                                <Form.Check 
                                    checked = {productFormValues.inStock === 1 ? true : false}
                                    onChange = {e => setProductFormValues(c => ({
                                        ...c,
                                        inStock: e.target.checked ? 1 : 0
                                    }))}
                                ></Form.Check>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Description</Form.Label>
                            <Col sm={9}>
                                <Form.Control value={productFormValues.description} 
                                    onChange={e => setProductFormValues(p => ({
                                                ...p,
                                                description: e.target.value
                                            }))} 
                                    type='text'
                                    as='textarea'>
                                </Form.Control>
                            </Col>
                        </Form.Group>    

                        <Form.Group as={Row}>
                            <Col sm={12}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='file' accept='image/*' ref={fileRef} onChange={fileChange}></Form.Control>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Col sm={12}>
                                <Button onClick={newProduct}>New Product</Button>
                                <Button onClick={saveProduct} disabled={!validProduct()}>Save Product</Button>
                                <Button onClick={printProduct} disabled>Delete Product</Button>
                            </Col>
                        </Form.Group>
                    </Container>
                </Col>

                <Col size={9}>
                    <Row>
                        <Form.Control
                            name='search' 
                            type='text'
                            autoComplete='off'
                            style={{width: '60%'}} 
                            placeholder='Search Products...' 
                            value={query}
                            onChange={filterProducts}>
                        </Form.Control>
                    </Row>
                    <Row style={{maxHeight: '70vh', overflowY: 'auto'}}>
                        <Table>
                            <thead>
                                <tr>
                                    <th><b>Product</b></th>
                                    <th><b>Price</b></th>
                                    <th><b>Brand</b></th>
                                    <th><b>Console</b></th>
                                    <th><b>Category</b></th>
                                    <th><b>Condition</b></th>
                                    <th><b>In Stock?</b></th>
                                    <th><b>Image</b></th>
                                    <th><b>Description</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                <tr 
                                key={p.id.toString()} 
                                onClick={() => {
                                    setSelectedProduct(p.id)
                                    loadProduct(p)
                                }}
                                style={{height: '40px', justifyContent: 'center'}}
                                className={selectedProduct === p.id ? 'table-active' : ''}>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.brand}</td>
                                    <td>{p.console}</td>
                                    <td>{p.productType}</td>
                                    <td>{p.condition}</td>
                                    <td>{p.inStock === 1 ? 'Yes' : 'No' }</td>
                                    <td>{p.img? (
                                        <Image className='img-fluid' style={{ height: '30px'}} src={`/uploads/products/${p.img}?${crypto.randomUUID()}`}></Image>
                                    ) : (
                                        <div style={{ width: '30px', height: '30px' }}></div>
                                    )}</td>
                                    <td>{p.description}</td>
                                </tr>  
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ProductForm;