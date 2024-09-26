import express from 'express'
import cors  from 'cors';
import productRouter from './routers/product'
import { connectDB } from './configs/db'
import authRouter from './routers/auth'


const app = express()
app.use(cors());
  
app.use(express.json())
app.use("/api",productRouter)
app.use("/api",authRouter)
connectDB()
export const viteNodeApp = app
