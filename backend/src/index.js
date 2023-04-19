const express = require('express')
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectDB =require("./config/db.js")
const route = require("./routes/route.js")



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Connect MongoDB
connectDB();

// route
app.use("/",route)

// PORT
const port = process.env.PORT ||5000

// listen server
app.listen(port, () => {
    console.log("Server is running on PORT " + port)
})