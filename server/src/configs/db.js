import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/AngularShop")
        console.log("connect db success")
    } catch (error) {
        console.log(error)
    }
}