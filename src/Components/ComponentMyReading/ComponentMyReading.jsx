import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getBookById,
  startReadingBook,
  finishReadingBook,
} from "../../redux/book/operations";
import style from "./ComponentMyReading.module.css";

export default function ComponentMyReading() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const [book, setBook] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookId) {
      console.log("Запрос на книгу с ID:", bookId);
      dispatch(getBookById(bookId))
        .then((response) => {
          console.log("Книга загружена:", response.payload);
          setBook(response.payload);
          setError(null);
        })
        .catch((error) => {
          setError("Не удалось загрузить данные о книге.");
          console.error("Ошибка при загрузке книги:", error);
        });
    }
  }, [bookId, dispatch]);

  const handleStartReading = () => {
    if (book) {
      if (book.status === "reading") {
        setError("This book is already being read.");
        console.error("This book is already being read.");
        return;
      }

      let currentPage = 1;
      if (book.progress && book.progress.length > 0) {
        const lastProgress = book.progress[book.progress.length - 1];
        currentPage = lastProgress.finishPage ? lastProgress.finishPage + 1 : 1;
      }

      if (isNaN(currentPage) || currentPage < 1) {
        console.error("Invalid page number for start reading:", currentPage);
        setError("Invalid page number, cannot start reading.");
        return;
      }

      const data = {
        id: book._id,
        page: currentPage,
      };

      console.log("Start Reading Data:", data);
      dispatch(startReadingBook(data))
        .then(() => {
          setIsRecording(true);
        })
        .catch((error) => {
          console.error("Error starting the reading:", error);
          setError("There was an error starting the reading.");
        });
    } else {
      setError("Book progress not available.");
    }
  };

  const handleFinishReading = () => {
    if (book && book.progress) {
      const lastProgress = book.progress[book.progress.length - 1];
      const currentPage = lastProgress ? lastProgress.finishPage : 1;

      if (isNaN(currentPage) || currentPage < 1) {
        console.error("Invalid page number for finish reading:", currentPage);
        setError("Invalid page number, cannot finish reading.");
        return;
      }

      const data = {
        id: book._id,
        page: currentPage,
      };

      console.log("Finish Reading Data:", data);
      dispatch(finishReadingBook(data))
        .then(() => {
          setIsRecording(false);
        })
        .catch((error) => {
          console.error("Error finishing the reading:", error);
          setError("There was an error finishing the reading.");
        });
    } else {
      setError("Book progress not available.");
    }
  };

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
        <p>No book selected for reading.</p>
      )}
      <div className={style.recordButtonWrapper}>
        <button
          className={`${style.recordButton} ${
            isRecording ? style.recording : ""
          }`}
          onClick={isRecording ? handleFinishReading : handleStartReading}
        >
          {isRecording ? "" : ""}
        </button>
      </div>
    </div>
  );
}
