const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

//user registration
router.post("/create", async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save(); 
        console.log("Saved user: ", JSON.stringify(user));
        const token = await user.generateAuthToken(); 
        console.log(token);
        res.status(201).send({username: user.username, token});
    } catch(err) {
        console.log(err.stack);
        res.status(500).send({error: err.message});
    }
});

//user login 
router.post("", async(req, res) => {
    try {
        let {username, password} = req.body; 
        let user = await User.findByCredentials(username, password); 
        console.log(user);
        if(!user) {
            return res.status(401).send({error: "Login failed!"});
        }
        const token = await user.generateAuthToken(); 
        res.send({username, token});
    } catch(err) {
        console.log(err.stack);
        res.status(400).send({error: err.message});
    }
});


module.exports = router; 
