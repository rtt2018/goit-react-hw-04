import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onLoadMore }) {
  return (
    <div className={styles.container}>
      <button type="button" onClick={onLoadMore} className={styles.LoadMoreBtn}>Load more</button>
    </div>
  );
}
