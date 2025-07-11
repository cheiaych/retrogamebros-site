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

async function getAllProducts() {
    let db = await getDBConnection();
    let products = await db.all('SELECT * FROM Products');
    await db.close();
    return res.json(products);
}

async function getProductsByBrandType(brand, type) {

}

app.get('/products', async function (req, res){
    return getAllProducts()
})

app.get('/products/Nintendo', async function (req, res){
    let db = await getDBConnection();
    let products = await db.all('SELECT * FROM Products WHERE brand = "Nintendo"');
    await db.close();
    return res.json(products);
})

const sequelize =  new Sequelize({
    dialect: 'sqlite',
    storage: './Products.db'
})

class Item extends Model {}
Item.init ({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    quality: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
}, {sequelize, modelName: 'item'})

sequelize.sync();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/items', async (req, res) => {
    const items = await Item.findAll()
    res.json(items)
})

app.get('/items/:id', async (req, res) => {
    const items = await Item.findByPk(req.params.id)
    res.json(items)
})

app.post('/item', async (req, res) => {
    console.log("Posting: " + req.body)
    const item = await Item.create(req.body);
    res.json(item)
})

app.put('/items/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    if (item) {
        await item.update(req.body);
        res.json(item)
    }
    else {
        res.status(404).json({message: 'Item not found'})
    }
})

app.delete('/items/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    if (item) {
        await item.destroy();
        res.json({message: 'Item deleted'})
    }
    else {
        res.status(404).json({message: 'Item not found'})
    }
})

app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '../React/build', 'index.html'));
    }
});

//app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, '../React/build')))

app.use((req, res) => {
    res.status(200).send('Hello World');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})