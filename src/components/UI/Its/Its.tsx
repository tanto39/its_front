import React, { useMemo } from "react";
import styles from "./Its.module.css";
import { UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";
import InputUI from "../InputUI/InputUI";
import { ItsRange } from "./itsRange";

interface IItsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  its_val: number;
  register?: UseFormRegister<any>;
}

export const Its: React.FC<IItsProps> = ({ its_val, register, ...props }) => {
  // Определяем элемент диапазона по its_val
  const range = useMemo(() => ItsRange.find((item) => its_val >= item.its_min && its_val <= item.its_max), [its_val]);

  const itsColorClass = range?.its_color_class;
  const itsDescr = range?.its_descr ?? "";

  const field: IInputField = {
    id: "its",
    type: "number",
    label: "Индекс технического состояния (ИТС)",
  };

  return (
    <div className={styles["its"]}>
      <div className={styles["its__value"]}>
        {register ? (
          <InputUI key={field.id} field={field} register={register} />
        ) : (
          <div className={styles["its__val_txt"]}>{its_val}</div>
        )}
      </div>
      <div className={`${styles["its__color_class"]} ${itsColorClass ? styles[itsColorClass] : ""}`}></div>
      <div className={styles["its__descr"]}>{itsDescr}</div>
    </div>
  );
};
