import express from 'express'
const router = express.Router()

import {erase} from '../controller/controller.js'
import {login,adminpage} from '../controller/controller.js'
import {sign} from '../controller/controller.js'
import {user} from '../controller/controller.js'
import {loginuser} from '../controller/controller.js'
import {addUser} from '../controller/controller.js'
import {adminAddUser} from '../controller/controller.js'
import {showUsers} from '../controller/controller.js'
import {update} from '../controller/controller.js'
import {updateUser} from '../controller/controller.js'


// product

 import {addProduct} from '../controller/controller.js'
 import {addedProduct} from '../controller/controller.js'
 import {showProduct} from '../controller/controller.js'
 import {editedVersion} from '../controller/controller.js'
 import {updateProd} from '../controller/controller.js'
 import {NewPage} from '../controller/controller.js'






router.get("/",login)
router.get("/sign",sign)
router.post("/signUser",user)
router.get("/dashboard",adminpage)
router.post("/adminHome",loginuser)
router.use((req, res, next)=>{
   if (req.session.admin) {
      next()
   }
   else {
      res.send("entry restricted")
   }
})

router.get("/add-user",addUser)
router.post("/adminAdd",adminAddUser)
router.get("/admin",showUsers)

// cred

router.get("/delete/:id",erase)
router.get("/update/:id",update)
router.post("/updateUser/:id",updateUser)


// product

router.get('/addProd',addProduct)
router.get('/product',NewPage)
router.post('/addedProd',addedProduct)
router.get('/showProd',showProduct)
router.get('/updatepr/:id',editedVersion)
router.post('/updateProduct/:id',updateProd)

export default router