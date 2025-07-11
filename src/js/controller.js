import * as model from './model.js'; // Importing the model
import recipeView from './views/recipeView.js'; // Importing the recipe view
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable'; // For polyfilling ES6 features
import 'regenerator-runtime/runtime'; // For async/await support

if (module.hot) {
  module.hot.accept(); // Enable hot module replacement
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // Get the ID from the URL hash
    if (!id) return; // If no ID, exit the function

    recipeView.renderSpinner();

    await model.loadRecipe(id); // Load the recipe using the model

    //loading recipe
    const { recipe } = model.state; // Get the recipe from the model
    // 2) rendering recipe

    recipeView.render(recipe); // Render the recipe using the recipe view
   recipeView.addHandlerUpdateServings(controlServings); // Add event listener for updating servings
  } catch (error) {
    recipeView.renderError(); // Render an error message if something goes wrong
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner(); // Render a spinner while loading search results
    const query = searchView.getQuery(); // Get the search query from the search view
    if (!query) return; // If no query, exit the function

    await model.loadSearchResults(query);
    // const { results } = model.state.search; // Get the search results from the model
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search); // Render the search results using the results view
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage)); // Render the search results for the specified page

  paginationView.render(model.state.search); // Render the pagination view  \
};

const controlServings = function (newServings) {

  model.updateServings(newServings); // Update the servings in the model 
  recipeView.update(model.state.recipe); // Re-render the recipe view with the updated servings
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe); // Add event listener for rendering the recipe
  searchView.addHandlerSearch(controlSearchResults); // Add event listener for searching recipes
  paginationView.addHandlerClick(controlPagination);
  
};

init();
