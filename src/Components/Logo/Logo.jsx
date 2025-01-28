import logo from "../../image/logo.png";
import LogoTablet from "../../image/LogoTablet.png";
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
      <img
        src={LogoTablet}
        alt=""
        width="182px"
        height="17px"
        className={style.logoTablet}
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
