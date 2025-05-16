import styles from './ErrorMessage.module.css';
export default function ErrorMessage() {
  return (
    <div className={styles.container}>
      <p>Something not works! Please,  try again!</p>
    </div>
  );
}
