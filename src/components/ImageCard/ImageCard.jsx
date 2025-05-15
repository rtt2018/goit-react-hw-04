import styles from './ImageCard.module.css';

export default function ImageCard({ imgData, showModal }) {

  const handleOpenModal = () => {
    showModal(imgData);
  }
  return (
    <div onClick={handleOpenModal} className={styles.container}>
      <img src={imgData.urls.small} alt={imgData.alt_description} />
    </div>
  );
}
