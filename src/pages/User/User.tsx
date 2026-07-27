import React from "react";
import styles from "./User.module.css";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { inputFields } from "./inputFields";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { useUser } from "../../hooks/useUser";

const User: React.FC = () => {
  const {
    user,
    isLoading,
    error,
    currentUser,
    onSubmit,
    handleDelete,
    register,
    handleSubmit,
    selectedRole,
    setSelectedRole,
    optionsRole,
    paramsId,
    formState,
  } = useUser();

  return (
    <main className={styles.userPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {user && currentUser && (
        <div className="pageWrap">
          <h1 className="heading">
            Пользователь {user.second_name} {user.first_name} ({user.login})
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {inputFields.map((field) => (
                <InputUI
                  key={field.id}
                  field={{
                    ...field,
                    disabled:
                      (field.id === "login" && paramsId !== "0") ||
                      (currentUser.role_name !== "admin" && user.login !== currentUser.login)
                        ? true
                        : field.disabled,
                    required: field.id === "password" && paramsId === "0" ? true : field.required,
                    validation:
                      field.id === "password" && paramsId !== "0"
                        ? {
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                              message:
                                "Пароль должен содержать минимум 8 символов, заглавную, строчную букву, спецсимвол",
                            },
                          }
                        : field.validation,
                  }}
                  register={register}
                  errors={formState.errors}
                />
              ))}

              <SelectUI
                options={optionsRole}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder="Роль"
                searchPlaceholder="Поиск по роли"
                label="Роль"
                disabled={currentUser.role_name !== "admin" && user.login !== currentUser.login ? true : false}
                required
              />

              {(currentUser.role_name === "admin" || user.login === currentUser.login) && (
                <div className={styles.buttonsBottom}>
                  <div className={styles.saveButton}>
                    <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                      Сохранить
                    </ButtonUI>
                  </div>
                  <div className={styles.deleteButton}>
                    <ButtonUI type="button" onClick={handleDelete}>
                      Удалить
                    </ButtonUI>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default User;
