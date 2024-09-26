import { required } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        default:"member",
    },
},
{versionKey:false,timestamps:true})
export default mongoose.model("User",userSchema)