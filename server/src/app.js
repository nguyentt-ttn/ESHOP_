import express from 'express'
import cors  from 'cors';
import productRouter from './routers/product'
import { connectDB } from './configs/db'
import authRouter from './routers/auth'
import categoryRouter from './routers/category';
import bidsRouter from './routers/bid';


const app = express()
app.use(cors());
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json())
app.use("/api",productRouter)
app.use("/api",authRouter)
app.use("/api",categoryRouter)
app.use("/api",bidsRouter)
connectDB()
export const viteNodeApp = app
