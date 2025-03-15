import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";
import style from "./ComponentMyReading.module.css";

export default function ComponentMyReading() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    selectBooks(state).find((item) => item._id === bookId)
  );
  const isReading = useSelector((state) => state.books.isReading);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookId && !book) {
      dispatch(getBookById(bookId)).catch(() => {
        setError("Failed to load book data.");
      });
    }
  }, [bookId, book, dispatch]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>My reading</h2>
      {error && <p className={style.errorMessage}>{error}</p>}
      {book ? (
        <div className={style.bookContainer}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={style.bookImage}
          />
          <h3 className={style.titleBook}>{book.title}</h3>
          <p className={style.author}>{book.author}</p>
        </div>
      ) : (
        <p className={style.textNoBook}>No book selected for reading.</p>
      )}
      <div className={style.recordButtonWrapper}>
        <span
          className={`${style.recordButton} ${
            isReading ? style.recording : ""
          }`}
        >
          {isReading ? "" : ""}
        </span>
      </div>
    </div>
  );
}
