const mongoose = require('mongoose');

mongoose.set('strictQuery', false); 

async function connectDB(uri) {
    try{
        await mongoose.connect(uri , {
            serverSelectionTimeoutMS: 5000,
        })
    } catch(error){
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;