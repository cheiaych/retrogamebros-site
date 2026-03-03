import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs/promises';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

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
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://www.retrogamebros.ca'
    ],
    credentials: true
}))

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

    let query = 'SELECT c.id, c.name, b.name AS brand, b.id AS brandId, c.img, c.isCollectible ';
    query += 'FROM Consoles AS c JOIN Brands AS b ON c.brand = b.id ';
    query += 'ORDER BY c.brand, c.id';

    let consoles = await db.all(query);
    await db.close();
    return res.json(consoles);
}

async function getAllProducts(req, res) {
    let db = await getDBConnection();

    let query = 'SELECT p.id, p.name, p.price, b.name AS brand, b.id AS brandId, c.name AS console, c.id AS consoleId, p.productType, p.description, p.condition, p.inStock, p.img ';
    query += 'FROM Products AS p JOIN Brands AS b ON p.brand = b.id ';
    query += 'JOIN Consoles AS c ON p.console = c.id '

    let products = await db.all(query);
    await db.close();
    return res.json(products);
}

async function getConsolesByBrand(req, res) {
    const brand = sanitizeInput(req.params.brand);
    
    let db = await getDBConnection();

    let query = 'SELECT c.id, c.name, b.name as brand, b.id AS brandId, c.img, c.isCollectible ';
    query += 'FROM Consoles AS c JOIN Brands AS b ON c.brand = b.id';
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('b.name = ?');
        params.push(brand);
    }

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    conditions.push('ORDER BY c.name');

    let consoles = await db.all(query, params);
    await db.close()
    return res.json(consoles)
}

async function getProductsByConsole(req, res) {
    //const { brand, console, productType } = req.query;

    const brand = sanitizeInput(req.params.brand);
    const console = sanitizeInput(req.params.console);
    
    let db = await getDBConnection();

    let query = 'SELECT p.id, p.name, p.price, b.name as brand, b.id AS brandId, c.name AS console, c.id AS consoleId, p.productType, p.description, p.condition, p.inStock, p.img ';
    query += 'FROM Products AS p JOIN Brands AS b on p.brand = b.id JOIN Consoles AS c ON p.console = c.id'
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('b.name = ?');
        params.push(brand);
    }
    if (console) {
        conditions.push('c.name = ?');
        params.push(console);
    }

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += (' ORDER BY p.productType, p.name');

    let products = await db.all(query, params);
    await db.close()
    return res.json(products)
}

async function getProductsByConditions(req, res) {
    //const { brand, console, productType } = req.query;

    const brand = sanitizeInput(req.query.brand);
    const con = sanitizeInput(req.query.console);
    const productType = sanitizeInput(req.query.productType)
    
    let db = await getDBConnection();

    let query = 'SELECT * FROM Products';
    let conditions = [];
    let params = [];

    if (brand) {
        conditions.push('brand = ?');
        params.push(brand);
    }
    if (con) {
        conditions.push('console = ?');
        params.push(con);
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

    let query = 'SELECT p.id, p.name, p.price, b.name AS brand, b.id AS brandID, c.name AS console, c.id AS consoleId, p.productType, p.description, p.condition, p.inStock, p.img ';
    query += 'FROM Products AS p JOIN Brands AS b on p.brand = b.id JOIN Consoles AS c ON p.console = c.id'
    let conditions = [];
    let params = [];

    /*conditions.push('brand LIKE ?');
    params.push(`%${search}%`);

    conditions.push('console LIKE ?');
    params.push(`%${search}%`);*/

    conditions.push('p.name LIKE ?');
    params.push(`%${search}%`);

    conditions.push('p.description LIKE ?');
    params.push(`%${search}%`);

    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' OR ');
    }

    conditions.push('ORDER BY b.name, c.name, p.productType, p.name')

    let products = await db.all(query, params);
    await db.close()
    return res.json(products)
}

//Admin DB calls
//Brands
async function postBrand() {
    console.log(req.body);

    const name = req.body.name;
    const isOther = req.body.isOther === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query, params;
    
    query = `INSERT INTO Brands (name, isOther) VALUES (?, ?)`;
    params = [name, isOther];

    const result = await db.run(query, params);
    const id = result.lastID;

    if (req.file) {
        const img = `${id}${path.extname(req.file.filename)}`;
        query = `UPDATE Brands SET img = ? WHERE id = ?`;
        params = [img, id];

        await db.run(query, params)
    }

    await db.close();
    return id;
}

