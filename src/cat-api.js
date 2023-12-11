// файл cat-api.js

import axios from 'axios';
import { fetchBreeds, fetchCatByBreedId } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] = 'LIVE_API_KEY';

const selectElement = document.querySelector('.breed-select'); 
const loaderElement = document.querySelector('.loader');
import Notiflix from 'notiflix';

export async function fetchBreeds(selectElement, loaderElement, errorElement) {

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');

    response.data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id; 
      option.textContent = breed.name;
      selectElement.appendChild(option);
    });

  } catch (error) {
    
    loaderElement.style.display = 'none';
    selectElement.style.display = 'none';
    errorElement.style.display = 'block';

    Notiflix.Notify.failure('Failed to fetch breeds!');
    throw error;
  
  }

}

export async function fetchCatByBreedId(breedId) {

  try {

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    if(!response.data.length) {
      throw new Error('Response data is empty');
    }

    const { name, temperament, description } = response.data[0].breeds[0];  
    const imageUrl = response.data[0].url;

    return { name, temperament, description, imageUrl };

  } catch (error) {

    throw error;

  }

}