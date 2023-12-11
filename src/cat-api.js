import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_s8nipvOVu9x7M1Oib237fV73mUqJ5mMbosZrl0Spq6nATwMKfjepogDKSlr2wzo8';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };