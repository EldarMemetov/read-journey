import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/selectors";
import style from "./NamePeople.module.css";
export default function NamePeople() {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <div>No user</div>;
  }

  const firstLetter = currentUser.name?.charAt(0).toUpperCase() || "";
  return (
    <div className={style.nameContainer}>
      <h2 className={style.name}>{firstLetter}</h2>
    </div>
  );
}
