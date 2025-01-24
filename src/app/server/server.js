const mongoose = require("mongoose");

const express = require('express');
const cors = require("cors");

//Routers:
const jeansRouter = require("./routes/jeansRoutes");

// const asd = import("../../../dist/macha-proj")

const uri = "mongodb+srv://maksympavlii:HAwezxCHyOixEERB@machacluster.7qowc.mongodb.net/Macha?retryWrites=true&w=majority&appName=MachaCluster";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products/jeans", jeansRouter);

const PORT = 3000;

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`it's okay ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    })