import React from "react";
import { Link } from "react-router-dom";
import { UserRole } from "../../types/index";
import { navLinks } from "./NavLinks";
import styles from "./TopMenu.module.css";
import { useMenu } from "../../hooks/useMenu";

export const TopMenu: React.FC = () => {
  const { handleLogout, closeMenu, setIsMenuOpen, user, isMenuOpen } = useMenu();

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
