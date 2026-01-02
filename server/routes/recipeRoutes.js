const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe"); 

router.post("/save", async (req, res) => {
  try {
    const { title, instructions, nutrition } = req.body;

    if (!title || !instructions) {
      return res.status(400).json({ message: "Missing title or instructions" });
    }

    const newRecipe = new Recipe({
      title,
      instructions,
      nutrition: {
        calories: nutrition?.calories || 0,
        protein: nutrition?.protein || 0,
        carbs: nutrition?.carbs || 0,
        fats: nutrition?.fats || 0
      }
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Database Save Error:", error);
    res.status(500).json({ message: "Server error while saving recipe", error: error.message });
  }
});

module.exports = router;