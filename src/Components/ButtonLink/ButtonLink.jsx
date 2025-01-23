import { Link } from "react-router-dom";
import style from "./ButtonLink.module.css";
import Icon from "../Icon/Icon";
export default function ButtonLink() {
  return (
    <div className={style.actionsContainer}>
      <p>
        <Link to="/recommended" className={style.libraryLink}>
          Home
        </Link>
      </p>
      <Link to="/recommended" className={style.libraryLink}>
        <Icon
          name="icon-log-in"
          size={18}
          color="green"
          className={style.icon}
        />
      </Link>
    </div>
  );
}
