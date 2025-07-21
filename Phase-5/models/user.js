import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        require:true
    }
},
{timestamps:true}
);

const variable = mongoose.model('people',userSchema)

export default  variable
