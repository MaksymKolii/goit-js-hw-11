import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

import { SerchImagesByKeyWorld } from './searchApi';

// const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
// const url='https://pixabay.com/api/'
// const URL = `${url}?key=${API_KEY}+"&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
// user_id:30620047
// Your API key: 30620047-2b41fea3ffb04e82a67076d5b

// https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&image_type=photo&orientation=horizontal&safesearch=true
// const axios = require('axios').default;

const refs = {
  form: document.querySelector('#search-form'),
  // input: document.querySelector('input[name="searchQuery"]'),
  galleryElRef:document.querySelector(".gallery"),
};

refs.form.addEventListener('submit', onSubmit);


const serchImagesByKeyWorld = new SerchImagesByKeyWorld();

function onSubmit(e) {

  serchImagesByKeyWorld.word = e.currentTarget.elements.searchQuery.value;
  //if (serchImagesByKeyWorld.word === '') return;
  serchImagesByKeyWorld.getUser()
  // .then(data =>{

  // //  refs.galleryElRef.insertAdjacentHTML("beforeend", makeGalleryMarkup(galleryItems));
   

  // })
  // .catch(function (error) {
  //   if (error.response) {
  //     // Запрос был сделан, и сервер ответил кодом состояния, который
  //     // выходит за пределы 2xx
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //   } else if (error.request) {
  //     // Запрос был сделан, но ответ не получен
  //     // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
  //     // http.ClientRequest в node.js
  //     console.log(error.request);
  //   } else {
  //     // Произошло что-то при настройке запроса, вызвавшее ошибку
  //     console.log('Error', error.message);
  //   }
  //   console.log(error.config);
  // });

  
}


// refs.galleryElRef.insertAdjacentHTML("beforeend", makeGalleryMarkup(galleryItems));

new SimpleLightbox(".gallery__link", {
  captionsData: "alt",
  captionDelay: 250,
});

// function makeGalleryMarkup(object) {
//   return object
//     .map(
//       ({ webformatURL, largeImageURL , tags , likes , views , comments, downloads  }) => `<li class="gallery__item">
//               <a class="gallery__link" href="${largeImageURL}">
//               <div class="photo-card">
//               <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//               <div class="info">
//                 <p class="info-item">
//                   <b>Likes${likes}</b>
//                 </p>
//                 <p class="info-item">
//                   <b>Views${views}</b>
//                 </p>
//                 <p class="info-item">
//                   <b>Comments${comments}</b>
//                 </p>
//                 <p class="info-item">
//                   <b>Downloads${downloads}</b>
//                 </p>
//               </div>
//             </div>
//               </a>
//           </li>
          
//           `
//     )
//     .join("");
// }


function makeGalleryMarkup(object) {
  return object
    .map(
      ({ original, preview, description }) => `<li class="gallery__item">
              <a class="gallery__link" href="${original}">
                   <img
                      class="gallery__image"
                      src="${preview}"
                      alt="${description}"
                  />
              </a>
          </li>`
    )
    .join("");
}