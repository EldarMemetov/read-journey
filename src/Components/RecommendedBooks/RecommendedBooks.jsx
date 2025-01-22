import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecommendedBooks,
  selectIsLoadingBooks,
  selectBooksError,
  selectCurrentPage,
  selectTotalPages,
} from "../../redux/book/selectors";
import { getRecommendedBooks } from "../../redux/book/operations";
import { useSwipeable } from "react-swipeable";
import Loading from "../Loading/Loading";
import RecommendedItemBooks from "../RecommendedItemBooks/RecommendedItemBooks";
import ModalRecommended from "../ModalRecommended/ModalRecommended";
import style from "./RecommendedBooks.module.css";

export default function RecommendedBooks() {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectIsLoadingBooks);
  const error = useSelector(selectBooksError);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  const [selectedBook, setSelectedBook] = useState(null); // Модальное окно

  useEffect(() => {
    dispatch(getRecommendedBooks({ page: currentPage, limit: 2 }));
  }, [dispatch, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getRecommendedBooks({ page: currentPage - 1, limit: 2 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getRecommendedBooks({ page: currentPage + 1, limit: 2 }));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePrevPage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCloseModal = () => setSelectedBook(null);

  if (error) return <div>Error: {error}</div>;

  return (
    <div {...swipeHandlers} className={style.slideshowContainer}>
      {isLoading && (
        <div className={style.loadingContainer}>
          <div className={style.loadingText}>
            <Loading />
          </div>
        </div>
      )}
      <div className={style.containerButton}>
        <h2 className={style.title}>Recommended</h2>
        <div className={style.buttonNext}>
          <button
            type="button"
            className={style.prevArrow}
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
          >
            &lt;
          </button>
          <button
            type="button"
            className={style.nextArrow}
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
          >
            &gt;
          </button>
        </div>
      </div>
      <div>
        {recommendedBooks.length > 0 ? (
          <ul className={style.carouselList}>
            {recommendedBooks.map((book) => (
              <RecommendedItemBooks
                key={book._id}
                book={book}
                className={style.bookItem}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </ul>
        ) : (
          <p>No recommended books available at the moment.</p>
        )}

        {selectedBook && (
          <ModalRecommended onClose={handleCloseModal}>
            <div className={style.modalContent}>
              <img
                className={style.img}
                src={selectedBook.imageUrl}
                alt={selectedBook.title}
                width="140"
                height="213"
              />
              <h2 className={style.titleBook}>{selectedBook.title}</h2>
              <p className={style.author}>{selectedBook.author}</p>
              <p className={style.totalPages}>
                {selectedBook.totalPages} pages
              </p>
              <button className={style.buttonLibrary}>Add to library</button>
            </div>
          </ModalRecommended>
        )}
      </div>
    </div>
  );
}
