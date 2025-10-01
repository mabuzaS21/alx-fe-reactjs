import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/src/data.json')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Failed to load recipes:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing Platform</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}