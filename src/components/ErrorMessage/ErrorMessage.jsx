import styles from './ErrorMessage.module.css';
import { Toaster } from 'react-hot-toast';
export default function ErrorMessage() {
  return (
    <div className={styles.container}>
      <Toaster
        position="top-center"
        reverseOrder={false} />
    </div>
  );
}
