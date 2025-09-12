import { create } from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setRecipes: (recipes) => set({ recipes }),
  
 addRecipe: (newRecipe) => set(state => {
  const updatedRecipes = [...state.recipes, newRecipe];
  const updatedFiltered = updatedRecipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()));
  return {
    recipes: updatedRecipes,
    filteredRecipes: updatedFiltered
  };
 }),

 deleteRecipe: (id) => set(state => {
  const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
  const updatedFiltered = updatedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );
  return {
    recipes: updatedRecipes,
    filteredRecipes: updatedFiltered
  };
 }),

 updateRecipe: (updateRecipe) => set(state => {
  const updatedRecipes = state.recipes.map(recipe => 
    recipe.id === updatedRecipe.id ? updatedRecipe : recipe 
  );
  const updatedFiltered = updatedRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );
  return {
    recipes: updatedRecipes,
    filteredRecipes: updatedFiltered
  };
 }),

 setSearchTerm: (term) => {
  set ({ searchTerm: term });
  get().filterRecipes();
 },

 filterRecipes: () => {
  const { recipes, searchTerm } = get();
  const filtered = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  set({ filteredRecipes: filtered });
 }
}));

export { useRecipeStore};