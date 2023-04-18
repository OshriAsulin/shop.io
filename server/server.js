import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import producteRoute from "./routes/productRoute.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cors())

app.use('/api/products', producteRoute)




mongoose.connect('mongodb://127.0.0.1:27017/shopio-ecommerce')
.then(() => {
    console.log('connect to mongoDB')

    app.listen(process.env.PORT, () => {
        console.log('server is running in port 8080')
    })

    })
    .catch(err => console.log(err))