const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
const URL = 'https://pixabay.com/api/';
const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;

export class SerchImagesByKeyWorld {
  constructor() {
    this.keyWorld = '';
    this.page = 1;
  }

  async getUser() {
    const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWorld}&${Filter}&page=${this.page}&per_page=40`;
    try {
      // const response = await axios.get('/user?ID=30620047');
      const response = await axios.get(searchAddress);
      console.log(response);
      // return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // axios Асинхронная
  // fetchImagesByKeyWorld() {
  //   const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWorld}&${Filter}&page=${this.page}&per_page=40`;

  //   return this.getUser(searchAddress);
  // }

  set word(newWord) {
    this.keyWorld = newWord;
  }
  get word() {
    return this.keyWorld;
  }
}

/*// Обычный fetch
  // fetchImagesByKeyWorld(){
  //   const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWorld}&${Filter}&page=${this.page}&per_page=40`;
  //   //const url =`https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&q=${this.keyWorld}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  //   return fetch(searchAddress).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   });
  // }

  // axios не Асинхронная
  // fetchImagesByKeyWorld() {
  //   const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWorld}&${Filter}&page=${this.page}&per_page=40`;
  //   return axios
  //     .get(searchAddress)
  //     .then(function (response) {
  //       // обработка успешного запроса
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // обработка ошибки
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // выполняется всегда
  //     });
  // } */
