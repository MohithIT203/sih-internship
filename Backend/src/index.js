const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
require('dotenv').config();
const PORT = process.env.PORT||5000;

const register = require('../Routes/register');
const internship = require('../Routes/internship');
const profile = require('../Routes/profile');

const app = express();

app.use(express.json());
app.use(cors({origin:"*",credential:true}));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to Database")
})
.catch((err)=>{
    console.log("Error Connecting with Database");
})
app.use(register);
app.use(internship);
app.use(profile);
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})