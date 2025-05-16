import styles from './SearchBar.module.css';
import { FcSearch } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar({ getRequestPhrase }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchphrase = event.target.elements.searchField.value;
    if (searchphrase === '') {
      toast.error("Please, enter something!", { duration: 1000 })
    } else {
      getRequestPhrase(searchphrase.trim())
    }
    event.target.reset();
  }

  return (
    <>
      <Toaster
        position="top-center"
      />
      <header className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            className={styles.searchField}
            name='searchField'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={styles.searchButton}><FcSearch className={styles.findIcon} /></button>
        </form>
      </header>
    </>
  );
}
