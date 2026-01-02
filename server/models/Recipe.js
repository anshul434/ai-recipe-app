const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  instructions: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);