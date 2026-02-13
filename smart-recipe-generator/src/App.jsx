import { useState } from "react";
import IngredientInput from "./components/IngredientInput";
import RecipeCard from "./components/RecipeCard";
import recipes from "./data/recipes";
import { matchRecipes } from "./utils/recipeMatcher";
import "./styles/App.css";

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = (userIngredients) => {
    let results = matchRecipes(userIngredients, recipes);

    if (difficulty) {
      results = results.filter(r => r.difficulty === difficulty);
    }

    if (diet) {
      results = results.filter(r => r.diet === diet);
    }

    if (maxTime) {
      results = results.filter(r => r.time <= parseInt(maxTime));
    }

    if (showFavorites) {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      results = results.filter(r => savedFavorites.includes(r.id));
    }

    setFilteredRecipes(results);
  };

  return (
    <div className="app">
      <h1>Smart Recipe Generator 🍽️</h1>

      <IngredientInput onSearch={handleSearch} />

      <div className="filters">
        <select onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select onChange={(e) => setDiet(e.target.value)}>
          <option value="">All Diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>

        <select onChange={(e) => setMaxTime(e.target.value)}>
          <option value="">Any Time</option>
          <option value="15">Under 15 mins</option>
          <option value="30">Under 30 mins</option>
          <option value="45">Under 45 mins</option>
        </select>

        {/* ❤️ Favorites Filter */}
        <label style={{ marginLeft: "10px", color: "white" }}>
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          Show Favorites Only
        </label>
      </div>

      <div className="recipes-container">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
