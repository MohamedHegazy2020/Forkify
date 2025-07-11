class SearchView {
  _parentElement = document.querySelector('.search');
  _searchInput = this._parentElement.querySelector('.search__field');
  _errorMessage = 'No results found. Please try again!';

  getQuery() {
    const query = this._searchInput.value;
    this._clearInput(); // Clear the input field after getting the query
    return query;
  }
  _clearInput() {
    this._searchInput.value = ''; // Clear the input field
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // Call the handler function when the search form is submitted
    });
  }
}

export default new SearchView();
