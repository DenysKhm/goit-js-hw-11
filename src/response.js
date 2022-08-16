import { Notify } from 'notiflix/build/notiflix-notify-aio';
let RESPONSE_COUNTER = 1;

export default function onSuccessGet(response) {
  if (response.data.hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (RESPONSE_COUNTER === 1) {
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  } else if (response.data.hits.length < 40) {
    return Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    // hideLoadMore();
  }

  // showLoadMore();
  RESPONSE_COUNTER += 1;
}

export const resetResponseCounter = () => {
  RESPONSE_COUNTER = 1;
};
