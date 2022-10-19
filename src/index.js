import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from '../src/js-components/loadMoreBtn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { SerchImagesByKeyWord } from './searchApi';

// const URL = 'https://pixabay.com/api/';
// const searchParams = new URLSearchParams({
//   key: '30620047-2b41fea3ffb04e82a67076d5b',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 40,
// });
// let query = '';
// let page = 1;

// const axios = require('axios').default;

const serchImagesByKeyWord = new SerchImagesByKeyWord();

new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
});
// const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
// const url='https://pixabay.com/api/'
// const URL = `${url}?key=${API_KEY}+"&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
// user_id:30620047
// Your API key: 30620047-2b41fea3ffb04e82a67076d5b
// https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&image_type=photo&orientation=horizontal&safesearch=true
// const axios = require('axios').default;

const refs = {
  form: document.querySelector('#search-form'),
  galleryElRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
//refs.loadMoreBtn.addEventListener('click', onLoadMore)

async function onSubmit(e) {
  e.preventDefault();

  serchImagesByKeyWord.word = e.target.elements.searchQuery.value;

  if (serchImagesByKeyWord.word === '') return;

  serchImagesByKeyWord.fetchImages();

  const dataObject = await serchImagesByKeyWord.fetchImages()
  const arryOfImages= dataObject.data.hits

  makeGalleryMarkup(arryOfImages);
}

// function onLoadMore(){
//   const search = `${URL}?q=${query}&${searchParams}&page=${page}`;
//   getUser(search)

// }

//* working
// async function getUser(qu, p) {
//   try {
//     const search = `${URL}?q=${qu}&${searchParams}&page=${p}`;
//     const response = await axios.get(search);
//     const dataHits = response.data.hits;
//     makeGalleryMarkup(dataHits);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// Last&working
// async function getUser(param) {
//   try {
//     const response = await axios.get(param);
//     const dataHits = response.data.hits;
//     makeGalleryMarkup(dataHits)
//   } catch (error) {
//     console.error(error);
//   }
// }

const loadMoreBtn = new LoadMoreBtn({
  selector: '[class="load-more"]',

  hidden: false,
});

function makeGalleryMarkup(arr) {
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
  refs.galleryElRef.insertAdjacentHTML('beforeend', markup);
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
