import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';
import multer from 'multer';

import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const app = express();

dotenv.config();

async function getDBConnection() {
    const db = await open({
        filename: './Products.db',
        driver: sqlite3.Database
    });
    return db;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret', // must be a string
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true } // basic protection
}));

//API DB calls
async function getAllBrands(req, res) {
    let db = await getDBConnection();
    let brands = await db.all('SELECT * FROM Brands ORDER BY name');
    await db.close();
    return res.json(brands);
}

async function getAllConsoles(req, res) {
    let db = await getDBConnection();
    let consoles = await db.all('SELECT * FROM Consoles ORDER BY name');
    await db.close();
    return res.json(consoles);
}

async function getConsolesByBrand(req, res) {
    const brand = sanitizeInput(req.params.brand);
    
    let db = await getDBConnection();

    let query = 'SELECT * FROM Consoles';
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('brand = ?');
        params.push(brand);
    }

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    conditions.push('ORDER BY name');

    let consoles = await db.all(query, params);
    await db.close()
    return res.json(consoles)
}

async function getProductsByConsole(req, res) {
    //const { brand, console, productType } = req.query;

    const brand = sanitizeInput(req.params.brand);
    const console = sanitizeInput(req.params.console);
    
    let db = await getDBConnection();

    let query = 'SELECT * FROM Products';
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('brand = ?');
        params.push(brand);
    }
    if (console) {
        conditions.push('console = ?');
        params.push(console);
    }

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += (' ORDER BY productType, name');

    let products = await db.all(query, params);
    await db.close()
    return res.json(products)
}

async function getAllProducts(req, res) {
    let db = await getDBConnection();
    let products = await db.all('SELECT * FROM Products');
    await db.close();
    return res.json(products);
}

async function getProductsByConditions(req, res) {
    //const { brand, console, productType } = req.query;

    const brand = sanitizeInput(req.query.brand);
    const console = sanitizeInput(req.query.console);
    const productType = sanitizeInput(req.query.productType)
    
    let db = await getDBConnection();

    let query = 'SELECT * FROM Products';
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('brand = ?');
        params.push(brand);
    }
    if (console) {
        conditions.push('console = ?');
        params.push(console);
    }
    if (productType) {
        conditions.push('productType = ?');
        params.push(productType);
    }

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    let products = await db.all(query, params);
    await db.close()
    return res.json(products)
}

async function searchProducts(req, res) {

    const search = sanitizeInput(req.query.name);
    
    let db = await getDBConnection();

    let query = 'SELECT * FROM Products';
    let conditions = [];
    let params = [];

    /*conditions.push('brand LIKE ?');
    params.push(`%${search}%`);

    conditions.push('console LIKE ?');
    params.push(`%${search}%`);*/

    conditions.push('name LIKE ?');
    params.push(`%${search}%`);

    conditions.push('description LIKE ?');
    params.push(`%${search}%`);

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' OR ');
    }

    conditions.push('ORDER BY brand, console, productType, name')

    let products = await db.all(query, params);
    await db.close()
    return res.json(products)
}

//Admin DB calls

//Brands
async function postBrand() {
    
}

async function putBrand(id) {
    
}

async function deleteBrand(id) {
    
}

//Consoles
async function postConsole() {
    
}

async function putConsole(req, res) {
    console.log(req.body.name)

    const id = req.params.id;
    const name = req.body.name;
    const brand = req.body.brand;
    const img = req.body.img;
    const isCollectible = req.body.isCollectible === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query = `UPDATE Consoles SET name = ?, brand = ?, img = ?, isCollectible = ? WHERE id = ?`;
    const params = [name, brand, img, isCollectible, id];

    await db.run(query, params);
    await db.close()

    res.status(204).json({ ok: true });
}

async function deleteConsole(id) {
    
}

//Products
async function postProduct() {
    
}

async function putProduct(id) {
    
}

async function deleteProduct(id) {
    
}

//Input sanitizer

