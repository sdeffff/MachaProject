const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../schemas/UserSchema");

router.post("/login", async(req, res) => {
    try {
        const {email, pwd} = req.body;
        console.log(email, "asd");

        const user = await User.findOne({ email });

        if(!user) {
            console.log("User not found:", email);
            return res.status(401).json({error: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(pwd, user.password);
        if(!isMatch) {
            console.log("Passwords are not matching: ", pwd, user.password);
            return res.status(401).json({error: "Invalid email or password"})
        }

        console.log("asd1");

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET API
router.get("/", async(req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//POST API
router.post("/", async (req, res) => {
    try  {
        const data = {
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
        };
    
        if(await User.findOne({ email: data.email })) {
            res.status(409).json( {
                status: 409,
                message: "email is already in use",
            });
            return;
        }
    
        const saltRounds = 10;
        const hashPwd = await bcrypt.hash(data.password, saltRounds);
        
        data.password = hashPwd;

        await User.create(data);
    
        res.status(201)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;