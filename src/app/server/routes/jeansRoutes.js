const express = require("express");
const router = express.Router();
const Jeans = require("../models/ProductModel");

//GET API
router.get("/", async (req, res) => {
    try {
        const items = await Jeans.find({});
        res.status(200).json(items);
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

//POST API
router.post("/", async (req, res) => {
    try {   
        console.log(req.body);

        const items = await Jeans.create(req.body);
        res.status(200).json(items);
    } catch (err) {
        console.log(err.message);
        res.status(500).json( { error: err.message} );
    }
})

module.exports = router;