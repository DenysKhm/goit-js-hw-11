//Imports
import axios from 'axios';

//Vars
let PAGE_COUNTER = 1;

//Export basic logic to work with API
export default async function getUser(search) {
  try {
    const BASE_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '29306841-b1a7c1605907e307c246cc444',
      q: `${search}`,
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

export const resetPage = () => {
  PAGE_COUNTER = 1;
};
