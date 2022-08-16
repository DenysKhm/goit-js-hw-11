//Imports
import axios from 'axios';

//Vars
let PAGE_COUNTER = 1;

//Export basic logic to work with API
export default async function getUser(searchQ) {
  try {
    const BASE_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '28712886-1cb23b606877bc8498f4e16b7',
      q: `${searchQ}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${PAGE_COUNTER}`,
      per_page: 40,
    });

    const response = await axios.get(`${BASE_URL}/?${searchParams}`);

    PAGE_COUNTER += 1;

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

//Export for function to reset PAGE_COUNTER
export const resetPage = () => {
  PAGE_COUNTER = 1;
};
