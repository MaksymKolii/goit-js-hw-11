import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from '../src/js-components/loadMoreBtn';
import { getRefs } from './js-components/refList';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GalleryApiService } from './searchApi';

const galleryApiService = new GalleryApiService();
const refs = getRefs()
const loadMoreBtn = new LoadMoreBtn({
  selector: '[class="load-more"]',
  hidden: true,
});


refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', clickLoadMoreBtn);


// const simpleLightbox = new SimpleLightbox('.gallery a');


function onSubmit(e) {
  e.preventDefault();

  galleryApiService.query = e.target.elements.searchQuery.value;
  galleryApiService.resetPage();

  if (galleryApiService.query === '') {
    return Notify.warning("Please enter something! I'm trying my best...");
  }
  e.target.elements.searchQuery.value = '';
  loadMoreBtn.show();
  clearImagesContainer();
  fetchGallery();

  
  // simpleLightbox.refresh()
}

function clickLoadMoreBtn() {
  galleryApiService.incrementPage();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();


  galleryApiService.fetchImages().then(({ hits, total }) => {
    const totalPages = Math.ceil(total / galleryApiService.perPage);
    if (!hits.length) {
      loadMoreBtn.hide();
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (galleryApiService.currentPage === 1 && hits.length) {
      Notify.info(`Hooray! We found ${total} images.`);
    }

    if (galleryApiService.currentPage === totalPages) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    appendGalleryMarkup(hits);
    const simpleLightbox = new SimpleLightbox('.gallery a');
    simpleLightbox.refresh()
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery-link" href="${largeImageURL}"><div class="photo-card">
        <img src="${webformatURL}" alt=" ${tags}" width="280" height="190" loading="lazy" />
        
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views </b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads </b>${downloads}
          </p>
        </div>
      </div></a>`;
      }
    )
    .join('');
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
