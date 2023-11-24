import axios from 'axios';

// Встановлюємо ключ доступу для всіх HTTP-запитів
axios.defaults.headers.common['x-api-key'] = 'твій ключ';

// Функція для виконання HTTP-запиту за колекцією порід
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Функція для виконання HTTP-запиту за інформацією про кота за породою
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
}
