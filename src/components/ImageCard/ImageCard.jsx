import styles from './ImageCard.module.css';

export default function ImageCard({ img }) {
  return (
    <div className={styles.container}>
      <img src={img} alt="" />
    </div>
  );
}
