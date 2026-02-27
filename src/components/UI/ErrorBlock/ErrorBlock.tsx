import React from "react";
import styles from "./ErrorBlock.module.css";

interface IErrorBlockProps {
  error: string;
}

const ErrorBlock: React.FC<IErrorBlockProps> = ({ error }) => {
  return (
    <div className={styles.error}>
      {error}
    </div>
  );
};

export default ErrorBlock;
