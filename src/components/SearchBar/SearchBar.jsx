import styles from './SearchBar.module.css';

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
        <form onSubmit={handleSubmit}>
          <input
            name='searchField'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
}
