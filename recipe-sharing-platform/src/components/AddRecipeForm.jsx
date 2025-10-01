import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !steps) {
      setError('All fields are required.');
      return;
    }

    const ingredientsList = ingredients.split(',').map((item) => item.trim());
    if (ingredientsList.length < 2) {
      setError('Please enter at least two ingredients.');
      return;
    }

    setError('');
    const newRecipe = {
      title,
      ingredients: ingredientsList,
      steps: steps.split('.').map((s) => s.trim()).filter(Boolean),
    };

    console.log('Submitted Recipe:', newRecipe);
    alert('Recipe submitted (not saved — mock only).');

    setTitle('');
    setIngredients('');
    setSteps('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Add a New Recipe</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Chicken Alfredo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. chicken, cream, pasta, garlic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preparation Steps (use periods)</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Cook pasta. Fry chicken. Mix with sauce."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;