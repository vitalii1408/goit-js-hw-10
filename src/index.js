import axios from "axios";
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
document.addEventListener("DOMContentLoaded", function () {
  const slimSelect = new SlimSelect({
    select: '#breed-select',
    placeholder: 'Select Cat Breed',
  });
  document.getElementById('search-btn').addEventListener('click', function () {
    const selectedBreeds = slimSelect.selected();

    if (selectedBreeds.length > 0) {
      const breedId = selectedBreeds[0].value;
      fetchCatByBreed(breedId);
    }
  });
  function updateBreedsSelect() {
    fetchBreeds()
      .then((breeds) => {
        slimSelect.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
      })
      .catch((error) => {
        console.error("Error loading breeds:", error);
        showError();
      });
  }
  updateBreedsSelect();
});
function fetchCatByBreed(breedId) {
  const catInfoElement = document.querySelector('.cat-info');
  const loaderElement = document.querySelector('.loader');
  loaderElement.classList.add('show');
  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catInfo = response.data[0];
      console.log("Fetched Cat Info:", catInfo);
      if (catInfo && catInfo.url && catInfo.breeds && catInfo.breeds.length > 0) {
        catInfoElement.innerHTML = `
          <img src="${catInfo.url}" alt="${catInfo.breeds[0].name || 'Cat Image'}">
          <p>Breed: ${catInfo.breeds[0].name || 'N/A'}</p>
          <p>Description: ${catInfo.breeds[0].description || 'N/A'}</p>
          <p>Temperament: ${catInfo.breeds[0].temperament || 'N/A'}</p>
        `;
      } else {
        console.error("Invalid Cat Info:", catInfo);
        showError();
      }
      loaderElement.classList.remove('show');
    })
    .catch((error) => {
      console.error("Error fetching cat info:", error);
      showError();
    });
}
function showError() {
  const errorElement = document.querySelector('.error');
  const loaderElement = document.querySelector('.loader');
  errorElement.classList.add('show');
  loaderElement.classList.remove('show');
}
