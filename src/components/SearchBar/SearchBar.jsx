import styles from './SearchBar.module.css';
import { FcSearch } from "react-icons/fc";

export default function SearchBar({ getRequestPhrase }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchphrase = event.target.elements.searchField.value;
    if (searchphrase.trim() !== "") {
      getRequestPhrase(event.target.elements.searchField.value)
    }
    event.target.reset();
  }

  return (
    <>
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
