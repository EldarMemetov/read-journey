import logo from "../../image/logo.png";
import style from "./Logo.module.css";
export function Logo() {
  return (
    <div>
      <img
        src={logo}
        alt=""
        width="42px"
        height="17px"
        className={style.logo}
      />
    </div>
  );
}

export function LogoHeader() {
  return (
    <div>
      <img
        src={logo}
        alt=""
        width="42px"
        height="17px"
        className={style.logoHeader}
      />
    </div>
  );
}
