import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import producteRoute from "./routes/productRoute.js";
import seedRoute from './routes/seedRoute.js'
import dotenv from 'dotenv'
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import orderRoute from "./routes/orderRoute.js";
dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/products', producteRoute)
app.use('/api/seed', seedRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)


mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(() => {
        console.log('connect to mongoDB')

        app.listen(process.env.PORT, () => {
            console.log('server is running in port 8080')
        })

    })
    .catch(err => console.log(err))