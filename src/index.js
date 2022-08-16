import getUser, { resetPage } from './pixabay';
import onSuccessGet, { resetResponseCounter } from './response';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('.search-form');
const galleryDiv = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

let searchText;
const infiniteTrottle = throttle(infiniteLogic, 500);

function prepareMarkup(response) {
  return response.data.hits
    .map(object => {
      return `<a class="img-card" href="${object.largeImageURL}">
  <img src="${object.webformatURL}" alt="${object.tags}" loading="lazy" />
  <div class="about">
    <p class="about-item">
      <b>Likes</b></br> ${object.likes}
    </p>
    <p class="about-item">
      <b>Views</b></br> ${object.views}
    </p>
    <p class="about-item">
      <b>Comments</b></br> ${object.comments}
    </p>
    <p class="about-item">
      <b>Downloads</b></br> ${object.downloads}
    </p>
  </div>
</a>`;
    })
    .join('');
}

function createMarkup(markup, element) {
  element.insertAdjacentHTML('beforeend', markup);
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  searchText = e.target.elements.searchQuery.value.trim('');
  if (searchText) {
    emptyGallery();
    resetPage();
    resetResponseCounter();
    await getMarkup();
    lightboxRefresh();
    smoothScroll();
    infiniteScroll();
  }
});

function emptyGallery() {
  galleryDiv.innerHTML = '';
}

// function showLoadMore() {
//   moreBtn.classList.remove('hidden');
// }

// function hideLoadMore() {
//   moreBtn.classList.add('hidden');
// }

function lightboxRefresh() {
  lightbox.refresh();
}

async function getMarkup() {
  try {
    const response = await getUser(searchText);

    if (response.data.hits.length < 40) {
      window.removeEventListener('scroll', infiniteTrottle);
    }
    onSuccessGet(response);
    const preparation = prepareMarkup(response);
    createMarkup(preparation, galleryDiv);
  } catch (error) {
    throw new Error(error);
  }
}

function infiniteScroll() {
  setTimeout(infiniteListener, 1000);
}

function infiniteListener() {
  window.addEventListener('scroll', infiniteTrottle);
}

function infiniteLogic() {
  var scrollHeight = document.documentElement.scrollHeight;
  var scrollTop = document.documentElement.scrollTop;
  var clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight > scrollHeight - 500) {
    getMarkup();
    lightboxRefresh();
  }
}

function smoothScroll() {
  const elem = galleryDiv.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: `${elem}`,
    behavior: 'smooth',
  });
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
