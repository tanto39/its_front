import React, { useMemo } from "react";
import styles from "./InputUI.module.css";
import { UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: IInputField;
  register?: UseFormRegister<any>;
}

const InputUI: React.FC<IInputProps> = ({ field, register, ...props }) => {

  const commonProps = useMemo(() => {
    return {
      id: field.id,
      type: field.type,
      placeholder: field.placeholder,
      className: field.customClassName
        ? `${styles.inputUI__field} ${styles[field.customClassName]}`
        : styles.inputUI__field,
      "aria-label": field.placeholder,
      required: field.required,
      disabled: field.disabled,
    };
  }, [field]);

  return (
    <div className={styles["inputUI"]}>
      <label htmlFor={field.id} className={styles["inputUI__label"]}>
        {field.label}
      </label>
      {register ? (
        // Используем register из react-hook-form
        field.is_textarea ? <textarea {...commonProps} {...register(field.id)} />
        : <input {...commonProps} {...register(field.id)} />
      ) : (
        // Используем явно переданные пропсы
        field.is_textarea ? <textarea {...commonProps} />
        : <input {...commonProps} {...props} />
      )}
    </div>
  );
};

export default InputUI;
