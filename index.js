const express = require("express");
require("dotenv").config();
const newsRouter = require("./router/newsRouter"); 

const app = require("./app");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/news", newsRouter);

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
