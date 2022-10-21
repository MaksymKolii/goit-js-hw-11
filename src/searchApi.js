import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
    this.totalPages=1;
  }

  
  async fetchImages() {
    //console.log(this);
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}`;
    try {
      const response = await axios.get(search);
      
       if(this.page ===1 && response.data.hits.length){

       this.totalPages = Math.round(response.data.total / 40)
        Notify.info(`Hooray! We found ${response.data.total} images.`)
        
    }
    this.incrementPage();
    

      return response.data;
    } catch (error) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set word(newWord) {
    this.keyWord = newWord;
  }
  get word() {
    return this.keyWord;
  }

  set total(newTot) {
    this.totalPages = newTot;
  }
  get total() {
    return this.totalPages;
  }
}
