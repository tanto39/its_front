import React, { useMemo } from "react";
import styles from "./InputUI.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: IInputField;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
}

const InputUI: React.FC<IInputProps> = ({ field, register, errors, ...props }) => {
  const commonProps = useMemo(() => {
    return {
      id: field.id,
      type: field.type,
      placeholder: field.placeholder,
      "aria-label": field.placeholder,
      required: field.required,
      disabled: field.disabled,
      max: field.max,
      min: field.min,
    };
  }, [field]);

  const inputClassName = useMemo(() => {
    let baseClass = styles.inputUI__field;
    if (field.customClassName) {
      baseClass = `${baseClass} ${styles[field.customClassName]}`;
    }
    if (errors && errors[field.id]) {
      baseClass = `${baseClass} ${styles.inputUI__field_error}`;
    }
    return baseClass;
  }, [field, errors]);

  return (
    <div className={styles["inputUI"]}>
      {field.label && (
        <label htmlFor={field.id} className={styles["inputUI__label"]}>
          {field.label}
        </label>
      )}
      {register ? (
        // Используем register из react-hook-form
        field.is_textarea ? (
          <textarea className={inputClassName} {...commonProps} {...register(field.id)} />
        ) : (
          <input className={inputClassName} {...commonProps} {...register(field.id, field.validation)} />
        )
      ) : // Используем явно переданные пропсы
      field.is_textarea ? (
        <textarea className={inputClassName} {...commonProps} />
      ) : (
        <input className={inputClassName} {...commonProps} {...props} />
      )}
      {errors && errors[field.id] && (
        <span className={styles["inputUI__error"]}>Ошибка валидации: {errors[field.id]?.message as string}</span>
      )}
    </div>
  );
};

export default InputUI;
