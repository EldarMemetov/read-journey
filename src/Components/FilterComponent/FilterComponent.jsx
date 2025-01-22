import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setFilters } from "../../redux/book/slice";
import styles from "./FilterComponent.module.css";

export default function FilterComponent() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(setFilters(data));
  };

  return (
    <div className={styles.containerFilter}>
      <h3 className={styles.filtersTitle}>Filters:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          {...register("bookTitle")}
          placeholder="Book title"
          className={styles.input}
        />
        <input
          type="text"
          {...register("author")}
          placeholder="The author"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Apply Filters
        </button>
      </form>
    </div>
  );
}
