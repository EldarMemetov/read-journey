import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { getUserBooks, deleteBook } from "../../redux/book/operations";
import style from "./AddBookLibrary.module.css";
import bookPlaceholder from "../../image/book.png";
import { FiTrash2 } from "react-icons/fi";
export default function AddBookLibrary() {
  const dispatch = useDispatch();
  const { items: books, isLoading } = useSelector((state) => state.books);

  const [expandedBook, setExpandedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 1;
  const totalPages = Math.ceil((books?.length || 0) / booksPerPage);

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  useEffect(() => {
    console.log("Books from backend:", books);
  }, [books]);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleTitle = (bookId) => {
    setExpandedBook((prev) => (prev === bookId ? null : bookId));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePrevPage,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!books || books.length === 0) {
    return (
      <div className={style.placeholder}>
        <img src={bookPlaceholder} alt="Placeholder" />
        <p className={style.titleInfo}>
          To start training, add
          <span className={style.spanInfo}> some of your books</span> or from
          the recommended ones.
        </p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <div>
      <div className={style.buttonNext}>
        <button
          type="button"
          className={style.prevArrow}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button
          type="button"
          className={style.nextArrow}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <div {...handlers} className={style.containerBook}>
        <ul className={style.bookList}>
          {currentBooks.map((book) => (
            <li key={book._id} className={style.bookItem}>
              <img src={book.imageUrl} alt="img" className={style.bookImage} />
              <div className={style.bookDetails}>
                <h3 className={style.titleBook}>
                  {book.title.length > 10 && expandedBook !== book._id
                    ? `${book.title.slice(0, 10)}`
                    : book.title}
                  {book.title.length > 10 && expandedBook !== book._id && (
                    <span
                      className={style.toggleButton}
                      onClick={() => handleToggleTitle(book._id)}
                    >
                      ...
                    </span>
                  )}
                </h3>
                <div className={style.containerTextTrash}>
                  <p className={style.author}>{book.author}</p>
                  <div className={style.containerTrash}>
                    <FiTrash2
                      className={style.trashIcon}
                      onClick={() => handleDeleteBook(book._id)}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
