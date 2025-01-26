import style from "./ModalStartReading.module.css";
import Icon from "../Icon/Icon";
import { useNavigate } from "react-router-dom";
// import bookPlaceholder from "../../image/book.png";
export default function ModalStartReading({ book, onClose }) {
  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate("/my-reading");
  };
  const image =
    "https://res.cloudinary.com/drfvfno3o/image/upload/v1699733055/books/8.webp";
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button className={style.closeButton} onClick={onClose}>
          <Icon name="icon-x" size={18} color="white" className={style.icon} />
        </button>
        <div className={style.modalContent}>
          <img
            src={book.imageUrl || image}
            alt={book.title}
            className={style.img}
          />
          <h2 className={style.titleBook}>{book.title}</h2>
          <p className={style.author}>{book.author}</p>

          <button
            className={style.startReadingButton}
            onClick={handleStartReading}
          >
            Start reading!
          </button>
        </div>
      </div>
    </div>
  );
}
