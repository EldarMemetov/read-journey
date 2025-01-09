import { LogoHeader } from "../Logo/Logo";
import UserBar from "../UserBar/UserBar";

import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <LogoHeader className={style.logo} />
      <UserBar className={style.userBar} />
    </header>
  );
}
