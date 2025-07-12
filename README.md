# Forkify

## Project Overview

Forkify is an advanced web application designed using the Model-View-Controller (MVC) architecture. This application allows users to efficiently search for recipes, save their preferred recipes, and bookmark their favorites with step-by-step instructions. The app employs a micro-frontends architecture, where each feature functions as a distinct application. Key features include a search bar for recipe lookup by keyword, a grid of recipe cards displaying search results, a detailed recipe page with bookmarking capabilities, and a bookmarks page to view all saved recipes.

![Forkify Architecture](/forkify-architecture-recipe-loading.png)

## Features

1. **Search Functionality**: Perform API search requests for recipes.
2. **Pagination**: Navigate through search results with pagination.
3. **Recipe Display**: View detailed recipes with comprehensive information.

[API URL](https://forkify-api.jonas.io/)

## Application Flow Charts

1. ![Flowchart Part 1](/forkify-flowchart-part-1.png)

   - **User Searches for a Recipe**: Asynchronously load results from the API. Once results are available, they are rendered in the application.
   - **Pagination**: Pagination buttons allow navigation through search results. Clicking a page button displays the selected page.
   - **Recipe Selection**: Asynchronously load recipe data from the API. On data arrival, the recipe is rendered in the user interface. This process is initiated when the page loads with a recipe ID in the URL.

2. ![Flowchart Part 2](/forkify-flowchart-part-2.png)

   - **User Bookmarks a Recipe**: user can bookmark some recipes that can expolre again and these bookmarks stored in the local storage in the users browsers .

3. ![Flowchart Part 3](/forkify-flowchart-part-3.png)

## DOM Update Algorithm

Inspired by React.js, I developed an algorithm that optimizes DOM updates. Instead of re-rendering the entire DOM with each UI change, this algorithm compares the current DOM with the newly created markup. It identifies the differences and updates only the necessary DOM nodes, enhancing performance and efficiency.

## Starting the Application

1. Clone the Git repository.
2. Ensure Node.js is installed on your system.
3. Run the command `npm install` to set up the project dependencies.
