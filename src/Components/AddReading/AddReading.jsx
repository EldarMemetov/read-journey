import { useForm } from "react-hook-form";
import styles from "./AddReading.module.css";
import sun from "../../image/sun.png";
export default function AddReading() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        />
        <button type="submit" className={styles.button}>
          To start
        </button>
      </form>
      <div className={styles.containerContent}>
        <h2 className={styles.titleProgress}>Progress</h2>
        <p className={styles.titleInfo}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className={styles.containerImage}>
          <img src={sun} alt="sun" className={styles.img} />
        </div>
      </div>
    </div>
  );
}
