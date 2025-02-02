import { useMediaQuery } from "react-responsive";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import RecommendedBooks from "../../Components/RecommendedBooks/RecommendedBooks";
import StartWorkout from "../../Components/StartWorkout/StartWorkout";
import style from "./RecommendedPage.module.css";
import DesktopComponentBooks from "../../Components/DesktopComponentBooks/DesktopComponentBooks";

export default function RecommendedPage() {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  let bookLimit = 2;
  if (isTablet) bookLimit = 8;
  if (isDesktop) bookLimit = 10;

  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <FilterComponent />
        <StartWorkout />
        {isDesktop && <DesktopComponentBooks />}
      </div>
      <RecommendedBooks
        limit={bookLimit}
        imageWidth={137}
        imageHeight={208}
        title="Recommended"
      />
    </div>
  );
}
