import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <>
      <header className={styles.container}>
        <form>
          <input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
}
