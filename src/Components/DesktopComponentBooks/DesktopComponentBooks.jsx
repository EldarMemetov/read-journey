import styled from "./DesktopComponentBooks.module.css";
import book from "../../image/book.png";
export default function DesktopComponentBooks() {
  return (
    <div className={styled.container}>
      <img src={book} alt="" className={styled.img} />
      <p className={styled.title}>
        Books are <span className={styled.titleSpan}>windows</span> to the
        world, and reading is a journey into the unknown.
      </p>
    </div>
  );
}
