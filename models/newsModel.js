const mongoose = require("mongoose");

const { Schema } = mongoose; 

const newsSchema = new Schema({
    title: {type: String},
    comments: {type: String},
    image:
    {
        /*data: Buffer,
        contentType: String*/
        type: String
    },
    timestamp: {type: Date}, 
    createdby: {type: String}
});

module.exports = mongoose.model("News", newsSchema, "news");