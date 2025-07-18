import express from 'express'
import mongoose from 'mongoose'
import router from './routes.js'

const app = express();

app.listen('3000')
app.use(express.json())
app.use(router)

const uri = ("mongodb://localhost:27017/PostMan")
mongoose.connect(uri).then(() => {
    console.log("CONNECTED");
})

app.get('/',(req,res)=>{
    res.send('server connected')
})