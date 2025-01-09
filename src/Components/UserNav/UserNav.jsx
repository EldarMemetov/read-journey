import { NavLink } from "react-router-dom";
import style from "./UserNav.module.css";

export default function UserNav() {
  return (
    <nav className={style.navBar}>
      <NavLink className={style.navLink} to="/recommended">
        Recommended
      </NavLink>
      <NavLink className={style.navLink} to="/library">
        My Library
      </NavLink>
    </nav>
  );
}
