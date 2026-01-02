import React, { useState } from "react";
import RecipeGenerator from "./components/RecipeGenerator";
import SavedRecipes from "./components/SavedRecipes";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <header className="header">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>🥗 Smart Chef AI</h1>
          <p style={{ color: '#6b7280' }}>Generate healthy recipes and track your nutrition.</p>
        </header>
        
        <RecipeGenerator onSaveSuccess={triggerRefresh} />
        
        <div style={{ marginTop: '50px' }}>
          <SavedRecipes refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;