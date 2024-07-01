const express = require("express");
const app = express();
const userRoutes = require("./routes");
const { mongoConnection } = require("./config");
const PORT = 8001;

//connection of mongoDB
mongoConnection("mongodb://127.0.0.1:27017/short-url", () => {
  console.log("MongoDB Connected Successfully");
});

app.use(express.json());

app.use("/port", userRoutes);

app.listen(8001, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
