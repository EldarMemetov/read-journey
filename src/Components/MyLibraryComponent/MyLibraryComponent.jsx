import AddBookLibrary from "../AddBookLibrary/AddBookLibrary";
import FilterMyBook from "../FilterMyBook/FilterMyBook";
import style from "./MyLibraryComponent.module.css";
export default function MyLibrary() {
  return (
    <div className={style.container}>
      <div className={style.containerMyLibrary}>
        <h2 className={style.title}>My library</h2>
        <FilterMyBook />
      </div>
      <AddBookLibrary />
    </div>
  );
}
