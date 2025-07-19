import icons from 'url:../../img/icons.svg'; // Importing icons from the SVG file
import Fraction from 'fraction.js';
import View from './view.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return; // closure
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    // This method can be used to generate the markup if needed
    // Currently, the render method directly generates the markup
    return `
        <figure class="recipe__fig">
              <img src="${
                this._data.image_url
              }" alt="Tomato" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
        </figure>
    
        <div class="recipe__details">
          <div class="recipe__info">
          <i class="fas fa-stopwatch recipe__info-icon"></i>
               
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cooking_time
                }</span>
                <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
              <i class="fas fa-users recipe__info-icon"></i>
               
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>
                <div class="recipe__info-buttons" >
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings - 1
                  }">
                  <i class="fas recipe__info-icon fa-minus-circle "></i> 
                   
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${
                    this._data.servings + 1
                  }">
                  <i class="fas recipe__info-icon fa-plus-circle"></i>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                 <i class="fas fa-user"></i>  
              </div>
              <button class="btn--round btn--bookmark">
              <i class=" fa-bookmark${
                this._data.bookmarked ? ' fas' : ' fa-regular '
              }"></i>

              
               
              </button>
            </div>
    
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                  .map(
                    ing => this._generateMarkupIngredient(ing)
                    // Generate markup for each ingredient
                  )
                  .join('')}
              </ul>
            </div>
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.source_url}"
                target="_blank"
              >
                <span>Directions</span>
                <i class="fas fa-arrow-right"></i>
              </a>
            </div>
        `;
  }

  _generateMarkupIngredient(ing) {
    // Handle case where quantity is undefined
    return `<li class="recipe__ingredient">
    <i class="fas fa-check recipe__icon"></i>
                  
                    <div class="recipe__quantity">${
                      new Fraction(ing.quantity).toString() === '0'
                        ? ''
                        : new Fraction(ing.quantity).toFraction(true)
                    } </div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit}</span>
                      ${ing.description}
                    </div>
                  </li>`;
  }
}

export default new RecipeView();
