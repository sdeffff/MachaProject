const express = require("express");
const router = express.Router();

//importing schema for the product we want to push:
const Product = require("../schemas/ProductSchema");

//GET API for the category name from url string
router.get("/:category", async (req, res) => {
    try {
        const category = req.params.category; //getting the category name from url

        //finding all of the products by category name + sorting them by date (newest first)
        const items = await Product.find({ category }).sort({ createdAt: -1 });
        
        res.status(200).json(items); //in case of success sending code 200 and the data itself
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

//GET API for the product's data using _id param from url string
router.get("/:category/:id", async (req, res) => {
    try {
        const category = req.params.category;
        const id = req.params.id;

        const item = await Product.findOne({ category: category, _id: id});

        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// GET all products in case category isn't provided
router.get("/", async (req, res) => {
    try {
        const items = await Product.find({}); //finding every product(without filtering)

        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//POST API
router.post("/", async (req, res) => {
    try {   
        const items = await Product.create(req.body);
        res.status(200).json(items);
    } catch (err) {
        console.log(err.message);
        res.status(500).json( { error: err.message} );
    }
})

module.exports = router;