import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/book/operations";
import styles from "./BookAddFilter.module.css";

export default function BookAddFilter() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const bookData = {
      title: data.bookTitle,
      author: data.author,
      totalPages: parseInt(data.number, 10) || 0,
    };
    dispatch(addBook(bookData))
      .unwrap()
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error("Failed to add book:", error);
      });
  };

  return (
    <div className={styles.containerFilter}>
      <h3 className={styles.filtersTitle}>Add a Book</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          {...register("bookTitle", { required: "Book title is required" })}
          placeholder="Book title"
          className={styles.input}
        />
        <input
          type="text"
          {...register("author", { required: "Author is required" })}
          placeholder="The author"
          className={styles.input}
        />
        <input
          type="number"
          {...register("number", { min: 0 })}
          placeholder="Number of pages"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Book
        </button>
      </form>
    </div>
  );
}
