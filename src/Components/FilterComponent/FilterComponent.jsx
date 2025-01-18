import { useForm } from "react-hook-form";
import styles from "./FilterComponent.module.css";
export default function FilterComponent() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          To apply
        </button>
      </form>
    </div>
  );
}
