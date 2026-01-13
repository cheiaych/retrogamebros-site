//const express = require('express')
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url';
import session from 'express-session';

import app from './app.js';

import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
//const { Sequelize, Model, DataTypes } = require('sequelize')

//Running

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(express.static(path.join(__dirname, './react/build')));

app.use('/assets', express.static(path.join(__dirname, 'react/build/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'react/uploads')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './react/build', 'index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Retro Game Bros site listening on port ${PORT}`)
})