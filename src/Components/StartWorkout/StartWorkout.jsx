import { Link } from "react-router-dom";
import style from "./StartWorkout.module.css";
import Icon from "../Icon/Icon";
export default function StartWorkout() {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <h2 className={style.titleStart}>Start your workout</h2>

        <ul className={style.stepsList}>
          <li className={style.stepItem}>
            <div className={style.stepNumber}>
              <p className={style.number}>1</p>
            </div>
            <p className={style.stepDescription}>
              Create a personal library:{" "}
              <span className={style.stepHighlight}>
                add the books you intend to read to it.
              </span>
            </p>
          </li>
          <li className={style.stepItem}>
            <div className={style.stepNumber}>
              <p className={style.number}>2</p>
            </div>
            <p className={style.stepDescription}>
              Create your first workout:{" "}
              <span className={style.stepHighlight}>
                define a goal, choose a period, start training.
              </span>
            </p>
          </li>
        </ul>
        <div className={style.actionsContainer}>
          <p>
            <Link to="/library" className={style.libraryLink}>
              My library
            </Link>
          </p>
          <Icon
            name="icon-log-in"
            size={18}
            color="green"
            className={style.icon}
          />
        </div>
      </div>
    </section>
  );
}
