import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, BookOpen } from "lucide-react";
import "../App.css";

// LIVE RENDER BACKEND URL
const API_BASE_URL = "https://ai-recipe-app-mafv.onrender.com";

const SavedRecipes = ({ refreshKey }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      // Updated: localhost hata kar Render URL dala hai
      const res = await axios.get(`${API_BASE_URL}/api/recipe/favorites`);
      setFavorites(res.data);
    } catch (err) { 
      console.error("Fetch failed:", err.message); 
    }
  };

  useEffect(() => { 
    fetchFavorites(); 
  }, [refreshKey]);

  const deleteRecipe = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      // Updated: localhost hata kar Render URL dala hai
      await axios.delete(`${API_BASE_URL}/api/recipe/favorites/${id}`);
      fetchFavorites();
    } catch (err) { 
      alert("Delete failed"); 
      console.error("Delete Error:", err.message);
    }
  };

  return (
    <div className="favorites-section">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BookOpen color="#10b981" /> Saved Favorites
      </h2>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p style={{ color: '#666' }}>No saved recipes yet.</p>
        ) : (
          favorites.map((r) => (
            <div key={r._id} className="fav-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0 }}>{r.title}</h3>
                <Trash2 size={18} color="#ef4444" cursor="pointer" onClick={() => deleteRecipe(r._id)} />
              </div>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Calories: {r.nutrition?.calories || 0} | P: {r.nutrition?.protein || 0}g | C: {r.nutrition?.carbs || 0}g
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;