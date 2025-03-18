import AddBookLibrary from "../AddBookLibrary/AddBookLibrary";

import style from "./MyLibraryComponent.module.css";
export default function MyLibrary() {
  return (
    <div className={style.container}>
      <div className={style.containerMyLibrary}></div>
      <AddBookLibrary />
    </div>
  );
}
