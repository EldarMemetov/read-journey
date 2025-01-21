import { useDispatch, useSelector } from "react-redux";
import {
  selectRecommendedBooks,
  selectIsLoadingBooks,
  selectBooksError,
} from "../../redux/book/selectors";
import { getRecommendedBooks } from "../../redux/book/operations";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import RecommendedItemBooks from "../RecommendedItemBooks/RecommendedItemBooks";
import style from "./RecommendedBooks.module.css";
export default function RecommendedBooks() {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectIsLoadingBooks);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    console.log("Fetching recommended books...");
    dispatch(getRecommendedBooks());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching recommended books:", error);
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className={style.title}>Recommended</h2>
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
      {!isLoading &&
        !error &&
        (!Array.isArray(recommendedBooks) || recommendedBooks.length === 0) && (
          <p>No recommended books available at the moment.</p>
        )}
      {Array.isArray(recommendedBooks) && recommendedBooks.length > 0 && (
        <ul>
          {recommendedBooks.map((book) => (
            <RecommendedItemBooks key={book._id} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
}
