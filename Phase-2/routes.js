import express from 'express'
const router = express.Router()

import {insert} from './controller.js'
import {find} from './controller.js'
import {update} from './controller.js'
import {erase} from './controller.js'


router.post("/add",insert)
router.get("/find",find)
router.put("/update/:id",update)
router.delete("/delete/:id",erase)

export default router