import { useState, useEffect } from "react";
import { LogoHeader } from "../Logo/Logo";
import NamePeople from "../NamePeople/NamePeople";
import UserBar from "../UserBar/UserBar";
import style from "./Header.module.css";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export function Header() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <header className={style.header}>
      <LogoHeader className={style.logo} />
      <div className={style.containerName}>
        {isMobile && <NamePeople className={style.name} />}
        <UserBar className={style.userBar} />
      </div>
    </header>
  );
}
