import FilterMyBook from "../FilterMyBook/FilterMyBook";
import style from "./MyLibraryComponent.module.css";
export default function MyLibrary() {
  return (
    <div className={style.container}>
      <h2>My library</h2>
      <FilterMyBook />
    </div>
  );
}
