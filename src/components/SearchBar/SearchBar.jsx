import styles from './SearchBar.module.css';

export default function SearchBar({ getRequestPhrase }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    getRequestPhrase(event.target.value)
    event.target.reset();
  }

  return (
    <>
      <header className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
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