async function putBrand(req, res) {
    console.log(req.body.name);

    const id = req.params.id;
    const name = req.body.name;

    let img = '';
    if (req.file) { 
        img = `${id}${path.extname(req.file.filename)}`;
    }

    const isOther = req.body.isOther === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query, params;
    if (img) {
        query = `UPDATE Brands SET name = ?, img = ?, isOther = ? WHERE id = ?`
        params = [name, img, isOther, id];
    }
    else {
        query = `UPDATE Brands SET name = ?, isOther = ? WHERE id = ?`
        params = [name, isOther, id];
    }
    

    await db.run(query, params);
    await db.close();
}

async function deleteBrand(id) {
    
}

//Consoles
async function postConsole(req, res) {
    console.log(req.body)

    const name = req.body.name;
    const brand = req.body.brand;
    const isCollectible = req.body.isCollectible === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query, params;

    query = `INSERT INTO Consoles (name, brand, isCollectible) VALUES (?, ?, ?)`;
    params = [name, brand, isCollectible];
    
    const result = await db.run(query, params);
    const id = result.lastID;
    
    if (req.file) { 
        const img = `${id}${path.extname(req.file.filename)}`;

        query = `UPDATE Consoles SET img = ? WHERE id = ?`;
        params = [img, id];

        await db.run(query, params)
    }

    await db.close();
    return id;
}

async function putConsole(req, res) {
    console.log(req.body)

    const id = req.params.id;
    const name = req.body.name;
    const brand = req.body.brand;

    let img = '';
    if (req.file) { 
        img = `${id}${path.extname(req.file.filename)}`;
    }

    const isCollectible = req.body.isCollectible === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query, params
    if (img) {
        query = `UPDATE Consoles SET name = ?, brand = ?, img = ?, isCollectible = ? WHERE id = ?`;
        params = [name, brand, img, isCollectible, id];
    }
    else {
        query = `UPDATE Consoles SET name = ?, brand = ?, isCollectible = ? WHERE id = ?`;
        params = [name, brand, isCollectible, id];
    }
    

    await db.run(query, params);
    await db.close()
}

async function deleteConsole(id) {
    
}

