import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import RecommendedBooks from "../../Components/RecommendedBooks/RecommendedBooks";
import StartWorkout from "../../Components/StartWorkout/StartWorkout";

export default function RecommendedPage() {
  return (
    <div>
      <FilterComponent />
      <StartWorkout />
      <RecommendedBooks />
    </div>
  );
}
