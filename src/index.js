// файл index.js 
import axios from 'axios';

const API_KEY = 'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8';

axios.defaults.headers.common['x-api-key'] = API_KEY;

import { fetchBreeds, fetchCatByBreedId } from './cat-api.js';

const selectElement = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');  
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

loaderElement.style.display = 'block';

fetchBreeds(selectElement, loaderElement, errorElement);

selectElement.addEventListener('change', handleSelectChange);  

async function handleSelectChange() {

  loaderElement.style.display = 'block';

  try {

    const breedId = selectElement.value;
    const catData = await fetchCatByBreedId(breedId);
    
    renderCat(catData);

  } catch (error) {

    errorElement.style.display = 'block';
    console.error(error);

  } finally {

    loaderElement.style.display = 'none'; 
    catInfoElement.style.display = 'flex';
  
  }

}

function renderCat(cat) {

  const { name, description, temperament, imageUrl } = cat;

  const markup = `
    <img src="${imageUrl}" width="500" height="400">
    <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <h4>Temperament:</h4> 
      <p>${temperament}</p>
    </div>
  `;

  catInfo.innerHTML = markup;

}