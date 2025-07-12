import icons from 'url:../../img/icons.svg'; // Parcel 2 requires this to be imported

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // Check if data is provided
    this._data = data;
    const markup = this._generateMarkup();
    this._clear(); // Clear the parent element before rendering new content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = ''; // Clear the parent element
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div> `;
    this._clear(); // Clear previous content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${this._errorMessage}</p>
            </div>`;
    this._clear(); // Clear previous content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear(); // Clear previous content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
   
    this._data = data; // Update the data in the view instance
    const newMarkup = this._generateMarkup(); // Generate new markup
    const newDOM = document.createRange().createContextualFragment(newMarkup); // Create a new DOM fragment from the markup
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Get all new elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Get all current elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // Get the corresponding current element
      // Update changed text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent; // Update text content
      }
      // Update changed attributes
      //
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value); // Update attributes
        });
      }

    });
      
      // Note: This method only updates the text content and attributes of the elements,
    // it does not re-render the entire view. This is useful for performance optimization
    
  }
}
