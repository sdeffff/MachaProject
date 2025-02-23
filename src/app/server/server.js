const mongoose = require("mongoose");

const express = require('express');
const cors = require("cors");

const cookieParser = require("cookie-parser");

//Routers:
const shopRouter = require("./routes/shopRouter");
const authRouter = require("./routes/authRouter");

const uri = "mongodb+srv://maksympavlii:HAwezxCHyOixEERB@machacluster.7qowc.mongodb.net/Macha?retryWrites=true&w=majority&appName=MachaCluster";

const app = express(); 

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })) 
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:4200", 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
}));

//APIs for products pages
app.use("/products/", shopRouter);
app.use("/auth/", authRouter);

const PORT = 3000;

//Connecting to database using mongoose
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`it's okay ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    })