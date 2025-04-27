import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { useState } from 'react'
import './App.css'


function App() {
  // const API_KEY = import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;
  const defaultUrl = 'https://api.unsplash.com/photos/?client_id=' + import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;
  console.log("🚀 ~ App ~ defaultUrl:", defaultUrl)
  return (
    <>
      <SearchBar />
      <ImageGallery />
      <Loader />
      <ErrorMessage />
      <LoadMoreBtn />
      <ImageModal />
    </>
  )
};

export default App
