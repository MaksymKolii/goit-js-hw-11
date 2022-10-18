//const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
const URL = 'https://pixabay.com/api/';
//const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;

const searchParams = new URLSearchParams({
  key:'30620047-2b41fea3ffb04e82a67076d5b',
  image_type:'photo',
  orientation:'horizontal',
  safesearch:true,
  per_page: 40
});


export class SerchImagesByKeyWord {
  constructor() {
    this.keyWord = '';
    this.page = 1;
  }


  fetchImagesByKeyWord(){
    // const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWord}&${Filter}&page=${this.page}&per_page=40`;
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
   
    return fetch(search).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  async getImagesByKeyWord() {
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
    try {
      // const response = await axios.get('/user?ID=30620047');
      const response = await axios.get(search);
      console.log(response);
      // return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // axios Асинхронная
  // fetchImagesByKeyWord() {
  //   const searchAddress = `${URL}?key=${API_KEY}&q=${this.keyWord}&${Filter}&page=${this.page}&per_page=40`;

  //   return this.getUser(searchAddress);
  // }

  set word(newWord) {
    this.keyWord = newWord;
  }
  get word() {
    return this.keyWord;
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
