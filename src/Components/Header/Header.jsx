import { LogoHeader } from "../Logo/Logo";
import NamePeople from "../NamePeople/NamePeople";
import UserBar from "../UserBar/UserBar";

import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <LogoHeader className={style.logo} />
      <div className={style.containerName}>
        <NamePeople />
        <UserBar className={style.userBar} />
      </div>
    </header>
  );
}
