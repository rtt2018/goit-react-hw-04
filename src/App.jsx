import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'


function App() {

  const [requestPhrase, setRequestPhrase] = useState('');
  const [galleryItem, setGalleryItem] = useState([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const per_page = 20;

  useEffect(() => {
    if (requestPhrase !== '') {
      setGalleryItem([]);
      setPageNumber(() => 1);
    }
  }, [requestPhrase]);

  useEffect(() => {
    const myApiKey = import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;

    const requestParams = {
      query: requestPhrase,
      orientation: "landscape",
      page: pageNumber,
      per_page: per_page,
      content_filter: 'high',
    }

    async function getResponseData(additionalParams = {}) {
      try {
        setLoaderIsVisible(true);
        const { data } = await axios.get('https://api.unsplash.com/search/photos', {
          headers: {
            Authorization: `Client-ID ${myApiKey}`,
          },
          params: { ...requestParams, ...additionalParams },
        });

        if (data.total_pages > pageNumber) {
          setLoadMoreIsVisible(true);
        } else {
          setLoadMoreIsVisible(false);
        }
        setGalleryItem((prevImages) => [...prevImages, ...data.results]);
      } catch {
        setError(true);
      } finally {
        setLoaderIsVisible(false);
      }
    }

    if (requestPhrase !== '') {
      getResponseData();
    }

  }, [requestPhrase, pageNumber]);

  const onSubmit = (inputPhrase) => {
    setPageNumber(() => 1);
    setRequestPhrase(inputPhrase);
  }

  const loadMore = () => {
    setPageNumber(prevPageNum => prevPageNum + 1)
  }

  return (
    <>
      <SearchBar getRequestPhrase={onSubmit} />
      {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} />}
      {loaderIsVisible && <Loader />}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMoreBtn onLoadMore={loadMore} />}
      <ImageModal />
    </>
  )
};

export default App
