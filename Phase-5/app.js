import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import productRoutes from './router/productsRoutes.js'
import routes from './router/routes.js'
import { logout } from './controller/controller.js'
// import variable from './models/user.js'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(session(
    {
        secret: "key that will asign a session",
        saveUninitialized: false,
        resave: false
    }
)
)
app.use((req,res,next)=>{
    res.locals.message =req.session.message;
    delete req.session.message;
    next()
})

app.get('/logout', logout)


app.set('view engine', 'ejs')

const uri = ("mongodb://localhost:27017/PostMan")
mongoose.connect(uri).then(() => {
    console.log("CONNECTED");
})

app.use(routes)

app.use(productRoutes)

app.listen(3000, () => {
    console.log("Server started");

})

