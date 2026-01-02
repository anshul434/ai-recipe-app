import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, BookOpen } from "lucide-react";
import "../App.css";

const SavedRecipes = ({ refreshKey }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipe/favorites");
      setFavorites(res.data);
    } catch (err) { console.error("Fetch failed"); }
  };

  useEffect(() => { fetchFavorites(); }, [refreshKey]);

  const deleteRecipe = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/recipe/favorites/${id}`);
      fetchFavorites();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="favorites-section">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BookOpen color="#10b981" /> Saved Favorites
      </h2>
      <div className="favorites-grid">
        {favorites.map((r) => (
          <div key={r._id} className="fav-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{r.title}</h3>
              <Trash2 size={18} color="#ef4444" cursor="pointer" onClick={() => deleteRecipe(r._id)} />
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              Calories: {r.nutrition.calories} | P: {r.nutrition.protein}g | C: {r.nutrition.carbs}g
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;