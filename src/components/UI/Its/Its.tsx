import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form"; // добавляем импорт
import styles from "./Its.module.css";
import { UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";
import InputUI from "../InputUI/InputUI";
import { ItsRange } from "./itsRange";

interface IItsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  its_val?: number;
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
  // Получаем контекст формы, если он есть
  const formContext = useFormContext();

  // Актуальное значение: из контекста (watch) или из пропса
  const currentItsVal = formContext
    ? formContext.watch("its")
    : its_val;

  // Приводим к числу (watch может вернуть строку)
  const numericItsVal =
    typeof currentItsVal === "string"
      ? parseFloat(currentItsVal)
      : currentItsVal;

  // Определяем элемент диапазона по актуальному значению
  const range = useMemo(
    () =>
      ItsRange.find(
        (item) =>
          numericItsVal >= item.its_min && numericItsVal <= item.its_max
      ),
    [numericItsVal]
  );

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
    <div
      className={`${styles["its"]} ${
        customClassName ? styles[customClassName] : ""
      }`}
    >
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
          <div
            className={`${styles["its__color"]} ${
              itsColorClass ? styles[itsColorClass] : ""
            }`}
          ></div>
          <div className={styles["its__descr"]}>{itsDescr}</div>
        </div>
      </div>
    </div>
  );
};