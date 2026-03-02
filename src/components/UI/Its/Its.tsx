import React, { useMemo } from "react";
import styles from "./Its.module.css";
import { UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";
import InputUI from "../InputUI/InputUI";
import { ItsRange } from "./itsRange";

interface IItsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  its_val: number;
  label?: string;
  customClassName?: string;
  register?: UseFormRegister<any>;
}

export const Its: React.FC<IItsProps> = ({
  its_val,
  label = "Индекс технического состояния (ИТС)",
  customClassName,
  register,
  ...props
}) => {
  // Определяем элемент диапазона по its_val
  const range = useMemo(() => ItsRange.find((item) => its_val >= item.its_min && its_val <= item.its_max), [its_val]);

  const itsColorClass = range?.its_color_class;
  const itsDescr = range?.its_descr ?? "";

  const field: IInputField = {
    id: "its",
    type: "number",
    customClassName: "short",
    max: 100,
    min: 0,
  };

  return (
    <div className={`${styles["its"]} ${customClassName ? styles[customClassName] : ""}`}>
      <label className={styles["its__label"]}>{label}</label>
      <div className={styles["its__box"]}>
        <div className={styles["its__value"]}>
          {register ? (
            <InputUI key={field.id} field={field} register={register} />
          ) : (
            <div className={styles["its__valTxt"]}>{its_val}</div>
          )}
        </div>
        <div className={styles["its__mark"]}>
          <div className={`${styles["its__color"]} ${itsColorClass ? styles[itsColorClass] : ""}`}></div>
          <div className={styles["its__descr"]}>{itsDescr}</div>
        </div>
      </div>
    </div>
  );
};
