const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");

const User = require("../schemas/UserSchema");

const authMiddleware = require("../middleware/authMiddleware");

require("dotenv").config({path: "../../../src/env" + "/.env"});

router.post("/login", async(req, res) => {
    try {
        const SECRET_KEY = process.env.SECRET_KEY;

        const { email, pwd } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(pwd, user.password);
        if(!isMatch) {
            return res.status(401).json({error: "Passwords are not matching"})
        }

        const token = jwt.sign({ id: user._id, status: user.status }, SECRET_KEY, { expiresIn: "1h" });


        res.cookie("authToken", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Lax",
            path: "/",
            maxAge: 3600000,
        }); 
        //secure: true, sameSite: "Strict" - for production

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({error: err.message});
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

//Check if the user is logged in:
router.get("/check-user", authMiddleware, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  });

//POST API
router.post("/", async (req, res) => {
    try  {
        const data = {
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
        };
    
        const admins = ["arseniikyrychenko@gmail.com", "maxpavliy@gmail.com"];

        if(admins.includes(data.email)) {
            data.status = "admin";
        }

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
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;