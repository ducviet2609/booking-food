import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

//import router
import AuthRoute from './Routes/AuthRoute.js'
import ProductRoute from './Routes/ProductRoute.js'
import UserRoute from './Routes/UserRoute.js'

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

dotenv.config()

//Kết nối DB, khởi động server
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `Connected to MongoDB - Sever on localhost:${process.env.PORT}`,
      ),
    ),
  )

//routes
app.use('/auth', AuthRoute)
app.use('/product', ProductRoute)
app.use('/user', UserRoute)
