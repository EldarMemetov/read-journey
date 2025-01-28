import iphone from "../../image/iphone.png";
import styles from "./HomeImage.module.css";
import iphoneTablet from "../../image/iPhoneTablet.png";
export default function HomeImage() {
  return (
    <div className={styles.homeContainer}>
      <img src={iphone} alt="iPhone" className={styles.homeImage} />
      <img src={iphoneTablet} alt="iPhone" className={styles.homeImageTablet} />
    </div>
  );
}
