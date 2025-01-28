import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookById,
  startReadingBook,
  finishReadingBook,
} from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBook, FaChartPie, FaTrashAlt } from "react-icons/fa";
import styles from "./AddReading.module.css";

export default function AddReading() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    selectBooks(state).find((item) => item._id === bookId)
  );

  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [activeTab, setActiveTab] = useState("diary");

  useEffect(() => {
    if (bookId && !book) {
      dispatch(getBookById(bookId));
    }

    if (book && book.progress && book.progress.length > 0) {
      const lastProgress = book.progress[book.progress.length - 1];
      const lastPage = lastProgress.finishPage;
      setCurrentPage(lastPage ? lastPage + 1 : 1);
      setIsReading(book.status === "reading");
    }
  }, [bookId, book, dispatch]);

  const handleStartReading = () => {
    if (book) {
      const data = { id: book._id, page: currentPage };
      dispatch(startReadingBook(data))
        .then(() => {
          setIsReading(true);
        })
        .catch((error) => console.error("Error starting reading:", error));
    }
  };

  const handleStopReading = () => {
    if (book) {
      const data = { id: book._id, page: currentPage };
      dispatch(finishReadingBook(data))
        .then(() => {
          setIsReading(false);
        })
        .catch((error) => console.error("Error stopping reading:", error));
    }
  };

  const onSubmit = (data) => {
    setCurrentPage(data.pageNumber);
    if (isReading) {
      handleStopReading();
    } else {
      handleStartReading();
    }
  };

  const deleteDiaryEntry = (index) => {
    console.log("Deleting entry at index:", index);
  };

  const calculateReadingProgress = () => {
    if (book && book.totalPages) {
      const totalPagesRead = book.progress.reduce(
        (sum, entry) => sum + (entry.finishPage - entry.startPage || 0),
        0
      );
      return ((totalPagesRead / book.totalPages) * 100).toFixed(1);
    }
    return 0;
  };

  const convertSpeedToTime = (pagesPerHour) => {
    if (pagesPerHour === 0) return "0 minutes";

    const totalMinutes = 60 / pagesPerHour;
    const minutes = Math.round(totalMinutes);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
        remainingMinutes !== 1 ? "s" : ""
      }`;
    }
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Start page:</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          type="number"
          placeholder="Page number:"
          {...register("pageNumber", { required: "Page number is required" })}
          defaultValue={currentPage}
        />
        <button type="submit" className={styles.button}>
          {isReading ? "Stop Reading" : "Start Reading"}
        </button>
      </form>

      <div className={styles.tabs}>
        <div
          className={activeTab === "diary" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("diary")}
        >
          <FaBook /> Diary
        </div>
        <div
          className={activeTab === "statistics" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("statistics")}
        >
          <FaChartPie /> Statistics
        </div>
      </div>

      {activeTab === "diary" && (
        <div className={styles.contentContainer}>
          <h2 className={styles.diaryTitle}>Diary</h2>
          <div className={styles.diaryEntries}>
            {book && book.progress.length > 0 ? (
              book.progress.map((entry, index) => {
                const pagesRead = entry.finishPage - entry.startPage || 0;
                const percentage = book.totalPages
                  ? ((pagesRead / book.totalPages) * 100).toFixed(1)
                  : 0;
                const speed = entry.speed || 0;

                return (
                  <div key={index} className={styles.diaryEntry}>
                    <p className={styles.entryDate}>
                      {new Date(entry.startReading).toLocaleDateString()}
                    </p>
                    <p className={styles.pagesRead}>{pagesRead} pages</p>
                    <p className={styles.percentage}>{percentage}%</p>
                    <p className={styles.readingSpeed}>
                      {convertSpeedToTime(speed)} per hour
                    </p>
                    <FaTrashAlt
                      className={styles.deleteIcon}
                      onClick={() => deleteDiaryEntry(index)}
                    />
                  </div>
                );
              })
            ) : (
              <p>No progress data available</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "statistics" && (
        <div className={styles.contentContainer}>
          <h2 className={styles.statsTitle}>Statistics</h2>
          <div className={styles.statisticsContainer}>
            <div className={styles.percentageCircle}>
              <svg className={styles.circle}>
                <circle
                  className={styles.progressCircle}
                  strokeDasharray={`calc(628 * ${calculateReadingProgress()} / 100)`}
                />
              </svg>
            </div>
            <p className={styles.totalPercentage}>
              {calculateReadingProgress()}%
            </p>
            <p className={styles.totalPages}>
              {book &&
                book.progress.reduce(
                  (sum, entry) =>
                    sum + (entry.finishPage - entry.startPage || 0),
                  0
                )}{" "}
              pages read
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
