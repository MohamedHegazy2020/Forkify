import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
// Function to load a recipe by ID
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    state.recipe = data.data.recipe;
  } catch (err) {
    throw err;
  }
};
// Search functionality
export const loadSearchResults = async function (query) {
  try {
    if (!query) throw new Error('No search query provided');
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.results = data.data.recipes;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) { 

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  })
  state.recipe.cooking_time = Math.ceil(
    state.recipe.cooking_time * newServings / state.recipe.servings
  );
  state.recipe.servings = newServings; // Update the servings in the recipe


}