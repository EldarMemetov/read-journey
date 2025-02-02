import { useState } from "react";
import style from "./RecommendedItemBooks.module.css";

export default function RecommendedItemBooks({
  book,
  onClick,
  imageWidth,
  imageHeight,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTitle = (e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const displayedTitle =
    isExpanded || book.title.length <= 5
      ? book.title
      : book.title.slice(0, 5) + "...";

  return (
    <li className={style.bookItem} onClick={onClick}>
      <img
        src={book.imageUrl}
        alt={book.title}
        width={imageWidth}
        height={imageHeight}
        className={style.img}
      />
      <h3 className={style.title} onClick={toggleTitle}>
        {displayedTitle}
      </h3>
      <p className={style.author}>{book.author}</p>
    </li>
  );
}
