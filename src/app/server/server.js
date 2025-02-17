const mongoose = require("mongoose");

const express = require('express');
const cors = require("cors");

//Routers:
const shopRouter = require("././routes/shopRouter")

const uri = "mongodb+srv://maksympavlii:HAwezxCHyOixEERB@machacluster.7qowc.mongodb.net/Macha?retryWrites=true&w=majority&appName=MachaCluster";

const app = express(); 

app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })) 

//APIs for products pages
app.use("/products/", shopRouter);
// app.use("/auth/")

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