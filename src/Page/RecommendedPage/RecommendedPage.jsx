import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import RecommendedBooks from "../../Components/RecommendedBooks/RecommendedBooks";
import StartWorkout from "../../Components/StartWorkout/StartWorkout";
import style from "./RecommendedPage.module.css";
export default function RecommendedPage() {
  return (
    <div>
      <FilterComponent />
      <div className={style.container}>
        <StartWorkout />
        <RecommendedBooks
          limit={2}
          imageWidth={137}
          imageHeight={208}
          title="Recommended"
        />
      </div>
    </div>
  );
}
