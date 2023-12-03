import axios from "axios";
const apiKey = "live_q3MIWw2yF59KJEOyinnMMcHRwSmAi24WkIzAz1wn1gUpNT23Kn9lXJyfduJcA2Fu"; // Замініть на свій ключ
const headers = {
  "Content-Type": "application/json",
  "x-api-key": apiKey,
};
export function fetchBreeds() {
  const loader = document.querySelector('.loader');
  const breedSelect = document.querySelector('.breed-select');
  loader.classList.add('show');
  breedSelect.classList.add('hide');
  return axios.get("https://api.thecatapi.com/v1/breeds", { headers })
    .then(response => {
      loader.classList.remove('show');
      breedSelect.classList.remove('hide');
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching cat breeds:", error);
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  loader.classList.add('show');
  catInfo.classList.add('hide');
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url, { headers })
    .then(response => {
      loader.classList.remove('show');
      catInfo.classList.remove('hide');
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching cat by breed:", error);
      throw error;
    });
}
