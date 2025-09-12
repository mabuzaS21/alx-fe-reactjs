import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [], 
  searchTerm: '',  
  filteredRecipes: [],
  favorites: [],
  recommendations: [],  

  setRecipes: (recipes) => set({ recipes }),

  addRecipe: (newRecipe) => set(state => {
    const updatedRecipes = [...state.recipes, newRecipe];
    const updatedFiltered = updatedRecipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()));
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFiltered,
    };
  }),

  deleteRecipe: (id) => set(state => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    const updatedFiltered = updatedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFiltered,
    };
  }),

  updateRecipe: (updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    const updatedFiltered = updatedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedFiltered,
    };
  }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); 
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },

  addFavorite: (recipeId) => set(state => ({
    favorites: [...state.favorites, recipeId],
  })),

  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId),
  })),

  generateRecommendations: () => set(state => {
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5  
    );
    return { recommendations: recommended };
  }),
}));

export { useRecipeStore };