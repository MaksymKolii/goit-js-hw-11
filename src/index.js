import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
const axios = require('axios').default;

//   axios({
//     method: 'get',
//     url: 'https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&image_type=photo&orientation=horizontal&safesearch=true',
//     responseType: 'stream'
//   })
//     .then(function (response) {
//       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//     });

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
};

refs.input.addEventListener('input', onInputChange);

let serch = '';

const serchImagesByKeyWorld = new SerchImagesByKeyWorld();

function onInputChange(e) {
  serchImagesByKeyWorld.word = e.target.value;
  // serch= e.target.value
  if (serchImagesByKeyWorld.word === '') return;
  serchImagesByKeyWorld.fetchImagesByKeyWorld();

  //console.log(serchImagesByKeyWorld.fetchImagesByKeyWorld);
  // getUser(serch)
}

// async function getUser(serch) {
//     try {
//      // const response = await axios.get('/user?ID=30620047');
//       const response = await axios.get(`https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&q=${serch}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
