import style from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={style.containerClass}>
      <h1 className={style.title}>404 Page Not Found</h1>
      <p className={style.info}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
