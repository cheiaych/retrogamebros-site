const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const { Sequelize, Model, DataTypes } = require('sequelize')

async function getDBConnection() {
    const db = await sqlite.open({
        filename: './Products.db',
        driver: sqlite3.Database
    });
    return db;
}

//API DB calls
async function getAllBrands(req, res) {
    let db = await getDBConnection();
    let brands = await db.all('SELECT * FROM Brands');
    await db.close();
    return res.json(brands);
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

function sanitizeInput(input, maxLength = 100) {
    if (typeof input !== 'string') return '';
    input = input.trim();
    if (input.length > maxLength) return '';
    return input;
}

//API Routes
//Search routes first to avoid conflict with :brand
app.get('/api/search', async function (req, res){
    //return getAllProducts(req, res)
    return getProductsByConditions(req, res);
})

app.get('/api/products/Nintendo', async function (req, res){
    let db = await getDBConnection();
    let products = await db.all('SELECT * FROM Products WHERE brand = "Nintendo"');
    await db.close();
    return res.json(products);
})

//Non-search routes with params instead of queries
app.get('/api/brands', async function (req, res){
    return getAllBrands(req, res);
})

app.get('/api/:brand', async function (req, res){
    return getConsolesByBrand(req, res);
})

app.get('/api/:brand/:console', async function (req, res){
    return getProductsByConsole(req, res);
})

//Running

app.use(express.static(path.join(__dirname, '../React/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../React/build', 'index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Retro Game Bros site listening on port ${PORT}`)
})