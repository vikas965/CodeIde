import express from "express";
import mongoose from "mongoose";
import UserRoute from "./Routes/UserRoute.js"
import cors from 'cors';
import loginRoute from './Routes/Login.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors());
const dburl = "mongodb+srv://vikas:vikas965@usercluster.1vweadr.mongodb.net/?retryWrites=true&w=majority";

async function connectdb()
{
    try{

        await mongoose.connect(dburl);
        console.log('Db connected');
    }
    catch(err)
    {
        console.log(err.message);
    }
}



connectdb();

app.use(express.json());
app.use("/",UserRoute);
app.use("/",loginRoute);

app.listen(3001,()=>{
    console.log("Server Connected");
})

