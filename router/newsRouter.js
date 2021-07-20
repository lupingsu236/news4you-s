const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const News = require("../models/newsModel");
const User = require("../models/userModel");

const router = express.Router();

//create news - guarded endpoint that requires jwt verification
router.post("/create", async (req, res) => {
    if(req.header("Authorization")) {
        const token = req.header("Authorization").replace("Bearer", "").trim();
        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if(err) {
                res.status(401).send({error: "Not Authorised"});
            } else {
                //if successfully verified
                let news = new News(req.body);
                news.timestamp = Date.now();
                news.save((err, obj) => {
                    if(err) {
                        res.status(500).send(err.message);
                    } 
                    else {
                        res.status(201).json(obj);
                    }
                }); 
            }
        });
    } else {
        res.status(401).send({error: "Not Authorised"});
    }
   
});


//retrieve news 
router.get("", async (req, res) => {
    News.find({}).sort('-timestamp').exec((err, news) => {
        if(err) {
            return res.status(500).send(err);
        }
        console.log(news.length);
        return res.json(news);  
    });
});


module.exports = router; 