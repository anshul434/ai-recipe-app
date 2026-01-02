const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const ingredientRoutes = require("./routes/ingredientRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

// CORS CONFIGURATION
app.use(cors({
  origin: "https://ai-recipe-app-peach.vercel.app", // NO trailing slash
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// HEALTH CHECK ROUTE
app.get("/", (req, res) => {
  res.send("Smart Chef AI Backend is Live!");
});

// ROUTES
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipe", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));