const express = require("express");
const News = require("../models/newsModel");

const router = express.Router();

//create news 
router.post("/create", async (req, res) => {
    let news = new News(req.body);
    news.timestamp = Date.now();
    news.save((err, obj) => {
        if(err) {
            res.status(500).send(err.message);
        } 
        else {
            res.json(obj);
        }
    }) 

});


//retrieve news 
router.get("", async (req, res) => {
    News.find((err, news) => {
        if(err) {
            return res.status(500).send(err);
        }
        console.log(news.length);
        return res.json(news);  
    });
});


module.exports = router; 