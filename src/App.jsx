import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { PuffLoader } from "react-spinners";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import getUnsplashData from './api';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
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
      setPageNumber(1);
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
    if (error) {
      toast.error("Something not work. Please, try again!")
    }
  }, [error]);

  useEffect(() => {
    async function getData() {
      if (requestPhrase === '') {
        toast.error("Enter something so that the mentor does not send homework for rework! )))", { duration: 1000 })
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
    if (inputPhrase === '') {
      toast.error("Please, enter something!", { duration: 2000 })
    }
    setPageNumber(1);
    setRequestPhrase(inputPhrase);
    setError(false);
    setGalleryItem([]);
  }

  const loadMore = () => {
    setPageNumber(prevPageNum => prevPageNum + 1)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false} />
      <SearchBar getRequestPhrase={onSubmit} />
      {galleryItem.length > 0 && <ImageGallery imagesData={galleryItem} showModal={showModal} />}
      {loaderIsVisible && <PuffLoader
        color="#1561f4"
        cssOverride={{}}
        className='loader'
      />}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMoreBtn onLoadMore={loadMore} />}
      {modalVisible && <ImageModal
        isOpen={modalVisible}
        onClose={closeModal}
        currentImg={currentShowImg}
      />}
    </>
  )
};

export default App
