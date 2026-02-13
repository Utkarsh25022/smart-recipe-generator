import { useState, useEffect } from "react";

function RecipeCard({ recipe }) {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [servings, setServings] = useState(1);

  // Load saved ratings & favorites
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (savedRatings[recipe.id]) {
      setRating(savedRatings[recipe.id]);
    }

    if (savedFavorites.includes(recipe.id)) {
      setIsFavorite(true);
    }
  }, [recipe.id]);

  const handleRating = (value) => {
    setRating(value);

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    savedRatings[recipe.id] = value;
    localStorage.setItem("ratings", JSON.stringify(savedRatings));
  };

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter(id => id !== recipe.id);
    } else {
      savedFavorites.push(recipe.id);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  const increaseServing = () => setServings(servings + 1);
  const decreaseServing = () => {
    if (servings > 1) setServings(servings - 1);
  };

  return (
    <div className="recipe-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{recipe.name}</h3>
        <span
          onClick={toggleFavorite}
          style={{
            cursor: "pointer",
            fontSize: "22px",
            color: isFavorite ? "red" : "#ccc"
          }}
        >
          ♥
        </span>
      </div>

      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Time:</strong> {recipe.time} mins</p>

      {/* 🍽 Serving Control */}
      <div style={{ margin: "10px 0" }}>
        <strong>Servings:</strong>
        <button onClick={decreaseServing} style={{ margin: "0 8px" }}>-</button>
        {servings}
        <button onClick={increaseServing} style={{ margin: "0 8px" }}>+</button>
      </div>

      <p><strong>Calories:</strong> {recipe.calories * servings}</p>
      <p><strong>Protein:</strong> {parseInt(recipe.protein) * servings}g</p>
      <p><strong>Diet:</strong> {recipe.diet}</p>

      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#FFD700" : "#ccc",
              fontSize: "20px"
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default RecipeCard;
