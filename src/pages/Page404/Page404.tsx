import React from "react";
import styles from "./Page404.module.css";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.notFound}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p>Page Not Found</p>
        <ButtonUI btnClass="btnGreen" onClick={() => navigate("/")}>На главную</ButtonUI>
    </main>
  );
};

export default Page404;
