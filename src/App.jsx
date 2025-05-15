import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PuffLoader } from "react-spinners";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import getUnsplashData from './api';
import ImgModal from './components/ImgModal/ImgModal';
import { useState, useEffect } from 'react'
import './App.css'

// Modal.setAppElement("#root");

function App() {

  const [requestPhrase, setRequestPhrase] = useState('');
  const [galleryItem, setGalleryItem] = useState([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentShowImg, setCurrentShowImg] = useState(null);

  useEffect(() => {
    if (requestPhrase !== '') {
      setGalleryItem([]);
      setPageNumber(() => 1);
    }
  }, [requestPhrase]);

  const showModal = (imgId) => {
    setCurrentShowImg(imgId)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    async function getData() {
      if (requestPhrase === '') {
        return
      }

      try {
        setLoaderIsVisible(true);
        setLoadMoreIsVisible(false);

        const data = await getUnsplashData({ query: requestPhrase, page: pageNumber });
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
    getData();
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
      {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} showModal={showModal} />}
      {loaderIsVisible && <PuffLoader
        color="#1561f4"
        cssOverride={{}}
        className='loader'
      />}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMoreBtn onLoadMore={loadMore} />}
      {modalVisible && <ImgModal
        isOpen={modalVisible}
        onClose={closeModal}
        currentImg={currentShowImg}
      />}
    </>
  )
};

export default App
