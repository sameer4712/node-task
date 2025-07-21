// const express = require('express')
// const { MongoClient } = require('mongodb')

// const app = express();

// const uri = "mongodb://localhost:27017"

// const client = new MongoClient(uri)

// app.get('/', async (req, res) => {
//     await client.connect();
//     const db = client.db('ecommerce');
//     const users = await db.collection('users').find().toArray()
//     res.json(users)
// })

// app.listen(3001)

import express from 'express'
import { MongoClient } from 'mongodb'

const app = express();

app.use(express.json())

const uri = "mongodb://localhost:27017"

const client = new MongoClient(uri)

await client.connect();
const db = client.db('ecommerce')

app.get('/', async (req, res) => {

    const users = await db.collection('payments').countDocuments()
    res.json(users)
})

app.listen('4000', () => {
    console.log('connected successfully');

})
