import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Utensils, UtensilsCrossed, Heart, CheckCircle } from "lucide-react";
import "../App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecipeGenerator = ({ onSaveSuccess }) => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const generateRecipe = async () => {
    if (!ingredients) return alert("Please enter ingredients!");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/recipe/generate", {
        ingredients: ingredients.split(",").map(i => i.trim()),
      });
      setRecipe(response.data);
    } catch (error) {
      alert("Error: Could not generate recipe.");
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = async () => {
    try {
      await axios.post("http://localhost:5000/api/recipe/save", recipe);
      setShowToast(true);
      if (onSaveSuccess) onSaveSuccess();
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert("Failed to save recipe.");
    }
  };

  const chartData = recipe ? {
    labels: ["Protein (g)", "Carbs (g)", "Fats (g)"],
    datasets: [{
      label: "Grams",
      data: [recipe.nutrition.protein, recipe.nutrition.carbs, recipe.nutrition.fats],
      backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
      borderRadius: 8,
    }]
  } : null;

  return (
    <div className="generator-wrapper" style={{ position: "relative" }}>
      
      {/* 1. SUCCESS TOAST (Always on top) */}
      {showToast && (
        <div className="toast-notification">
          <CheckCircle size={20} /> <span>Recipe added to favorites!</span>
        </div>
      )}

      {/* 2. LOADING OVERLAY (Outside the blurred div so it stays sharp) */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader-content">
            <UtensilsCrossed size={80} color="#3b82f6" className="fork-spoon-anim" />
            <p className="loader-text">Chef is cooking your AI recipe...</p>
          </div>
        </div>
      )}

      {/* 3. CONTENT CARD (This is the only part that blurs) */}
      <div className={`card ${loading ? "blurred" : ""}`}>
        <h2><Utensils color="#3b82f6" /> AI Recipe Generator</h2>
        
        <div className="input-group">
          <input
            className="input-field"
            placeholder="e.g. eggs, spinach, tomato"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button onClick={generateRecipe} disabled={loading} className="btn-primary">
            Generate
          </button>
        </div>

        {recipe && (
          <div className="recipe-content">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1>{recipe.title}</h1>
              <button onClick={saveToFavorites} className={`btn-save ${showToast ? 'save-btn-active' : ''}`}>
                <Heart size={18} fill={showToast ? "#ef4444" : "none"} /> Save Favorite
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
              <div>
                <h3>Instructions</h3>
                <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
              </div>
              <div className="nutrition-box">
                <h3 style={{ textAlign: 'center' }}>Nutrition</h3>
                <p style={{ textAlign: 'center' }}>Calories: <strong>{recipe.nutrition.calories}</strong></p>
                <div style={{ height: "200px" }}>
                  <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;