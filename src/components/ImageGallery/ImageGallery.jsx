import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ imagesData }) {
  return (
    <>
      <ul className={styles.container}>
        {
          imagesData.map(imgItem => {
            return (
              <li key={imgItem.id}>
                <ImageCard imgData={imgItem} />
              </li>
            )
          })
        }
      </ul>
    </>
  );
}
