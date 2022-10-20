import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from '../src/js-components/loadMoreBtn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GalleryApiService, SerchImagesByKeyWord } from './searchApi';

const galleryApiService = new GalleryApiService();

new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[class="load-more"]',

  hidden: false,
});

console.log(loadMoreBtn);

loadMoreBtn.show()
loadMoreBtn.disable()

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();

  // clearImagesContainer()
  galleryApiService.word = e.target.elements.searchQuery.value;
  galleryApiService.resetPage();

  if (galleryApiService.word === '') {

    return alert('Please fill form');
  }

  await galleryApiService.fetchImages().then( dt=> {
    clearImagesContainer();
    appendGalleryMarkup(dt.hits)
  }).catch(err =>console.log(err))
}

async function onLoadMore() {
  await galleryApiService.fetchImages().then(dt=> {
    appendGalleryMarkup(dt.hits);
  });
}



function appendGalleryMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery__item">
              <a class="gallery__link" href="${largeImageURL}">
              <div class="photo-card">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" width='240px' hight ='400px' />
              <div class="info">
                <p class="info-item">
                  <b>Likes${likes}</b>
                </p>
                <p class="info-item">
                  <b>Views${views}</b>
                </p>
                <p class="info-item">
                  <b>Comments${comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads${downloads}</b>
                </p>
              </div>
            </div>
              </a>
          </li>
          
          `;
      }
    )
    .join('');
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
// const form = document.querySelector("form");
// const list = document.querySelector(".list");
// const button = document.querySelector(".more");

// const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
// const API = "9cTjAjlRB53wyhAFk5VzXcBu5GiPU6fK";

// let pageToFetch = 0;
// let keyword = "";

// function fetchEvent(page, keyword) {
//   const params = new URLSearchParams({
//     apikey: API,
//     page,
//     keyword,
//     size: 50,
//   });

//   return fetch(`${BASE_URL}?${params}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch((error) => console.log(error));
// }

// function getEvents(page, keyword) {
//   fetchEvent(page, keyword).then((data) => {
//     console.log(data.page.totalElements);

//     if (data.page.totalElements === 0) {
//       button.classList.add("invisible");
//       alert(`There are no events by keyword ${keyword}`);
//     }

//     const events = data?._embedded?.events;
//     if (events) {
//       renderEvents(events);
//     }

//     if (pageToFetch === data.page.totalPages - 1) {
//       button.classList.add("invisible");
//       alert("Finish");
//       return;
//     }
//     pageToFetch += 1;
//     if (data.page.totalPages > 1) {
//       button.classList.remove("invisible");
//     }
//   });
// }

// function renderEvents(events) {
//   const markup = events
//     .map(({ name, images }) => {
//       return `<li>
//     <img src='${images[0].url}' alt='${name}' width='200'>
//     <p>${name}</p>
//     </li>`;
//     })
//     .join("");
//   list.insertAdjacentHTML("beforeend", markup);
// }

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const query = event.target.elements.query.value;
//   keyword = query;
//   pageToFetch = 0;
//   list.innerHTML = "";
//   if (!query) {
//     return;
//   }
//   getEvents(pageToFetch, query);
// });

// button.addEventListener("click", () => {
//   getEvents(pageToFetch, keyword);
// });
