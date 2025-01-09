import iphone from "../../image/iphone.png";
import styles from "./HomeImage.module.css";

export default function HomeImage() {
  return (
    <div className={styles.homeContainer}>
      <img src={iphone} alt="iPhone" className={styles.homeImage} />
    </div>
  );
}
