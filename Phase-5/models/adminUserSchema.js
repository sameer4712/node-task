import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:Number,
    }
},
{timestamps:true}
);

const adminUsers = mongoose.model('Users',userSchema)

export default adminUsers
