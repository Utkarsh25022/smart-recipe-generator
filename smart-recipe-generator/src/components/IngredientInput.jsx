import { useState } from "react";

function IngredientInput({ onSearch }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState([]);

  // 🔎 Text search handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter ingredients.");
      return;
    }

    const ingredientsArray = input
      .split(",")
      .map((item) => item.trim().toLowerCase());

    setDetectedIngredients([]);
    onSearch(ingredientsArray);
  };

  // 📸 Real AI Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.ingredients) {
        const detected = data.ingredients
          .split(",")
          .map((item) => item.trim().toLowerCase());

        setDetectedIngredients(detected);
        setInput(detected.join(", "));
        onSearch(detected);
      } else {
        alert("Could not detect ingredients.");
      }

    } catch (error) {
      console.error(error);
      alert("Image analysis failed.");
    }

    setLoading(false);
  };

  return (
    <div className="ingredient-section">
      {/* 🔎 Text Input */}
      <form onSubmit={handleSubmit} className="ingredient-form">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Find Recipes</button>
      </form>

      {/* 📸 Image Upload */}
      <div style={{ marginTop: "15px" }}>
        <label
          style={{
            cursor: "pointer",
            color: "white",
            fontWeight: "500"
          }}
        >
          📸 Upload Ingredient Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* ⏳ Loading State */}
      {loading && (
        <p style={{ color: "white", marginTop: "10px" }}>
          Analyzing image with AI...
        </p>
      )}

      {/* 🧠 Detected Ingredients */}
      {detectedIngredients.length > 0 && !loading && (
        <p style={{ color: "white", marginTop: "10px" }}>
          Detected: {detectedIngredients.join(", ")}
        </p>
      )}
    </div>
  );
}

export default IngredientInput;
