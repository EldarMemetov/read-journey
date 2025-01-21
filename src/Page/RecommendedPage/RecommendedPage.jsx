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
        <RecommendedBooks />
      </div>
    </div>
  );
}
