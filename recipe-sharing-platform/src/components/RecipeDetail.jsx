import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch('/src/data.json')
      .then((res) => res.json())
      .then((data) => {
        const selectedRecipe = data.find((r) => r.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((err) => console.error('Failed to load recipe:', err));
  }, [id]);

  if (!recipe) {
    return <div className="p-4 text-center text-gray-500">Loading recipe...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-6 text-gray-700">{recipe.summary}</p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {(recipe.ingredients || []).map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          {(recipe.instructions || []).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}