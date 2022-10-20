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

export class GalleryApiService {
  constructor() {
    this.keyWord = '';
    this.page = 1;
  }
   async  fetchImages() {
    console.log(this);
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
    try {
      const response = await axios.get(search);
      this.incrementPage()
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage(){

    this.page+=1;
  }

  resetPage(){
    this.page=1;
  }

  set word(newWord) {
    this.keyWord = newWord;
  }
  get word() {
    return this.keyWord;
  }
}
