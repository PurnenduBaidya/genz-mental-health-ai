import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function connectdb() {
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    }catch(error){
        console.log("Database connection error ",error)
    }
}
export default connectdb