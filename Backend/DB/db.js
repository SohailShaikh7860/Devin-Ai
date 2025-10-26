import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failed!");
        console.log(error);
    }
}

export default connectDB;