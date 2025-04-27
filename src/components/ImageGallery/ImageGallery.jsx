import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery() {
  return (
    <>
      <ul className={styles.container}>
        <li>
          <ImageCard />
        </li>
      </ul>
    </>
  );
}
