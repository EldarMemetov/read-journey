import { Header } from "../Header/Header";
import s from "./AppBar.module.css";
export default function AppBar() {
  return (
    <div className={s.containerHeader}>
      <Header />
    </div>
  );
}
