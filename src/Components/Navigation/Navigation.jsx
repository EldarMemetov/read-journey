import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={style.navBar}>
      <NavLink className={style.navLink} to="/login">
        Login
      </NavLink>
      <NavLink nk className={style.navLink} to="/register">
        Register
      </NavLink>
      <NavLink nk className={style.navLink} to="/recommended">
        recommended
      </NavLink>
      <NavLink className={style.navLink} to="/library">
        My Library
      </NavLink>
    </nav>
  );
}
