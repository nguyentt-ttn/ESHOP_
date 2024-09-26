import { string } from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:4
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
},
{versionKey:false,timestamps:true})
export default mongoose.model("Product",productSchema)