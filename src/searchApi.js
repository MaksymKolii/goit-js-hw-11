const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
const URL = 'https://pixabay.com/api/';
const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;


export class SerchImagesByKeyWorld {
  constructor() {
    this.keyWorld = '';
    this.page = 1;
  }

  fetchImagesByKeyWorld(){
    const url = `${URL}?key=${API_KEY}+"&q=${this.keyWorld}&${Filter}&page=${this.page}&per_page=40`;
    //const newurl = 'https://pixabay.com/api?key=30620047-2b41fea3ffb04e82a67076d5b&q=cats&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40'
    return async function getUser() {
        try {
         // const response = await axios.get('/user?ID=30620047'); 
          const response = await axios.get(url); 
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

  }

  set word(newWord){
    this.keyWorld = newWord;
  }
  get word(){
    return this.keyWorld
  }

}
