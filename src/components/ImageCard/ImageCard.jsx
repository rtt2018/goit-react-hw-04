import styles from './ImageCard.module.css';

export default function ImageCard({ imgData }) {
  return (
    <div className={styles.container}>
      <img src={imgData.urls.small} alt={imgData.alt_description} />
    </div>
  );
}
