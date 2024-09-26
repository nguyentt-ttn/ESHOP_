import Product from "../models/product"
import { productValidate } from "../schemas/product"

export const getAllProduct = async(req,res)=>{
    const products = await Product.find()
    res.json(products)
}
export const getProductById = async(req,res)=>{
    try {
        const products = await Product.findById(req.params.id)
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}
export const createProduct = async(req,res)=>{
    try {
        const {error} = productValidate.validate(req.body,{abortEarly:false})
        if(error){
            const errorMessage = error.details.map((message)=>message.message)
            return res.json({message:errorMessage})
        }
        const data = await Product(req.body).save()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
export const updateProduct = async(req,res)=>{
    try {
        const {error} = productValidate.validate(req.body,{abortEarly:false})
        if(error){
            const errorMessage = error.details.map((message)=>message.message)
            return res.json({message:errorMessage})
        }
        const data = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(data)
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