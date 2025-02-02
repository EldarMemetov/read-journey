import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { useMediaQuery } from "react-responsive";
import { getUserBooks, deleteBook } from "../../redux/book/operations";
import style from "./AddBookLibrary.module.css";
import bookPlaceholder from "../../image/book.png";
import { FiTrash2 } from "react-icons/fi";
import ModalStartReading from "../ModalStartReading/ModalStartReading";

export default function AddBookLibrary() {
  const dispatch = useDispatch();
  const { items: books, isLoading } = useSelector((state) => state.books);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [expandedTitles, setExpandedTitles] = useState({});

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const booksPerPage = isDesktop ? 5 : isTablet ? 4 : 1;
  const totalPages = Math.ceil((books?.length || 0) / booksPerPage);

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const toggleTitle = (bookId) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePrevPage,
  });

  if (isLoading) return <p>Loading...</p>;

  if (!books || books.length === 0) {
    return (
      <div className={style.placeholder}>
        <img
          src={bookPlaceholder}
          alt="Placeholder"
          className={style.imgPlaceholder}
        />
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
              <img
                src={book.imageUrl || bookPlaceholder}
                alt="Book Cover"
                className={style.bookImage}
                onClick={() => setSelectedBook(book)}
              />
              <div className={style.bookDetails}>
                <h3 className={style.titleBook}>
                  {expandedTitles[book._id] || book.title.length <= 5
                    ? book.title
                    : `${book.title.slice(0, 5)}...`}
                  {book.title.length > 5 && (
                    <span
                      className={style.toggleButton}
                      onClick={() => toggleTitle(book._id)}
                    >
                      {expandedTitles[book._id] ? " 🔽" : " ..."}
                    </span>
                  )}
                </h3>
                <p className={style.author}>{book.author}</p>
                <FiTrash2
                  className={style.trashIcon}
                  onClick={() => handleDeleteBook(book._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedBook && (
        <ModalStartReading
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
