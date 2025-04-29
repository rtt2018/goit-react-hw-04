import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'

const myApiKey = import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;
axios.defaults.headers.common["client_id"] = myApiKey;
const defaultUrl = 'https://api.unsplash.com/photos/';
// console.log("🚀 ~ App ~ defaultUrl:", defaultUrl)

function App() {

  const [requestPhrase, setRequestPhrase] = useState('');
  const [galleryItem, setGalleryItem] = useState([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [loadMoreIsVisible, setloadMoreIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getResponseData(
      requestPhrase,
      additionalParams = {}
    ) {

      axios.defaults.baseURL = 'https://pixabay.com/api/';

      const requestParams = {
        key: '48329924-6906af0078b1de986ec16b549',
        q: requestPhrase,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        ...additionalParams,
      };

      if (requestPhrase !== '') {
        try {
          setLoaderIsVisible(true);
          const { dataImg } = await axios.get('', {
            params: requestParams,
          });
          console.log("🚀 ~ useEffect ~ data:", dataImg)

          // return dataImg;
          setGalleryItem(dataImg);
        } catch {
          setError(true);
        } finally {
          setLoaderIsVisible(false);
        }
      }
    }

    setGalleryItem(getResponseData(requestPhrase, { page: pageNumber, per_page: 15 }));

  }, [requestPhrase,]);

  // async function fetchUnsplashPictures() {
  //   axios.defaults.baseURL = 'https://pixabay.com/api/';
  //   const paramRequest = {
  //     query: 'rose',
  //     orientation: "landscape",
  //     page: 1,
  //     per_page: 15,
  //     content_filter: 'high',
  //   }

  //   try {
  //     const imgData = await axios.get(defaultUrl, { paramRequest });
  //     console.log("🚀 ~ fetchArticles ~ imgData:", imgData)

  //   } catch {
  //     console.log('Error load data')
  //   } finally {
  //     console.log('End load data')
  //   }
  // }
  // fetchUnsplashPictures();

  const onSubmit = (inputPhrase) => {
    setRequestPhrase(inputPhrase);
  }


  return (
    <>
      <SearchBar getRequestPhrase={onSubmit} />
      <ImageGallery imagesData={galleryItem} />
      {loaderIsVisible && <Loader />}
      <ErrorMessage />
      {loadMoreIsVisible && <LoadMoreBtn />}
      <ImageModal />
    </>
  )
};

export default App
