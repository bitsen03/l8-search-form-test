/* eslint-disable */
import axios from 'axios';

export default () => {
  const container = document.querySelector('.search-form-container');
  const responseContainer = document.querySelector('.results-container');
  container.innerHTML = `
  <div class="col-auto">
      <i class="fas fa-search h4 text-body mr-2"></i>
  </div>
  <div class="col">
  <input class="form-control form-control-lg form-control-borderless" type="search"
      placeholder="Search topics or keywords">
  </div>
  <div class="col-auto">
      <button class="btn btn-lg btn-success" type="submit">Search</button>
  </div>`;
  const input = document.querySelector('input');
  const searchResult = document.querySelector('.search-results');

  const button = document.querySelector('.btn');
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const value = input.value;
    const {products}  = (await axios.get('/goods')).data;
    console.log(products)
    const validProducts = products.filter((product) => new RegExp(value, 'i').test(product.title));
    const price = validProducts.map(({price}) => +price);
    const minPrice = Math.min(price);
    const i = price.indexOf(minPrice);
    const cards =  validProducts.map(({title, description, price, images}, indx) => {
      let priceDiv = `<h3 class="card-text">${price}</h3>`
      if (i)

      return `<div class="card">
      <img src="${images[0]}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
         ${priceDiv}
      </div>
  </div>`
    });
    searchResult.innerHTML = cards.join('\n');

    responseContainer.innerHTML = `<div class="goods-quantity">Goods total: ${validProducts.length}</div>`;
  });
  

};
