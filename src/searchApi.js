//const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
const URL = 'https://pixabay.com/api/';
//const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
 const axios = require('axios').default;

//import axios from 'axios';
// const axios = require('axios');

const searchParams = new URLSearchParams({
  key: '30620047-2b41fea3ffb04e82a67076d5b',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export class SerchImagesByKeyWord {
  constructor() {
    this.keyWord = '';
    this.page = 1;
  }

  fetchImagesByKeyWord() {
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;

    // return fetch(search).then(response => {
    //   if (!response.ok) {
    //     throw new Error(response.status);
    //   }
    //   return response.json();
    // });

   return axios.get(search)
      .then(function (response) {
        // handle success
        console.log(response);
        //return response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  // async getImagesByKeyWord() {
  //   const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
  //   try {
  //     // const response = await axios.get('/user?ID=30620047');
  //     const response = await axios.get(search);
  //     console.log(response);
  //     // return response.json();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  set word(newWord) {
    this.keyWord = newWord;
  }
  get word() {
    return this.keyWord;
  }
}
