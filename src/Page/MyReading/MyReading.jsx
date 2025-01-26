import AddReading from "../../Components/AddReading/AddReading";
import ComponentMyReading from "../../Components/ComponentMyReading/ComponentMyReading";
import style from "./MyReading.module.css";
export default function MyReading() {
  return (
    <div className={style.container}>
      <AddReading />
      <ComponentMyReading />
    </div>
  );
}
