import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const uri = 'mongodb://localhost:27017/ecommerce';  
const client = new MongoClient(uri);

let Collection;

async function connectDB() {
    await client.connect();
    const db = client.db('ecommerce');
    Collection = db.collection('users');
    console.log('MongoDB connected');
}


app.post('/add-users', async (req, res) => {
    const result = await Collection.insertOne(req.body);
    res.send(result);
});


app.get('/users', async (req, res) => {
    const users = await Collection.find().toArray();
    res.send(users);
});


app.put('/users/:id', async (req, res) => {
    const userId = req.params.id
    const result = await Collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});


app.delete('/users/:id', async (req, res) => {
    const result = await Collection.deleteOne(
        { _id: new ObjectId(req.params.id) }
    );
    res.send(result);
});


connectDB().then(() => {
    app.listen(5000, () => console.log('Server '));
});