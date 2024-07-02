const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes");
const { mongoConnection } = require("./config");
const url = require("./models");
// const url = require("./models");

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

app.get("/", async (req, res) => {
  const urls = await url.find({});
  res.render("home", {
    data: urls,
  });
});

app.use("/url", userRoutes);

app.listen(8001, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
