import React, { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

const IngredientForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/ingredients/add", { name });
    alert("Saved to Database!");
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Add ingredient to DB..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", flex: 1 }}
        required
      />
      <button type="submit" style={{ padding: "10px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
        <PlusCircle size={20} /> Add
      </button>
    </form>
  );
};

export default IngredientForm;