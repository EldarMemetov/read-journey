import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/selectors";
import style from "./NamePeople.module.css";

export default function NamePeople({ fullName = false }) {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <div>No user</div>;
  }

  const firstLetter = currentUser.name?.charAt(0).toUpperCase() || "";
  const fullUserName = currentUser.name || "";

  return (
    <div className={style.nameContainer}>
      <div className={style.letterContainer}>
        <h2 className={style.name}>{firstLetter}</h2>
      </div>

      {fullName && <span className={style.fullName}>{fullUserName}</span>}
    </div>
  );
}
