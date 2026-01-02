const express = require("express");
const router = express.Router();
const axios = require("axios");
const Recipe = require("../models/Recipe");

router.post("/generate", async (req, res) => {
  try {
    const { ingredients } = req.body;

    const prompt = `Create a healthy recipe using: ${ingredients.join(", ")}. 
    Return ONLY a valid JSON object. Do not include markdown code blocks.
    Structure:
    {
      "title": "Recipe Name",
      "instructions": ["Step 1", "Step 2"],
      "nutrition": { "calories": 500, "protein": 30, "carbs": 50, "fats": 20 }
    }`;

    const response = await axios.post(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let resultText = response.data.candidates[0].content.parts[0].text;
    
    const cleanJson = resultText.replace(/```json|```/g, "").trim();
    const recipeData = JSON.parse(cleanJson);
    
    res.json(recipeData);
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to connect to AI. Check console." });
  }
});
router.get("/favorites", async (req, res) => {
  try {
    const favorites = await Recipe.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/save", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;