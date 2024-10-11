import Product from "../models/product"
import User from "../models/auth"
// import { productValidate } from "../schemas/product"

export const getAllProduct = async(req,res)=>{
    const products = await Product.find()
    res.json(products)
}
export const getProductById = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id).populate({
            path: "bids",
            populate: {
                path: "user",
                model: User,
                select: "email username",
            },
        })
        if(!product) throw new Error( 404,"Product not found")
        res.json(product)
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async(req,res)=>{
    try {
        const endAtTime = new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000

        const data = await Product.create({...req.body,endAt:new Date(endAtTime)})
        res.json({data, message:"Them thanh cong"})
    } catch (error) {
        console.log(error)
    }
}
export const updateProduct = async(req,res)=>{
    try {
        console.log(req.body)
        const endAtTime = new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000
        const data = await Product.findByIdAndUpdate(req.params.id, {...req.body, endAt:new Date(endAtTime)},{new:true})
        res.status(200).json({data, message:"Cap nhap thanh cong"})
    } catch (error) {
        console.log(error)
    }
}
export const deleteProduct = async(req,res)=>{
    try {
        const products = await Product.findByIdAndDelete(req.params.id)
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}