import RegistrationForm from "../../Components/Registration/RegistrationForm";
import HomeImage from "../../Components/HomeImage/HomeImage";
import styles from "./RegistrationPage.module.css";
export default function RegistrationPage() {
  return (
    <section>
      <div className={styles.containerPage}>
        <RegistrationForm />
        <HomeImage />
      </div>
    </section>
  );
}
