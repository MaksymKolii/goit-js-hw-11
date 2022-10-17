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
// const axios = require('axios').default;

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
};

refs.input.addEventListener('input', onInputChange);


const serchImagesByKeyWorld = new SerchImagesByKeyWorld();

function onInputChange(e) {
  serchImagesByKeyWorld.word = e.target.value;
  if (serchImagesByKeyWorld.word === '') return;
  serchImagesByKeyWorld.getUser();
}