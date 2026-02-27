import React, {FC, MouseEvent, ReactNode} from "react";
import styles from "./ButtonUI.module.css";

interface buttonProps {
  btnClass?: string;
  children?: ReactNode,
  type?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonUI: FC<buttonProps> = ({ btnClass, children, type, onClick }) => {
  return (
    <button type={type as "submit" | "reset" | "button" | undefined} className={[styles.btnUI, btnClass && styles[btnClass]].join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonUI;
