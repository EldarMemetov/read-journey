import styles from "./ModalBookEnd.module.css";
import Icon from "../Icon/Icon";
import book from "../../image/book.png";
const ModalBookEnd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon name="icon-x" size={18} color="white" className={styles.icon} />
        </button>
        <div className={styles.modalContent}>
          <img src={book} alt="" />
          <h2 className={styles.titleEnd}>The book is read</h2>
          <p className={styles.description}>
            It was an{" "}
            <span className={styles.SpanDescription}>exciting journey</span>,
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalBookEnd;
