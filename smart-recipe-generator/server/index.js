import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

// 🧠 Mock AI Image Detection Route
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const fileName = req.file.originalname.toLowerCase();

    let ingredients = [];

    // Smart mock detection based on filename
    if (fileName.includes("paneer")) {
      ingredients = ["paneer", "tomato", "butter"];
    } 
    else if (fileName.includes("chicken")) {
      ingredients = ["chicken", "onion", "garlic"];
    } 
    else if (fileName.includes("salad")) {
      ingredients = ["cucumber", "tomato", "olive"];
    } 
    else if (fileName.includes("egg")) {
      ingredients = ["egg", "onion", "pepper"];
    } 
    else {
      // Default fallback
      ingredients = ["tomato", "onion"];
    }

    // Simulate AI delay
    setTimeout(() => {
      res.json({ ingredients: ingredients.join(", ") });
    }, 1200);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image analysis failed" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Mock AI Server running on http://localhost:5000");
});
