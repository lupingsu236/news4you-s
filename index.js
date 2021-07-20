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

app.use("/news", newsRouter);
app.use("/users", userRouter);

require("./models/db");

app.get("/", (req, res) => {
    res.send("APIs for News4You");
});

const PORT = process.env.PORT || 3000;

app.on("ready", () => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
