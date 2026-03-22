import React, { useState, useEffect } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Закрытие меню при изменении размера окна (чтобы после поворота экрана меню не оставалось открытым)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    setIsMenuOpen(false); // закрыть меню после выхода
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Рендер содержимого меню (ссылки и кнопка выхода)
  const renderMenuContent = () => (
    <>
      <div className={styles.links}>
        {user &&
          navLinks
            .filter((link) => link.roles.includes(user.role_name as UserRole))
            .map((link) => (
              <Link key={link.link} to={link.link} className={styles.menuItem} onClick={closeMenu}>
                {link.title}
              </Link>
            ))}
      </div>
      <div className={styles.exit} onClick={handleLogout}>
        <img src="/public/images/exit.svg" alt="Выйти" title="Выйти" />
      </div>
    </>
  );

  return (
    <div className={styles.topMenuWrap}>
      <div className={styles.topMenuCenter}>
        {/* //Десктопное меню (видимо на больших экранах) */}
        <div className={styles.desktopMenu}>{renderMenuContent()}</div>

        {/* Бургер-кнопка (видима только на мобильных экранах) */}
        <button className={styles.burgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Меню">
          <span className={styles.burgerIcon} />
        </button>

        {/* Мобильное меню (раскрывающееся) */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>{renderMenuContent()}</div>
      </div>
    </div>
  );
};
