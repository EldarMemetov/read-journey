import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters long"),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={style.formContainer}>
      <h1 className={style.titleReading}>
        Expand your mind, reading{" "}
        <span className={style.readingSpan}>a book</span>
      </h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputContainer}>
          <label className={style.inputLabel}>Email</label>
          <input
            className={style.inputField}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <p className={style.inputError}>{errors.email?.message}</p>
        </div>
        <div className={style.inputContainer}>
          <label className={style.inputLabel}>Password</label>
          <input
            className={style.inputField}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            className={style.buttonPassword}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
          <p className={style.inputError}>{errors.password?.message}</p>
        </div>
        <div className={style.containerButton}>
          <button className={style.submitButton} type="submit">
            Log In
          </button>
          <p className={style.accountText}>
            <Link to="/register"> Don’t have an account? Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
