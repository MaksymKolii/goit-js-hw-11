//const API_KEY = '30620047-2b41fea3ffb04e82a67076d5b';
const URL = 'https://pixabay.com/api/';
//const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;
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
   async  fetchImages() {
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
    try {
      const response = await axios.get(search);
      return response
    } catch (error) {
      console.error(error);
    }
  }


//  return this.getUser(search)
  


  

  set word(newWord) {
    this.keyWord = newWord;
  }
  get word() {
    return this.keyWord;
  }
}
