import React from "react";
import styles from "./LoginPage.module.css";
import { IInputField } from "../../types/forms";
import Loader from "../../components/UI/Loader/Loader";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import InputUI from "../../components/UI/InputUI/InputUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import { useLogin } from "../../hooks/useLogin.ts";

const LoginPage: React.FC = () => {
  const { register, handleSubmit, onSubmitAuth, isLoading, error } = useLogin();

  const inputFields: IInputField[] = [
    { id: "login", type: "text", label: "Логин", placeholder: "login_01" },
    { id: "password", type: "password", label: "Пароль", placeholder: "************" },
  ];

  return (
    <div className={styles.loginPageWrap}>
      <form className={styles.loginForm}>
        <div className={styles.formInputs}>
          {inputFields.map((field) => (
            <InputUI key={field.id} field={field} register={register} />
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <ButtonUI type="button" btnClass="btn49" onClick={handleSubmit(onSubmitAuth)}>
            Авторизация
          </ButtonUI>
        </div>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
    </div>
  );
};

export default LoginPage;
