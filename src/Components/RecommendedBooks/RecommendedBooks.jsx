import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecommendedBooks,
  selectIsLoadingBooks,
  selectBooksError,
  selectCurrentPage,
  selectTotalPages,
  selectFilters,
} from "../../redux/book/selectors";
import { getRecommendedBooks } from "../../redux/book/operations";
import { useSwipeable } from "react-swipeable";
import Loading from "../Loading/Loading";
import RecommendedItemBooks from "../RecommendedItemBooks/RecommendedItemBooks";
import ModalRecommended from "../ModalRecommended/ModalRecommended";
import style from "./RecommendedBooks.module.css";

export default function RecommendedBooks({
  limit = 2,
  imageWidth = 137,
  imageHeight = 208,
  title = "Recommended",
  containerButtonNext = "",
  NextSlideshowContainer = "",
  extraActions = null,
  filterActions = null,
}) {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectIsLoadingBooks);
  const error = useSelector(selectBooksError);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const filters = useSelector(selectFilters);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getRecommendedBooks({ page: currentPage, limit, filters }));
  }, [dispatch, currentPage, filters, limit]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getRecommendedBooks({ page: currentPage - 1, limit }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getRecommendedBooks({ page: currentPage + 1, limit }));
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
    <>
      <div
        {...swipeHandlers}
        className={`${style.slideshowContainer} ${NextSlideshowContainer}`}
      >
        {filterActions && (
          <div className={style.filterActions}>{filterActions}</div>
        )}
        <div className={`${style.containerButton} ${containerButtonNext}`}>
          <h2 className={style.title}>{title}</h2>

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

        {isLoading && (
          <div className={style.loadingContainer}>
            <div className={style.loadingText}>
              <Loading />
            </div>
          </div>
        )}

        <div>
          {recommendedBooks.length > 0 ? (
            <ul className={style.carouselList}>
              {recommendedBooks.map((book) => (
                <RecommendedItemBooks
                  key={book._id}
                  book={book}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}
                  className={style.bookItem}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </ul>
          ) : (
            <p>No recommended books available at the moment.</p>
          )}
          {extraActions && (
            <div className={style.extraActions}>{extraActions}</div>
          )}

          {selectedBook && (
            <ModalRecommended onClose={handleCloseModal}>
              <div className={style.modalContent}>
                <img
                  className={style.img}
                  src={selectedBook.imageUrl}
                  alt={selectedBook.title}
                  width={imageWidth}
                  height={imageHeight}
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
    </>
  );
}
