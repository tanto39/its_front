import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { logout } from "../../store/slices/authSlice";
import { UserRole } from "../../types/index";
import { navLinks } from "./NavLinks";
import styles from "./TopMenu.module.css";

export const TopMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
    //navigate("/");
  };

  return (
    <div className={styles.topMenuWrap}>
      <div className={styles.topMenuCenter}>
        <div className={styles.topMenuItems}>
          {user &&
            navLinks
              .filter((link) => link.roles.includes(user.role_name as UserRole))
              .map((link, index) => {
                return (
                  <Link key={link.link} to={link.link} className={styles.menuItem}>
                    {link.title}
                  </Link>
                );
              })}
        </div>
        <div className={styles.exit} onClick={() => handleLogout()}>
          <img src="/public/images/exit.svg" alt="Выйти" title="Выйти"/>
        </div>
      </div>
    </div>
  );
};
