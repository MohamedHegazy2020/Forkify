import icon from 'url:../../img/icons.svg'; // Parcel 2 requires this to be imported
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  render(data) {
    this._data = data; // Store the data in the view instance
    const markup = this._generateMarkup();
    this._clear(); // Clear the parent element before rendering new content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // Add event listener for pagination buttons
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // Calculate the number of pages
    const currentPage = this._data.page; // Get the current page



    // page 1 , and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
                <button class="btn--inline pagination__btn--next" data-goto="${
                  currentPage + 1
                }">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
    }
    // page 1 and there are no other pages
    if (currentPage === 1 && numPages === 1) {
      return '';
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
                <button class="btn--inline pagination__btn--prev" data-goto="${
                  currentPage - 1
                }">
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
    }
    // other page
    if (currentPage < numPages) {
      return `
                <button class="btn--inline pagination__btn--prev" data-goto="${
                  currentPage - 1
                }">
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next" data-goto="${
                  currentPage + 1
                }">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
    }
    // page 1 and there are no other pages
    return '';
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline'); // Get the closest button element
      if (!button) return; // If no button is clicked, exit the function
        const goToPage = +button.dataset.goto; // Get the page number from the button's data attribute
        
      handler(goToPage); // Call the handler with the page number
    });
  }
 
}

export default new PaginationView();
