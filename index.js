const express = require("express");
const app = express();
const path = require("path");
const urlRoutes = require("./routes");
const userRoutes = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const { mongoConnection } = require("./config");
const url = require("./models");

const PORT = 8001;

//connection of mongoDB
mongoConnection("mongodb://127.0.0.1:27017/short-url", () => {
  console.log("MongoDB Connected Successfully");
});

//ejs setup
// TO use server side rendering for displaying html data
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);
app.use("/url", urlRoutes);
app.use("/user", userRoutes);

app.listen(8001, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
