import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    if (isFavorite(id)) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
  };

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes added yet!</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            <button 
              onClick={() => toggleFavorite(recipe.id)}
              style={{ marginLeft: '10px'}} 
              >
                {isFavorite(recipe.id) ? '💖 Unfavorite' : '🤍 Favorite'} 
              </button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;