import style from "./RecommendedItemBooks.module.css";

export default function RecommendedItemBooks({ book, onClick }) {
  return (
    <li className={style.bookItem} onClick={onClick}>
      <img src={book.imageUrl} alt={book.title} width="100" height="150" />
      <h3 className={style.title}>{book.title}</h3>
      <p className={style.author}>{book.author}</p>
    </li>
  );
}
