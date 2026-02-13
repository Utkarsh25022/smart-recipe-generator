🚀 Smart Recipe Generator
📌 Overview

Smart Recipe Generator is a full-stack web application that suggests recipes based on user-provided ingredients.

It supports:

Text-based ingredient input

Image-based ingredient detection (mock AI via backend)

Recipe filtering

Nutritional information

Rating & Favorites system

Serving size adjustment

The architecture supports real AI integration and is structured for production scalability.

✨ Features
🔎 Ingredient Input

Manual ingredient entry

Image upload for ingredient detection (backend AI simulation)

Loading state during analysis

🍽 Recipe Matching

Ingredient-based matching algorithm

Score-based sorting

Multiple recipe suggestions

🎛 Filters

Difficulty (Easy / Medium / Hard)

Diet type (Vegetarian / Vegan / Non-Vegetarian)

Cooking time

Show Favorites only

⭐ User Interaction

5-star rating system (stored in localStorage)

Save to Favorites

Persistent state after refresh

🥗 Nutrition & Serving

Calories

Protein

Dynamic serving size adjustment

🧠 Architecture
Frontend

React (Vite)

Component-based architecture

Local state management

localStorage persistence

Backend

Express.js

Multer (image upload)

Mock AI ingredient detection

CORS enabled

The backend structure supports integration with real AI APIs.

⚙️ How to Run
1️⃣ Install Frontend
npm install
npm run dev


Runs on:

http://localhost:5173

2️⃣ Run Backend
cd server
npm install
node index.js


Runs on:

http://localhost:5000

🧪 Image Testing

Rename image files to:

paneer.jpg

chicken.png

salad.jpeg

The backend simulates ingredient detection based on filename.

🔐 Environment Variables

Create server/.env if integrating real AI:

OPENAI_API_KEY=your_key_here

🚀 Future Improvements

Real AI ingredient detection

Recipe substitution suggestions

Authentication system

Database integration

Deployment (Render / Vercel)

👨‍💻 Author

Utkarsh Kumar