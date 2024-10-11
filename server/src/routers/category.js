import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from '../controllers/category'
const categoryRouter = express.Router()
categoryRouter.get("/categories", getAllCategory)
categoryRouter.get("/categories/:id",getCategoryById)
categoryRouter.post("/categories",createCategory)
categoryRouter.put("/categories/:id",updateCategory)
categoryRouter.delete("/categories/:id", deleteCategory)

export default categoryRouter