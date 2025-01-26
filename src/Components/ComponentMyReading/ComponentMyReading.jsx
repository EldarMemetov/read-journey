import { useLocation } from "react-router-dom";
import style from "./ComponentMyReading.module.css";
import { useState } from "react";

export default function ComponentMyReading() {
  const location = useLocation();
  const book = location.state?.book;
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>My reading</h2>
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
          onClick={handleRecordingToggle}
        ></button>
      </div>
    </div>
  );
}
