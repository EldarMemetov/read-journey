import cool from "../../image/cool.png";
import style from "./ModalAddBook.module.css";
import Icon from "../Icon/Icon";
export default function ModalAddBook({ onClose }) {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button className={style.closeButton} onClick={onClose}>
          <Icon name="icon-x" size={18} color="white" className={style.icon} />
        </button>
        <div className={style.modalContent}>
          <img
            className={style.img}
            src={cool}
            alt="book"
            width="50"
            height="50"
          />

          <h2 className={style.title}>Good job</h2>
          <p className={style.message}>
            Your book is now in{" "}
            <span className={style.spanMessage}>the library!</span> The joy
            knows no bounds and now you can start your training.
          </p>
        </div>
      </div>
    </div>
  );
}
