import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else {
      const list = ingredients.split(',').map(i => i.trim());
      if (list.length < 2) {
        newErrors.ingredients = 'Please include at least two ingredients.';
      }
    }

    if (!steps.trim()) newErrors.steps = 'Preparation steps are required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newRecipe = {
      title,
      ingredients: ingredients.split(',').map(i => i.trim()),
      steps: steps.split('.').map(s => s.trim()).filter(Boolean),
    };

    console.log('Submitted Recipe:', newRecipe);
    alert('Recipe submitted (mock only).');

    setTitle('');
    setIngredients('');
    setSteps('');
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Add a New Recipe</h2>
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
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ingredients (comma separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. chicken, cream, pasta, garlic"
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preparation Steps (use periods)</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Cook pasta. Fry chicken. Mix with sauce."
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
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