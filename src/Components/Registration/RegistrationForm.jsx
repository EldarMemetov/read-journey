import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import style from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";
import { Logo } from "../Logo/Logo";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/auth/operations";
import toast from "react-hot-toast";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
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

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        toast.success("You are successfully registered!");
        navigate("/recommended");
      })
      .catch((error) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : String(error || "Something went wrong!");
        toast.error(errorMessage);
      });
  };

  return (
    <div className={style.formContainer}>
      <div className={style.containerLogo}>
        <Logo />
        <h1 className={style.titleReading}>
          Expand your mind, reading{" "}
          <span className={style.readingSpan}>a book</span>
        </h1>
      </div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className={style.inputContainer}>
          <div
            className={clsx(style.inputWrapper, {
              [style.inputWrapperWithIcon]: true,
            })}
          >
            <input
              className={clsx(style.inputField, {
                [style.valid]: touchedFields.name && !errors.name,
                [style.error]: errors.name,
              })}
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {touchedFields.name && !errors.name && (
              <Icon
                name="icon-right"
                size={18}
                color="green"
                className={style.icon}
              />
            )}
            {errors.name && (
              <Icon
                name="icon-error"
                size={18}
                color="red"
                className={style.icon}
              />
            )}
          </div>
          <p className={style.inputError}>{errors.name?.message}</p>
        </div>

        <div className={style.inputContainer}>
          <div
            className={clsx(style.inputWrapper, {
              [style.inputWrapperWithIcon]: true,
            })}
          >
            <input
              className={clsx(style.inputField, {
                [style.valid]: touchedFields.email && !errors.email,
                [style.error]: errors.email,
              })}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {touchedFields.email && !errors.email && (
              <Icon
                name="icon-right"
                size={18}
                color="green"
                className={style.icon}
              />
            )}
            {errors.email && (
              <Icon
                name="icon-error"
                size={18}
                color="red"
                className={style.icon}
              />
            )}
          </div>
          <p className={style.inputError}>{errors.email?.message}</p>
        </div>

        <div className={style.inputContainer}>
          <div
            className={clsx(style.inputWrapper, {
              [style.inputWrapperWithIcon]: true,
            })}
          >
            <input
              className={clsx(style.inputField, {
                [style.valid]: touchedFields.password && !errors.password,
                [style.error]: errors.password,
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <button
              className={style.iconButton}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "icon-eye-off" : "icon-eye"}
                size={18}
                color="currentColor"
                className="icon"
              />
            </button>
            {touchedFields.password && !errors.password && (
              <Icon
                name="icon-right"
                size={18}
                color="green"
                className={style.icon}
              />
            )}
            {errors.password && (
              <Icon
                name="icon-error"
                size={18}
                color="red"
                className={style.icon}
              />
            )}
          </div>
          <p className={style.inputError}>{errors.password?.message}</p>
        </div>

        <div className={style.containerButton}>
          <button className={style.submitButton} type="submit">
            Registration
          </button>
          <p className={style.accountText}>
            <Link to="/login">Already have an account? Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
