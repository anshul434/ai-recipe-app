const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const ingredientRoutes = require("./routes/ingredientRoutes");
const recipeRoutes = require("./routes/recipeRoutes");


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipe", recipeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
