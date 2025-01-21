import style from "./ModalRecommended.module.css";
import Icon from "../Icon/Icon";
export default function ModalRecommended({ children, onClose }) {
  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          <Icon name="icon-x" size={18} color="white" className={style.icon} />
        </button>
        {children}
      </div>
    </div>
  );
}
