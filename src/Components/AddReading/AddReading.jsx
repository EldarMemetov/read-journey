import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookById,
  startReadingBook,
  finishReadingBook,
  deleteReading,
} from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBook, FaChartPie, FaTrashAlt } from "react-icons/fa";
import styles from "./AddReading.module.css";
import graphics from "../../image/graphics.png";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import ModalBookEnd from "../ModalBookEnd/ModalBookEnd";
import noProgress from "../../image/sun.png";
export default function AddReading() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    selectBooks(state).find((item) => item._id === bookId)
  );
  const isReading = useSelector((state) => state.books.isReading);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("diary");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU");
  };

  useEffect(() => {
    if (bookId && !book) {
      dispatch(getBookById(bookId));
    }
    if (book && book.progress && book.progress.length > 0) {
      const lastFinishedProgress = book.progress
        .slice()
        .reverse()
        .find((entry) => entry.finishPage !== undefined);
      const lastPage = lastFinishedProgress?.finishPage ?? 1;
      setCurrentPage(lastPage);
    }
  }, [bookId, book, dispatch]);

  const handleStartReading = async () => {
    if (!book) return;
    const activeReading = book.progress?.find(
      (entry) => entry.status === "active"
    );
    if (activeReading) {
      await dispatch(
        finishReadingBook({
          id: book._id,
          page: currentPage,
        })
      );
      await dispatch(getBookById(book._id));
    }
    await dispatch(
      startReadingBook({
        id: book._id,
        page: currentPage,
      })
    );
    await dispatch(getBookById(book._id));
  };

  const handleStopReading = () => {
    if (!book) return;
    const data = { id: book._id, page: currentPage };
    dispatch(finishReadingBook(data)).then(() => {
      dispatch(getBookById(book._id)).then(() => {
        if (book && currentPage === book.totalPages) {
          setIsModalOpen(true);
        }
      });
    });
  };

  const handlePageChange = (e) => {
    const inputValue = Number(e.target.value);
    if (inputValue <= book.totalPages) {
      setCurrentPage(inputValue);
    }
  };

  const onSubmit = (data) => {
    if (data.pageNumber < 1 || data.pageNumber > book.totalPages) {
      setError("pageNumber", {
        type: "manual",
        message: "Invalid page number",
      });
      return;
    }
    clearErrors("pageNumber");
    setCurrentPage(data.pageNumber);
    if (isReading) {
      handleStopReading();
    } else {
      handleStartReading();
    }
  };

  const deleteDiaryEntry = (index) => {
    if (!book || !book.progress) return;
    dispatch(deleteReading({ bookId: book._id, readingIndex: index })).then(
      () => {
        dispatch(getBookById(book._id));
      }
    );
  };

  const calculateReadingProgress = () => {
    if (!book || !book.totalPages || !book.progress) return 0;
    const totalPagesRead = book.progress.reduce((sum, entry) => {
      const pagesRead = Math.max(
        (entry.finishPage ?? 0) - (entry.startPage ?? 0),
        0
      );
      return sum + pagesRead;
    }, 0);
    return ((totalPagesRead / book.totalPages) * 100).toFixed(1);
  };

  const getPagesPerHour = (pagesRead, readingTimeInMinutes, entry) => {
    if (entry.speed !== undefined && entry.speed !== null && entry.speed > 0) {
      return Math.round(entry.speed);
    }
    if (readingTimeInMinutes === 0) return "No data";
    const speed = (pagesRead / readingTimeInMinutes) * 60;
    return Math.round(speed);
  };

  const getReadingTimeInMinutes = (entry) => {
    if (entry.finishReading) {
      return Math.round(
        (new Date(entry.finishReading) - new Date(entry.startReading)) / 60000
      );
    }
    return entry.readingTime ?? 0;
  };

  const readingProgress = calculateReadingProgress();
  const totalPagesRead = book
    ? book.progress.reduce(
        (sum, entry) => sum + (entry.finishPage - entry.startPage || 0),
        0
      )
    : 0;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <p className={styles.title}>Start page:</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            className={styles.input}
            type="number"
            placeholder="Page number:"
            {...register("pageNumber", { required: "Page number is required" })}
            value={currentPage}
            onChange={handlePageChange}
          />
          {errors.pageNumber && (
            <p className={styles.error}>{errors.pageNumber.message}</p>
          )}
          <button type="submit" className={styles.button}>
            {isReading ? "Stop Reading" : "Start Reading"}
          </button>
        </form>
      </div>
      <div className={styles.containerMainTablet}>
        <div className={styles.tabs}>
          <div className={styles.iconContainer}>
            <div
              className={activeTab === "diary" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("diary")}
            >
              <FaBook />
            </div>
            <div
              className={
                activeTab === "statistics" ? styles.activeTab : styles.tab
              }
              onClick={() => setActiveTab("statistics")}
            >
              <FaChartPie />
            </div>
          </div>

          <div className={styles.textContainer}>
            {activeTab === "diary" && (
              <h2 className={styles.diaryTitle}>Diary</h2>
            )}
            {activeTab === "statistics" && (
              <h2 className={styles.statsTitle}>Statistics</h2>
            )}
          </div>
        </div>

        {activeTab === "diary" && (
          <div className={styles.contentContainer}>
            <div className={styles.diaryEntries}>
              {book && book.progress.length > 0 ? (
                <ul className={styles.listInfo}>
                  {book.progress.map((entry, index) => {
                    const pagesRead = entry.finishPage - entry.startPage || 0;
                    const percentage = book.totalPages
                      ? ((pagesRead / book.totalPages) * 100).toFixed(1)
                      : 0;
                    const readingTimeInMinutes = getReadingTimeInMinutes(entry);
                    const pagesPerHour = getPagesPerHour(
                      pagesRead,
                      readingTimeInMinutes,
                      entry
                    );
                    return (
                      <li key={index} className={styles.itemInfo}>
                        <div className={styles.containerDate}>
                          <p className={styles.entryDate}>
                            {formatDate(entry.startReading)}
                          </p>
                          <p className={styles.percentage}>{percentage}%</p>
                          <p className={styles.readingSpeed}>
                            {readingTimeInMinutes > 0
                              ? `${readingTimeInMinutes} minutes`
                              : "No data"}
                          </p>
                        </div>
                        <div className={styles.pagesInfo}>
                          <p className={styles.pagesRead}>{pagesRead} pages</p>
                          <div className={styles.graphics}>
                            <img src={graphics} alt="" />
                            <FaTrashAlt
                              className={styles.deleteIcon}
                              onClick={() => deleteDiaryEntry(index)}
                            />
                          </div>
                          <p className={styles.readingSpeed}>
                            {pagesPerHour !== "No data"
                              ? `${pagesPerHour} pages per hour`
                              : "No data"}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.containerProgress}>
                  <h2 className={styles.titleTextProgress}>Progress</h2>
                  <p className={styles.infoTextProgress}>
                    Here you will see when and how much you read. To record,
                    click on the red button above.
                  </p>
                  <img src={noProgress} alt="" />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "statistics" && (
          <div className={styles.contentContainer}>
            <div className={styles.statisticsContainer}>
              <ProgressCircle
                progress={readingProgress}
                pagesRead={totalPagesRead}
              />
            </div>
          </div>
        )}

        <ModalBookEnd isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