//Products
async function postProduct(req, res) {
    console.log(req.body);

    const name = req.body.name;
    const brand = req.body.brand;
    const con = req.body.console;
    const price = parseFloat(req.body.price);
    const productType = req.body.productType;
    const description = req.body.description;
    const condition = req.body.condition;
    const inStock = req.body.inStock === '1' ? 1 : 0;

    let db = await getDBConnection();

    let query, params;
    query = `INSERT INTO Products (name, brand, console, price, productType, description, condition, inStock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    params = [name, brand, con, price, productType, description, condition, inStock]

    const result = await db.run(query, params)
    const id = result.lastID;

    if (req.file) {
        const img = `${id}${path.extname(req.file.filename)}`;

        query = `UPDATE Products SET img = ? WHERE id = ?`;
        params = [img, id];

        await db.run(query, params);
    }

    await db.close();
    return id;
}

async function putProduct(req, res) {
    console.log('PRODUCT PUT')
    console.log(req.params);
    console.log(req.body);

    const id = req.params.id
    const name = req.body.name;
    const brand = req.body.brand;
    const con = req.body.console;
    const price = parseFloat(req.body.price);
    const productType = req.body.productType;
    const description = req.body.description;
    const condition = req.body.condition;
    const inStock = req.body.inStock === '1' ? 1 : 0;

    let img = '';
    if (req.file) {
        img = `${id}${path.extname(req.file.filename)}`;
    }

    let db = await getDBConnection();

    let query, params;
    if (img) {
        query = `UPDATE Products SET name = ?, brand = ?, console = ?, price = ?, productType = ?, description = ?, condition = ?, inStock = ?, img = ? WHERE id = ?`;
        params = [name, brand, con, price, productType, description, condition, inStock, img, id]
    }
    else {
        query = `UPDATE Products SET name = ?, brand = ?, console = ?, price = ?, productType = ?, description = ?, condition = ?, inStock = ? WHERE id = ?`;
        params = [name, brand, con, price, productType, description, condition, inStock, id]
    }

    await db.run(query, params)
    await db.close();
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
        console.error(`Could not fetch products for search ${sanitizeInput(req.query.name)}: `, e);
        res.status(500).json({ error: `Could not fetch products for search ${sanitizeInput(req.query.name)}` });
    }
})

//Non-search routes with params instead of queries
app.get('/api/brands', async function (req, res){
    try {
        await getAllBrands(req, res);
    }
    catch (e) {
        console.error(`Could not fetch brands`, e);
        res.status(500).json({ error: `Could not fetch brands` });
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

app.get('/api/products', async function (req, res){
    try {
        await getAllProducts(req, res);
    }
    catch (e) {
        console.error('Could not fetch products: ', e);
        res.status(500).json({ error: 'Could not fetch products' });
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

//Routing for Uploads image serving
app.use('/uploads', express.static('uploads'));

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
    else {
        req.session.isAdmin = true;
        res.json({ success: true })
    }
});

function isAdmin (req, res, next) {
    if (!req.session?.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' })
    }
    next();
}

//Protecting admin API routes (app.use checks isAdmin() for ANY /api/admin route)
app.use('/api/admin', isAdmin);

//Multer setup for image uploads
const upload = multer({dest: '/'});

function uploadImg(type) {
    return multer({
        storage: multer.diskStorage({
            destination: function(req, res, cb) {
                cb(null, `./uploads/${type}`)
            },
            filename: function (req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, `${crypto.randomUUID()}}${ext}`)
            }
        })
    }).single('imageFile')
}

//Brand Admin Routes
app.post('/api/admin/brand', uploadImg('brands'), async function (req, res) {
    console.log(req.body);
    try {
        let id = await postBrand(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/brands/${id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) { 
        console.error(`Could not post brand ${sanitizeInput(req.params.name)}: `, e);
        res.status(500).json({ error: `Could not post brand ${sanitizeInput(req.params.name)}` });
    }
});

app.put('/api/admin/brand/:id', uploadImg('brands'), async function (req, res) {
    console.log(req.body);
    try {
        await putBrand(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/brands/${req.params.id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) {
        console.error(`Could not update brand ${sanitizeInput(req.params.id)}: `, e);
        res.status(500).json({ error: `Could not update brand ${sanitizeInput(req.params.id)}` });
    }
});

app.delete('/api/admin/brand/:id', deleteBrand);

//Console Admin Routes
app.post('/api/admin/console', uploadImg('consoles'), async function (req, res) {
    console.log(req.body)
    try {
        let id = await postConsole(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/consoles/${id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) {
        console.error(`Could not post console ${sanitizeInput(req.params.name)}: `, e);
        res.status(500).json({ error: `Could not post console ${sanitizeInput(req.params.name)}` });
    }
});

app.put('/api/admin/console/:id', uploadImg('consoles'), async function (req, res) {
    console.log(req.body)
    try {
        await putConsole(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/consoles/${req.params.id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) {
        console.error(`Could not update console ${sanitizeInput(req.params.id)}: `, e);
        res.status(500).json({ error: `Could not update console ${sanitizeInput(req.params.id)}` });
    }
});

app.delete('/api/admin/console/:id', deleteConsole);

//Product Admin Routes
app.post('/api/admin/product', uploadImg('products'), async function (req, res) {
    console.log(req.body);
    try {
        let id = await postProduct(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/products/${id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) {
        console.error(`Could not post product ${sanitizeInput(req.params.name)}: `, e);
        res.status(500).json({ error: `Could not post product ${sanitizeInput(req.params.name)}`});
    }
});

app.put('/api/admin/product/:id', uploadImg('products'), async function (req, res) {
    console.log(req.body);
    try {
        await putProduct(req, res);
        if (req.file) {
            await fs.rename(req.file.path, `./uploads/products/${req.params.id}${path.extname(req.file.filename)}`);
        }
        res.status(200).json({ ok: true });
    }
    catch (e) {
        console.error(`Could not update product ${sanitizeInput(req.params.name)}: `, e);
        res.status(500).json({ error: `Could not update product ${sanitizeInput(req.params.name)}`});
    }
});

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