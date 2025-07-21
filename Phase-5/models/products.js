
import mongoose from 'mongoose'
const product = new mongoose.Schema({
    name:{
       type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },

});

const item = mongoose.model('Products',product)

export default item