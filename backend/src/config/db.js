const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology:true
})
        console.log("Connected to MongoDB")
               
    } catch (error) {
        console.log("Error connecting to MongoDB ", error.message)
        
    }
}

module.exports = connectDB;