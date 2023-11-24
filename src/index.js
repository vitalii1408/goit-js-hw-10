// index.js

import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const apiKey =
  'live_q3MIWw2yF59KJEOyinnMMcHRwSmAi24WkIzAz1wn1gUpNT23Kn9lXJyfduJcA2Fu';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] = apiKey;

// Функція для обробки стану завантаження
function toggleLoader(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
}

// Функція для відображення повідомлення про помилку
function showError() {
  error.style.display = 'block';
}

// Функція для приховування повідомлення про помилку
function hideError() {
  error.style.display = 'none';
}

// Функція для очищення вмісту блоку catInfo
function clearCatInfo() {
  catInfo.innerHTML = '';
}

// Функція для відображення кота та його інформації
function showCat(cat) {
  const catImage = document.createElement('img');
  catImage.src = cat.url;
  catImage.alt = 'Cat Image';

  const catName = document.createElement('p');
  catName.textContent = `Breed: ${cat.breeds[0].name}`;

  const catDescription = document.createElement('p');
  catDescription.textContent = `Description: ${cat.breeds[0].description}`;

  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);
}

// Функція для ініціалізації додатку
async function initializeApp() {
  try {
    toggleLoader(true);
    hideError();
    clearCatInfo();
    // Викликаємо функцію fetchBreeds із cat-api.js
    const breeds = await fetchBreeds();
    toggleLoader(false);

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    toggleLoader(false);
    showError();
  }
}

// Викликаємо функцію для ініціалізації додатку при завантаженні сторінки
initializeApp();

// Додайте подію на зміну вибору породи
breedSelect.addEventListener('change', async () => {
  try {
    toggleLoader(true);
    hideError();
    clearCatInfo();

    const selectedBreedId = breedSelect.value;
    // Викликаємо функцію fetchCatByBreed із cat-api.js
    const cat = await fetchCatByBreed(selectedBreedId);

    showCat(cat);
  } catch (error) {
    toggleLoader(false);
    showError();
  } finally {
    toggleLoader(false);
  }
});
