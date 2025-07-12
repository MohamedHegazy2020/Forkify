# Forkify Recipe App

A web application built with the Model-View-Controller (MVC) architecture.

## Table of Contents

1. [Features](#features)
2. [Application Flow Charts](#application-flow-charts)
	* [User Flow](#user-flow)
	* [Architecture Flow](#architecture-flow)
3. [DOM Update Algorithm](#dom-update-algorithm)
4. [Starting the Application](#starting-the-application)

## Features

1. **Search Functionality**: Perform API search requests for recipes.
2. **Pagination**: Navigate through search results with pagination.
3. **Recipe Display**: View detailed recipes with comprehensive information.
4. **Bookmarks Functionality**:
	* Bookmark recipes.
	* View bookmarked recipes.

## Application Flow Charts

### User Flow

1. **User Searches for a Recipe**: Asynchronously load search results from the API. Render the results in the application with pagination.
2. **Recipe Selection**: Asynchronously load recipe data from the API. On data arrival, render the recipe in the user interface. This process is initiated when the page loads with a recipe ID in the URL.
3. **Bookmarks**: User can bookmark some recipes that can explore again and these bookmarks are stored in the local storage in the users browsers. Load the saved bookmarks when the page loads.
4. **Upload Recipe**: User can upload recipe to the application.

### Architecture Flow

1. ![Flowchart Part 1](/forkify-flowchart-part-1.png)
	* **Search for a Recipe**: Asynchronously load results from the API. Once results are available, they are rendered in the application.
	* **Pagination**: Pagination buttons allow navigation through search results. Clicking a page button displays the selected page.
	* **Recipe Selection**: Asynchronously load recipe data from the API. On data arrival, the recipe is rendered in the user interface. This process is initiated when the page loads with a recipe ID in the URL.
2. ![Flowchart Part 2](/forkify-flowchart-part-2.png)
	* **Bookmarks**: User can bookmark some recipes that can explore again and these bookmarks stored in the local storage in the users browsers and load the saved bookmarks when the page load.
3. ![Flowchart Part 3](/forkify-flowchart-part-3.png)
	* **Upload Recipe**: Users can upload their own recipes.
	* **Recipe Upload Result**: After uploading a recipe, it is automatically bookmarked.
	* **User Recipe Visibility**: Users can only view their own recipes, and not those of other users.

## DOM Update Algorithm

Inspired by React.js, I developed an algorithm that optimizes DOM updates. Instead of re-rendering the entire DOM with each UI change, this algorithm compares the current DOM with the newly created markup. It identifies the differences and updates only the necessary DOM nodes, enhancing performance and efficiency.

## Starting the Application

1. Clone the Git repository.
2. Ensure Node.js is installed on your system.
3. Run the command `npm install` to set up the project dependencies.
4. Run the command `npm run start` to start the project in development mode.
5. Run the command `npm run build` to bundle the files and generate the production version.

