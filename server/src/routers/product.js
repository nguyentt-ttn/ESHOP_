import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from '../controllers/product'
import { checkAuth } from '../middleware/checkAuth'
const productRouter = express.Router()
productRouter.get("/products",getAllProduct)
productRouter.get("/products/:id",getProductById)
productRouter.post("/products",checkAuth,createProduct)
productRouter.put("/products/:id",checkAuth,updateProduct)
productRouter.delete("/products/:id",checkAuth, deleteProduct)

export default productRouter