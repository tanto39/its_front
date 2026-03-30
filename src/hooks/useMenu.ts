import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { logout } from "../store/slices/authSlice";

export function useMenu() {
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

  return { handleLogout, closeMenu, setIsMenuOpen, user, isMenuOpen };
}
