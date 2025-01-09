import { useState } from "react";
import ReactModal from "react-modal";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth/operations";
import style from "./UserBar.module.css";
import Icon from "../Icon/Icon";
import clsx from "clsx";

ReactModal.setAppElement("#root");

export default function UserBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(signout())
      .unwrap()
      .then(() => {
        closeModal();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className={style.userBar}>
      <button onClick={openModal} className={style.openModal}>
        <Icon name="icon-menu" size={21} color="white" className={style.icon} />
      </button>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <button className={style.closeButton} onClick={closeModal}>
          <Icon name="icon-x" size={18} color="white" className={style.icon} />
        </button>
        <nav className={style.navContent}>
          <ul className={style.navList}>
            <li>
              <NavLink
                to="/recommended"
                className={({ isActive }) =>
                  clsx(style.navLink, { [style.active]: isActive })
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  clsx(style.navLink, { [style.active]: isActive })
                }
              >
                My Library
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={style.footer}>
          <button className={style.footerButton} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
