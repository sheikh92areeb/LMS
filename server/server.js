import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send("Hello World!");
});

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
});