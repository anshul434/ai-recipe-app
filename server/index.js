const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const ingredientRoutes = require("./routes/ingredientRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

// Original Local CORS
app.use(cors()); 
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Locally"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running on Localhost");
});

app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipe", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));