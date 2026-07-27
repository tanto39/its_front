import React from "react";
import styles from "./Its.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";
import InputUI from "../InputUI/InputUI";
import { useIts } from "../../../hooks/useIts";

interface IItsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  its_val?: number;
  label?: string;
  customClassName?: string;
  showIts?: boolean;
  errors?: FieldErrors;
  register?: UseFormRegister<any>;
}

export const Its: React.FC<IItsProps> = ({
  its_val,
  label = "Индекс технического состояния (ИТС)",
  customClassName,
  register,
  errors,
  showIts = true,
}) => {
  const { itsColorClass, itsDescr } = useIts({ its_val });

  const field: IInputField = {
    id: "its",
    type: "number",
    customClassName: "short",
    max: 100,
    min: 0,
    validation: {
      max: {
        value: 100,
        message: "Максимальный ИТС 100",
      },
      min: {
        value: 0,
        message: "Минимальный ИТС 0",
      },
    },
  };

  return (
    <div className={`${styles["its"]} ${customClassName ? styles[customClassName] : ""}`}>
      <label className={styles["its__label"]}>{label}</label>
      <div className={styles["its__box"]}>
        {showIts && (
          <div className={styles["its__value"]}>
            {register ? (
              <InputUI key={field.id} field={field} register={register} errors={errors} />
            ) : (
              <div className={styles["its__valTxt"]}>{its_val}</div>
            )}
          </div>
        )}
        <div className={styles["its__mark"]}>
          <div className={`${styles["its__color"]} ${itsColorClass ? styles[itsColorClass] : ""}`}></div>
          <div className={styles["its__descr"]}>{itsDescr}</div>
        </div>
      </div>
    </div>
  );
};
