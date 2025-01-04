import HomeImage from "../../Components/HomeImage/HomeImage";
import LoginForm from "../../Components/Login/LoginForm";
import styled from "./LoginPage.module.css";
export default function LoginPage() {
  return (
    <section>
      <div className={styled.containerPage}>
        <LoginForm />
        <HomeImage />
      </div>
    </section>
  );
}
