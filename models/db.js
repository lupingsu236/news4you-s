const app = require("../app.js");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection; 
db.on("error", () => {
    console.error.bind(console, "connection error:");
})

db.once("open", function () {
    console.log(mongoose.STATES[mongoose.connection.readyState]);
    console.log("Connected to database");
    app.emit("ready");
});

console.log(mongoose.STATES[mongoose.connection.readyState]);