function sanitizeInput(input, maxLength = 100) {
    if (typeof input !== 'string') return '';
    input = input.trim();
    if (input.length > maxLength) return '';
    return input;
}

//API Routes
//Search routes first to avoid conflict with :brand
app.get('/api/search', async function (req, res){
    try {
        return searchProducts(req, res);
    }
    catch (e) {
        console.error('Could not fetch search: ', e);
        return res.status(500).json({ error: 'Could not fetch brands' });
    }
})

/*app.get('/api/products/Nintendo', async function (req, res){
    let db = await getDBConnection();
    let products = await db.all('SELECT * FROM Products WHERE brand = "Nintendo"');
    await db.close();
    return res.json(products);
})*/

//Non-search routes with params instead of queries
app.get('/api/brands', async function (req, res){
    try {
        await getAllBrands(req, res);
    }
    catch (e) {
        console.error(`Could not fetch products for search ${sanitizeInput(req.query.name)}: `, e);
        res.status(500).json({ error: `Could not fetch products for search ${sanitizeInput(req.query.name)}` });
    }
})

app.get('/api/consoles', async function (req, res){
    try {
        await getAllConsoles(req, res);
    }
    catch (e) {
        console.error('Could not fetch consoles: ', e);
        res.status(500).json({ error: 'Could not fetch consoles' });
    }
})

app.get('/api/:brand', async function (req, res){
    try {
        await getConsolesByBrand(req, res);
    }
    catch (e) {
        console.error(`Could not fetch consoles for brand ${sanitizeInput(req.params.brand)}: `, e);
        res.status(500).json({ error: `Could not fetch consoles for brand ${sanitizeInput(req.params.brand)}` });
    }
})

app.get('/api/:brand/:console', async function (req, res){
    try {
        await getProductsByConsole(req, res);
    }
    catch (e) {
        console.error(`Could not fetch products for console ${sanitizeInput(req.params.console)}: `, e);
        res.status(500).json({ error: `Could not fetch products for console ${sanitizeInput(req.params.console)}` });
    }
})

//Auth routing

app.get ('/admin/check', (req, res) => {
    if (!req.session?.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' })
    }
    res.json({ ok: true });
})

app.post('/admin/login', async (req, res) => {
    const { password } = req.body;

    const isPassword = await bcrypt.compare (
        password,
        process.env.ADMIN_PASSWORD_HASH
    )

    if (!isPassword) {
        res.status(403).json({ error: 'Forbidden' })
    }

    req.session.isAdmin = true;
    res.json({ success: true })
});

function isAdmin (req, res, next) {
    if (!req.session?.isAdmin) {
        res.status(403).json({ error: 'Forbidden' })
    }
    next();
}

//Protecting admin API routes
app.use('/api/admin', isAdmin);

//Multer setup for image uploads
const upload = multer({dest: 'temp/'});

//Brand Admin Routes
app.post('/api/admin/brand', postBrand);
app.put('/api/admin/brand/:id', putBrand);
app.delete('/api/admin/brand/:id', deleteBrand);

//Console Admin Routes
app.post('/api/admin/console', postConsole);

app.put('/api/admin/console/:id', upload.none(), async function (req, res) {
    console.log(req.body)
    try {
        await putConsole(req, res);
    }
    catch (e) {
        console.error(`Could not update console ${sanitizeInput(req.params.id)}: `, e);
        res.status(500).json({ error: `Could not update console ${sanitizeInput(req.params.id)}` });
    }
});

app.delete('/api/admin/console/:id', deleteConsole);

//Product Admin Routes
app.post('/api/admin/product', putProduct);
app.put('/api/admin/product/:id', postProduct);
app.delete('/api/admin/product/:id', deleteProduct);

//React site and asset route handling

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(express.static(path.join(__dirname, './react/build')));

app.use('/assets', express.static(path.join(__dirname, 'react/build/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'react/uploads')))

//Admin route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, './react/build', 'index.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './react/build', 'index.html'))
})

export default app;