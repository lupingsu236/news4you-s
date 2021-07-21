const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const newsRouter = require("./router/newsRouter"); 
const userRouter = require("./router/userRouter");

const app = require("./app");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.use("/api/news", newsRouter);
app.use("/api/users", userRouter);

require("./models/db");

/*app.get("/", (req, res) => {
    res.send("APIs for News4You");
});*/ 


//serves angular files
app.use(express.static(__dirname + '/news4you'));
app.all('*', (req, res) => {
    res.sendFile(__dirname+'/news4you/index.html');
})

const PORT = process.env.PORT || 3000;

app.on("ready", () => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
