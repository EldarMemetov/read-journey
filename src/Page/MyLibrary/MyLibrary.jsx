import BookAddFilter from "../../Components/BookAddFilter/BookAddFilter";
import ButtonLink from "../../Components/ButtonLink/ButtonLink";
import RecommendedBooks from "../../Components/RecommendedBooks/RecommendedBooks";
import style from "./MyLibrary.module.css";
import MyLibraryComponent from "../../Components/MyLibraryComponent/MyLibraryComponent";

export default function MyLibrary() {
  return (
    <div className={style.container}>
      <RecommendedBooks
        limit={3}
        imageWidth={71}
        imageHeight={107}
        title="Recommended books"
        containerButtonNext={style.classNameButton}
        NextSlideshowContainer={style.slideshowContainer}
        extraActions={<ButtonLink />}
        filterActions={<BookAddFilter />}
      />
      <MyLibraryComponent />
    </div>
  );
}
